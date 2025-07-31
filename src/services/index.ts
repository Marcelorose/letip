import axios, { type AxiosInstance } from 'axios'

interface HttpClient {
  get(url: string): Promise<any>
}

export class AxiosClient implements HttpClient {
  axiosInstance: AxiosInstance

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://economia.awesomeapi.com.br',
      timeout: 10000,
    })
  }

  async get(url: string): Promise<any> {
    const response = await this.axiosInstance.get(url)
    return response.data
  }
}

export interface IExchangeRateAPI {
  getExchangeRateByCurrency(currency: string | string[]): Promise<any>
}

export default class ExchangeRateAPI implements IExchangeRateAPI {
  httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient
  }

  async getExchangeRateByCurrency(currency: string | string[]) {
    const data = await this.httpClient.get(
      `/json/last/${Array.isArray(currency) ? currency.join(',') : currency}`,
    )
    const mappedData = {} as any
    Object.keys(data)?.forEach((key: string) => {
      mappedData[key] = data[key]?.bid
    })
    return mappedData
  }
}
