import { Response } from 'express';
export class AppResponse {
    public readonly SUCCESS = 200;
    public readonly INTERNAL_SERVER_ERROR = 500;
    public readonly BAD_REQUEST = 400;
    public readonly UNAUTHORIZED = 401;
    public readonly NOT_FOUND = 404;

    public success = (res: Response, code: number, data: any) => {
        res.status(code).send(data);
    }

    public error = (res: Response, code: number, errorMessage: string) => {
        res.status(code).send({
            statusCode: code,
            message: errorMessage,
        });
    }

    public badRequest = (res: Response, errorMessage: string) => {
        res.status(this.BAD_REQUEST).send({
            statusCode: this.BAD_REQUEST,
            message: errorMessage,
        });
    }

    public unauthorized = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.UNAUTHORIZED).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

    public notFound = (res: Response, code: string, message: string, description: string = '') => {
        res.status(this.NOT_FOUND).send({
            status: 'FAILURE',
            data: {
                error: {
                    code,
                    message,
                    description,
                },
            },
        });
    }

}
