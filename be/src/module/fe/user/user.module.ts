import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repository';
import { UserService } from 'src/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';

@Module({
	imports: [
        TypeOrmModule.forFeature([User])
    ],
	controllers: [UserController],
	providers: [UserRepository, UserService],
	exports: [UserService]
})
export class UserModule { }
