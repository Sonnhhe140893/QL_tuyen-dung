import * as _ from 'lodash'
export const newArrayError = (arr: any, message: string) => {
		if(!_.isEmpty(arr)) {
			return arr.push(message);
		}
		return [message];
}

export function getSecond() {
	let currentTime = new Date();
	return Math.floor(currentTime.getTime() / 1000);
}

export const makeId = (length) => {
	let result = '';
	let characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let charactersLength = characters.length;
	for ( let i = 0; i < length; i++ )
	{
		result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
	}
	return result;
}
export const toSlug = ( str ) =>
{
	if ( str )
	{
		str = str.toLowerCase();

		// xóa dấu
		str = str
			.normalize( 'NFD' ) // chuyển chuỗi sang unicode tổ hợp
			.replace( /[\u0300-\u036f]/g, '' ); // xóa các ký tự dấu sau khi tách tổ hợp

		// Thay ký tự đĐ
		str = str.replace( /[đĐ]/g, 'd' );

		// Xóa ký tự đặc biệt
		str = str.replace( /([^0-9a-z-\s])/g, '' );

		// Xóa khoảng trắng thay bằng ký tự -
		str = str.replace( /(\s+)/g, '-' );

		// Xóa ký tự - liên tiếp
		str = str.replace( /-+/g, '-' );

		// xóa phần dư - ở đầu & cuối
		str = str.replace( /^-+|-+$/g, '' );
	}
	return str;
}