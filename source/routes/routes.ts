import multer from 'multer';
import wiring from '../wiring';
const inMemoryStorage = multer.memoryStorage();
const singleFileUpload = multer({ storage: inMemoryStorage });

export class Routes {

    public routes(app: any): void {

        app.post('/api/v1/file', singleFileUpload.single('file'), wiring.sampleController.getText);
    }
}
