
export interface IQueryType {
	LIKE?: any[],
	EQUAL?: any[],
	BETWEEN_DATE?: any[],
};
export const buildModalService = async (query: any, queryType: IQueryType) => {
	let conditions: any = {};
	let newQueryTypeArr = Object.entries(queryType).reduce((newArr: any, item: any, index: any) => {
		if(item && index > 0) {
			newArr = newArr.concat(item[1])
		}
		return newArr
	}, []);
	
	console.log(newQueryTypeArr);
	if(query?.filters) {
		console.log("query-------> ", query?.filters);
		for(let [key, value] of Object.entries(query?.filters)) {
			
		}
		
	}
}