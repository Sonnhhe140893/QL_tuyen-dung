import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Jobs } from "./job.entity";
import { User } from "./user.entity";

@Index('user_jobs_pkey', ['id'], { unique: true })
@Entity("user_jobs")
export class UserJob {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true,})
    user_id: number;

	@Column({nullable: true,})
    name: String;

	@Column({nullable: true,})
    phone: String;

	@Column({nullable: true,})
    email: String;

	@Column("text",{nullable: true,})
    address: String;

    @Column({nullable: true,})
    job_id: number;

	@Column({nullable: true,})
    company_id: number;

	@Column({nullable: true,})
    file: string;

	@Column({nullable: true,})
    status: number;

    @Column("text",{nullable: true,})
    message: string;

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

	@ManyToOne(() => Jobs, (user) => user.user_jobs)
	@JoinColumn([{ name: "job_id", referencedColumnName: "id" }])
    job: Jobs;


	@ManyToOne(() => Company, (user) => user.user_jobs)
	@JoinColumn([{ name: "company_id", referencedColumnName: "id" }])
    company: Company;

	@ManyToOne(() => User, (user) => user.user_jobs)
	@JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
    user: User;
}
