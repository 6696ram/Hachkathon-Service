import _ from 'lodash';
import { AppResponse } from '../services/AppResponse';


export default class BaseController {
    protected appResponse: AppResponse;
    public constructor() {
        this.appResponse = new AppResponse();
    }

    public handleError = (error) => {
        if (error.error || !_.isEmpty(error)) {
            error.status = error.statusCode ? error.statusCode : error.error[0].statusCode;
            error.error = error.message ? error.message : error.error[0].errors;
        } else {
            error.status = 500;
            error.error = 'Internal Server Error';
        }
        return error;
    }
}
