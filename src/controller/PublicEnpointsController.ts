import { Request, Response } from 'express';
import APIWrapper from '../util/APIWrapper';
import { AxiosResponse } from 'axios';
import { HttpMethod } from '../constants/HttpMethod';

class PublicEnpointsController {
	async entries(req: Request, res: Response) {
		try {
      // send these quesry paramas to call api util and get response
			const response: AxiosResponse = await APIWrapper.callAPI(HttpMethod.GET, '/entries', req?.query);
			return res.status(200).json(response?.data);
		} catch (error) {
			return res.status(500).json('Internal server error!');
		}
	}
	async random(req: Request, res: Response) {
		try {
      // send these quesry paramas to call api util and get response
			const response: AxiosResponse = await APIWrapper.callAPI(HttpMethod.GET, '/random', req?.query);
			return res.status(200).json(response?.data);
		} catch (error) {
			return res.status(500).json('Internal server error!');
		}
	}
	async categories(req: Request, res: Response) {
		try {
      // send these quesry paramas to call api util and get response
			const response: AxiosResponse = await APIWrapper.callAPI(HttpMethod.GET, '/categories');
			return res.status(200).json(response?.data);
		} catch (error) {
			return res.status(500).json('Internal server error!');
		}
	}
	async healthCheck(req: Request, res: Response) {
		try {
      // send these quesry paramas to call api util and get response
			const response: AxiosResponse = await APIWrapper.callAPI(HttpMethod.GET, '/health');
			return res.status(200).json(response?.data);
		} catch (error) {
			return res.status(500).json('Internal server error!');
		}
	}
}

export default new PublicEnpointsController();
