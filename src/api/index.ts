// @ts-nocheck
import axios, {AxiosError, AxiosInstance, AxiosRequestHeaders, AxiosResponse,} from 'axios'

interface AxiosRequestArgs {
    url: string;
    config?: any;
}

interface AxiosInstanceConfig {
    baseURL: string | undefined;
    timeout: number;
    headers?: AxiosRequestHeaders;
    interceptors: {
        // eslint-disable-next-line no-unused-vars
        onFulfilled: (res: any) => any;
        // eslint-disable-next-line no-unused-vars
        onReject?: (error: AxiosError) => AxiosError;
        type: 'request' | 'response';
    }[];
}

/**
 * @description
 * Parent class for whole application API.
 * Must be created at the root component.
 */
export default class Api {
    instance: AxiosInstance;

    constructor(config: AxiosInstanceConfig) {
        this.instance = this.init(config);
    }

    private init(config: AxiosInstanceConfig) {
        return axios.create({ ...config });
    }

    async get({ url, config = {} }: AxiosRequestArgs): Promise<AxiosResponse | any> {
        return await this.instance.get(url, config);
    }

    async post({ url, config = {} }: AxiosRequestArgs) {
        return await this.instance.post(url, config);
    }

    async patch({ url, config = {} }: AxiosRequestArgs) {
        return await this.instance.patch(url, config);
    }

    async put({ url, config = {} }: AxiosRequestArgs) {
        return await this.instance.put(url, config);
    }

    async delete({ url, config = {} }: AxiosRequestArgs) {
        return await this.instance.delete(url, config);
    }
}
