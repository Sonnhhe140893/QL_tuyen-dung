import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { BadRequestException } from 'src/helpers/helper';

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(
		// private permissionService: PermissionService

	) {
	}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {

		const request = context.switchToHttp().getRequest();
		if(process.env.CHECK_PERMISSION == 'false') {
			return true;
		}
		let userInfo = request.user || null;
		if(_.isEmpty(userInfo) || (userInfo?.type !== 1 && userInfo?.status !== 1)) {
			throw new BadRequestException({ code: 'LG0401' });
		}
		// return true;
		// if(_.isEmpty(userInfo.roles)) {
		// 	throw new BadRequestException({ code: 'LG0403' });
		// }
		let roles = userInfo.roles;
		const path = request.path.replace("/api/v1/admin/", "");
		// if(!checkRole) {
		// 	throw new BadRequestException({ code: 'LG0403' });
		// }

		// if ( roles?.length > 0 )
		// {
		// 	for ( let i = 0; i < roles.length; i++ )
		// 	{
		// 		let permissions = roles[ i ].permissions;
		// 		// console.log( '=========> ROLE  <=============', roles[ i ].name );
		// 		for ( let j = 0; j < permissions.length; j++ )
		// 		{
		// 			let permissionDB = await permissionService.findOne( { id: permissions[ i ] } )
		// 			if ( permissionDB )
		// 			{
		// 				let checkPath = permissionDB.path;
		// 				if ( path.includes( checkPath ) )
		// 				{
		// 					// console.log( '============= PERMISSION PATH: ', checkPath );
		// 					// console.log( '============= PERMISSION pathUrlRoute: ', pathUrlRoute );
		// 					return true;
		// 				}
		// 			}
		// 		}
		// 	}
		// 	console.log( '=========> KHÔNG CÓ QUYỀN TRUY CẬP <=============' );
		// }
		
		return true;

		// const user = request.user;
		// if (_.isEmpty(this.role)) {
		// 	throw new BadRequestException({ code: 'LG0403' });
		// }
		// if (_.isEmpty(user)) {
		// 	throw new BadRequestException({ code: 'LG0401' });
		// }
		// if (!this.role.includes(user.role)) {
		// 	throw new BadRequestException({ code: 'LG0403' });
		// }
		return true;
	}
}
