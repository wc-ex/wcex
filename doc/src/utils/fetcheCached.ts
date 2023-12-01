// 轻量级fetchCached 处理大量并发请求，支持使用CacheStorage进行缓存管理，支持超时，超时仅在发起请求时生效
// 支持请求组, 在切换页面时可一键取消请求组
// 支持进行中任务进度和速度获取
// 支持任务优先级设置
// 可根据类型查询任务，并取消
// 可修改缓存内容

// 1. serviceService仅允许https以及跨域问题
// 2. 缓存命中后，直接在前台打开, 提高速度

function _fetchWorkerFunction() {
	console.log("fetchWorkerFunction");
	self.onmessage = (ev) => {
		console.log("--- WORKER message:", ev.data);
	};
}

function _createWorker(fn: Function) {
	const blob = new Blob([`(${fn.toString()})()`], { type: "text/javascript" });
	const url = URL.createObjectURL(blob);
	return new Worker(url);
}

const _fetchWorker = _createWorker(_fetchWorkerFunction);

const _fetchTaskMap = new Map<number, (data: ArrayBuffer) => void>();

_fetchWorker.onmessage = (ev: MessageEvent) => {
	// 获取下载任务的返回结果
	console.log("--- WORKER message Reply:", ev.data);
};

let _fetchTaskCounter = 1;

interface ITransferableFormDataInfo {
	
		name: string;
		type: "file" | "arraybuffer";
		fileLastModified?: number;
		fileType?: string;	
	
}
interface ITransferableFormData {
	formdataInfo:ITransferableFormDataInfo[],
	transfers:(ReadableStream|ArrayBuffer)[]
}
/**
 * 解析fromData为可转移对象
 * @param formData
 * @returns
 */
function _formDataToTransferable(formData: FormData): ITransferableFormData {
	const data = {} as ITransferableFormData;
	formData.forEach((v, k) => {
		if (v instanceof File) {
			v.type;
			data.formdataInfo.push({
				name: v.name,
				type: "file",
				fileLastModified: v.lastModified,
				fileType: v.type,
			});
			data.transfers.push(v.stream());
		} else {
			data.formdataInfo.push({
				name: k,
				type: "arraybuffer",
			});
			data.transfers.push(new TextEncoder().encode(v));
		}
	});
	return data;
}

interface IFetchMessage {
	id: number;
	url: string;
	options: RequestInit & { timeout: number };
	bodyType?: "stream" | "arraybuffer" | "formData" | "string" | "blob";
	formDataInfo?: ITransferableFormDataInfo[];
}

type IFetchCachedOptions = RequestInit & {
	timeout?:number,
	group?:string,
	priority?:number,// 优先级,优先级不分组，统一计算, 优先级越大，越先执行, GET请求默认为0，POST和其他请求默认为1
}

type IFetchCachedFunction = ((url: string, options: IFetchCachedOptions) => Promise<Response>) & {

}

const _fetchCachedFunc = async function (
	url: string,
	options: IFetchCachedOptions
) {

}



export default _fetchCachedFunc;


// 实现队列化的fetchGet,限制并发数量，防止浏览器请求异常
// 超时时间在下载开始时计算，而不是发起任务时，超时后自动中断下载


// $model,导入模型，模型通过JsonSchema进行描述, 可自动根据描述生成表单信息
// 