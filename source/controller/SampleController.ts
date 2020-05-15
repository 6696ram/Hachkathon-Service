import { Request, Response } from 'express';
import { SampleService } from '../services/SampleService';
import BaseController from './BaseController';

export class SampleController extends BaseController {
    private sampleService: SampleService;

    public constructor(sampleService: SampleService) {
        super();
        this.sampleService = sampleService;
    }

    public getSample = async (req: Request, res: Response, next) => {
        const sample = await this.sampleService.getSample();
        return this.appResponse.success(res, 200 , sample);
    }

}
