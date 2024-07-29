import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Jobs } from "./job.entity";
import { User } from "./user.entity";
import { UserJob } from "./user-job.entity";

@Index('companies_pkey', ['id'], { unique: true })
@Entity("companies")
export class Company {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({nullable: true})
	slug: string;

	@Column({nullable: true})
	email: string;

	@Column("text",{nullable: true,})
	logo: string;

	@Column("text",{nullable: true,})
	address: string;

	@Column({nullable: true,})
	phone: string;

	@Column("text",{nullable: true,})
	website: string;

	@Column("text",{nullable: true,})
	content: string;

	@Column({nullable: true,})
	status: number;

	@Column({nullable: true,})
	user_id: number;


	@Column({nullable: true,})
	scale: number;

	@Column({nullable: true,})
	working_time: number;

	
	@Column('timestamp', {
		name: 'created_at',
		nullable: true,
		
	})
	created_at: Date;

	@Column('timestamp', {
		name: 'updated_at',
		nullable: true,
		
	})
	updated_at: Date;

	@OneToMany(() => Jobs, o => o.company)
	@JoinColumn([{ name: "id", referencedColumnName: "company_id" }])
	jobs: Jobs[];

	@OneToMany(() => UserJob, o => o.company)
	@JoinColumn([{ name: "id", referencedColumnName: "company_id" }])
	user_jobs: UserJob[];

	@OneToOne(() => User, user=> user.company)
	@JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
	user: User;


}
