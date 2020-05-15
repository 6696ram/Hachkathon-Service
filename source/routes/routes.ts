import wiring from '../wiring';

export class Routes {

    public routes(app: any): void {

        /**
         * Sample Route
         * @swagger
         * /api/v1/sample/{sampleId}:
         *  get:
         *    description: Returns Sample Output
         *    parameters:
         *     - name: sampleId
         *       in: path
         *       required: true
         *       description: Parameter description in Sample API
         *       schema:
         *        type : integer
         *    responses :
         *       200 :
         *         description : Samples Collection
         */
        app.get('/api/v1/sample/:sampleId', wiring.sampleController.getSample);
    }
}
