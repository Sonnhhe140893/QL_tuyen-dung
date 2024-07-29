import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Jobs } from "./job.entity";

@Index('categories_pkey', ['id'], { unique: true })
@Entity("categories")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column("text",{nullable: true})
    description: string;

	@Column({nullable: true})
    type: number;

	@Column({nullable: true})
    slug: string;

	@Column({nullable: true})
    status: number;

    @Column("text",{nullable: true})
    avatar: string;

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
}
