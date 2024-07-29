import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { CompanyRepository, JobRepository, UserRepository } from 'src/repository';
import { UserJobRepository } from 'src/repository/user-job.repository';
import { Raw } from 'typeorm';
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

@Injectable()
export class DashboardService {

	constructor(
		private userRepo: UserRepository,
		private jobRepo: JobRepository,
		private companyRepo: CompanyRepository,
		private userJobRepo: UserJobRepository,
	) {
	}

	async statistic(filters: any) {
		let condition = {};
		let start_date = moment().startOf('month').format('yyyy-MM-DD HH:mm:ss');
		let end_date = moment().endOf('month').format('yyyy-MM-DD HH:mm:ss');

		if (filters?.month) {
			start_date = moment().month(filters?.month - 1).startOf('month').format('yyyy-MM-DD HH:mm:ss');
			end_date = moment().month(filters?.month - 1).endOf('month').format('yyyy-MM-DD HH:mm:ss');
			condition = {
				created_at: Raw(alias => `${alias} >= '${start_date}' AND ${alias} <= '${end_date}'`)
			}
		}

		let totalUserJobsByStatusInMonth = await this.formatData(await this.userRepo.query(`select status, CAST(COUNT(*) AS SIGNED) as total 
			FROM user_jobs where created_at >= '${start_date}' AND created_at <= '${end_date}' 
			GROUP BY status`
		));

		let totalJobsByStatusInMonth = await this.formatData(await this.userRepo.query(`select status, CAST(COUNT(*) AS SIGNED) as total 
			FROM jobs where created_at >= '${start_date}' AND created_at <= '${end_date}' 
			GROUP BY status`
		));

		let totalJobsByStatus = await this.formatData(await this.userRepo.query(`select status, CAST(COUNT(*) AS SIGNED) as total 
			FROM jobs  
			GROUP BY status`
		));

		let totalCompanyByStatus = await this.formatData(await this.userRepo.query(`select status, CAST(COUNT(*) AS SIGNED) as total 
			FROM companies GROUP BY status`
		));

		const responseGroupDay = await this.userJobRepo.query(`select CAST(COUNT(*) AS SIGNED) as total, 
			DATE_FORMAT(created_at,'%Y-%m-%d') as day 
			FROM user_jobs WHERE status != -1 AND created_at >= '${start_date}' AND created_at <= '${end_date}' 
			GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d')`
		);

		const date = filters?.month ? moment().month(filters?.month - 1) : moment();
		let year = date.year();
		let month = date.format('MM');
		const totalDay = daysInMonth(month, year);
		let arrListDay = [];
		for (let i = 1; i <= totalDay; i++) {
			let day = `${i}`;
			if (i < 10) day = '0' + `${i}`;
			arrListDay.push(`${year}-${month}-${day}`);
		}

		let arrListDayMapping = arrListDay.reduce((newData: any, item: any) => {
			let obj = {
				day: item,
				total: 0
			}
			if (responseGroupDay?.length > 0) {
				let revenueDay = responseGroupDay.find(e => e.day == item)
				if (revenueDay) {
					obj = { ...revenueDay, total: Number(revenueDay?.total) };
				}
			}
			newData.push(obj);
			return newData;
		}, []);
		console.log(start_date, end_date);

		let companies = await this.companyRepo.getLists({...filters, start_date: start_date, end_date: end_date});
		if(companies?.result) {
			for(let item of companies.result) {
				
				item.total_job = await this.jobRepo.count({
					where: {
						created_at:  Raw(alias => `${alias} >= '${start_date}' AND ${alias} <= '${end_date}'`),
						company_id: item.id
					}
				});
				item.total_cv = await this.userJobRepo.count({
					where: {
						created_at:  Raw(alias => `${alias} >=  '${start_date}' AND ${alias} <= '${end_date}'`),
						company_id: item.id
					}
				});
				item.total_cv_approved = await this.userJobRepo.count({
					where: {
						created_at:  Raw(alias => `${alias} >= '${start_date}' AND ${alias} <= '${end_date}'`),
						company_id: item.id,
						status: 2
					}
				})
			}
		}

		const data = {
			job: {
				by_month: totalJobsByStatusInMonth,
				all: totalJobsByStatus,
			},
			company: totalCompanyByStatus,
			user_jobs: {
				group_by_day: arrListDayMapping,
				total_in_month: totalUserJobsByStatusInMonth,
			},
			total_jobs : {
				pending: await this.jobRepo.count({where: {status: 1}}),
				approved: await this.jobRepo.count({where: {status: 2}}),
				rejected: await this.jobRepo.count({where: {status: 3}}),
			},
			total_company : {
				active: await this.jobRepo.count({where: {status: 1}}),
				inactive: await this.jobRepo.count({where: {status: -1}}),
			},
			employer : {
				active: await this.userRepo.count({where: {status: 1, type: 'EMPLOYER'}}),
				inactive: await this.userRepo.count({where: {status: -1, type: 'EMPLOYER'}}),
			}
			,
			user : {
				active: await this.userRepo.count({where: {status: 1, type: 'USER'}}),
				inactive: await this.userRepo.count({where: {status: -1, type: 'USER'}}),
			},
			data: companies
		}

		return data
	}

	async formatData(data: any) {
		if (data?.length > 0) {
			data = data.map(item => {
				item.total = Number(item.total);
				return item;
			});
		}
		return data;
	}
}
