import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from 'src/entities';
import { CategoryService } from 'src/service/category.service';
import { CategoryRepository } from 'src/repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category])
    ],
    controllers: [CategoryController],
    providers: [CategoryRepository, CategoryService],
    exports: [TypeOrmModule]
})
export class CategoryModule {}
