import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Company } from "./company.entity";
import { UserJob } from "./user-job.entity";
import { Career } from "./career.entity";
import { Category } from "./category.entity";
import { Province } from "./province.entity";

@Index('jobs_pkey', ['id'], { unique: true })
@Entity("jobs")
export class Jobs {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({nullable: true,})
	avatar: string;

	@Column("text",{nullable: true,})
	content: string;

	@Column("text",{nullable: true,})
	description: string;

	@Column({nullable: true,})
	career_id: number;

	@Column({nullable: true,})
	tags: string;

	@Column({nullable: true,})
	type: number;

	@Column({nullable: true,})
	form_of_work_id: number;

	@Column({nullable: true,})
	address: string;

	@Column({nullable: true,})
	number: number;

	@Column({nullable: true,})
	user_id: number;

	@Column({nullable: true,})
	province_id: number;

	@Column({nullable: true,})
	company_id: number;

	@Column({nullable: true,})
	experience_id: number;

	@Column({nullable: true,})
	rank_id: number;

	@Column({nullable: true,})
	salary: number;

	@Column({nullable: true,})
	salary_id: number;

	@Column({nullable: true,})
	status: number;

	@Column('date', {
		name: 'deadline',
		nullable: true,
	})
	deadline: Date;
	
	@Column('timestamp', {
		name: 'created_at',
		nullable: true
	})
	created_at: Date;

	@Column('timestamp', {
		name: 'updated_at',
		nullable: true,
		
	})
	updated_at: Date;

	@ManyToOne(() => User, (user) => user.jobs)
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;

	@ManyToOne(() => Career, (user) => user.jobs)
	@JoinColumn([{ name: "career_id", referencedColumnName: "id" }])
    career: Career;

	@ManyToOne(() => Company, (user) => user.jobs)
	@JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
    company: Company;

	@ManyToOne(() => Province, (user) => user.jobs)
	@JoinColumn([{ name: "province_id", referencedColumnName: "id" }])
    province: Province;

	@OneToMany(() => UserJob, o => o.user)
	@JoinColumn([{ name: "id", referencedColumnName: "job_id" }])
	user_jobs: UserJob[];
}
