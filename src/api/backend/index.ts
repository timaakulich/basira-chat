import Api from "@/api";
import routes from '@/api/backend/routes'

class BackendService {
    client: Api
    constructor() {
        this.client = new Api({
            baseURL: process.env.BACKEND_URL,
            timeout: 30000,
            interceptors: []
        });
    }

    async createMessage(message: string): Promise<unknown> {
        return await this.client.post({
            url: routes.messages,
            config: {
                message
            }
        })
    }

    async createSuggestions(): Promise<unknown> {
        return await this.client.post({
            url: routes.suggestions
        })
    }
}

export default BackendService