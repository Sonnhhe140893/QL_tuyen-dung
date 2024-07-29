import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { BadRequestException } from 'src/helpers/helper';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		return super.canActivate(context);
	}

	handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
		if(process.env.CHECK_AUTH == 'false') {
			return user;
		}
        if ((err || !user)) {
            throw new BadRequestException({code: 'LG0401'});
        }
        return user;
    }
}
