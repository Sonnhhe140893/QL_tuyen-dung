export class Paging {
    private readonly page: number
    private readonly page_size: number
    private readonly total_page: number
    private readonly total: number

    constructor(page: number, page_size: number, total: number) {
        this.page = Number(page)
        this.page_size = Number(page_size)
        this.total = total;
		console.log(total / page_size);
        this.total_page = Math.ceil(total / page_size)
    }
}
