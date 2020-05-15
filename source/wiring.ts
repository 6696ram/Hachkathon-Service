import {
    SampleController,
} from './controller';
import {
    SampleService,
} from './services';

class Wiring {
    /**
     * Services
     */
    public sampleService = new SampleService();

    /**
     * controllers
     */
    public sampleController = new SampleController(this.sampleService);

}

export default new Wiring();
