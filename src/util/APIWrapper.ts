import axios, { AxiosInstance, AxiosResponse } from 'axios';

class APIWrapper {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.OPENAPI || 'https://api.publicapis.org'
    });
  }
  
  public async callAPI (
    method: string,
    url: string,
    params?: object
  ): Promise<AxiosResponse>{
    const axiosResponse: AxiosResponse = await this.instance({
      method: method,
      url: url,
      params: params
    })
    return axiosResponse
  }
}

export default new APIWrapper();
