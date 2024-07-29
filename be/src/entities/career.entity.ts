import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Jobs } from "./job.entity";

@Index('careers_pkey', ['id'], { unique: true })
@Entity("careers")
export class Career {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    slug: string;

	@Column({nullable: true})
    hot: number;

	@Column({nullable: true})
    total_jobs: number;

	@Column({nullable: true})
    status: number;

    @Column("text",{nullable: true})
    avatar: string;

    @Column('timestamp', {
        name: 'created_at',
		...{nullable: true},
        default: () => 'now()',
    })
    created_at: Date;

    @Column('timestamp', {
        name: 'updated_at',
        nullable: true,
    })
    updated_at: Date;

	@OneToMany(() => Jobs, o => o.career)
	@JoinColumn([{ name: "id", referencedColumnName: "career_id" }])
	jobs: Jobs[];
}
