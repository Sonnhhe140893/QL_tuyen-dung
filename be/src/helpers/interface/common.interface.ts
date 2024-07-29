export interface IPaging {
	page: number,
	page_size: number,
	total?: number
}

export interface IHttpStatus {
	error: string,
	success: string,
	fail: string
}