import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";
import { Jobs } from "./job.entity";

@Index('provinces_pkey', ['id'], { unique: true })
@Entity("provinces")
export class Province {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    slug: string;

	@Column({nullable: true})
    code: string;

    @Column({nullable: true})
    ghn: string;

	// @Column('text',{nullable: true})
    // ghn: any;

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

	@OneToMany(() => Jobs, company => company.province)
	@JoinColumn([{ name: 'id', referencedColumnName: 'province_id' }])
	jobs: Jobs[];
}
