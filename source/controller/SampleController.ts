import googleVision from '@google-cloud/vision';
import { Request, Response } from 'express';
import pdfreader from 'pdfreader';
import textract from 'textract';
import { SampleService } from '../services/SampleService';
import BaseController from './BaseController';
const textToSpeech = require('@google-cloud/text-to-speech');
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate({ projectId: "mecopro" });
const client = new textToSpeech.TextToSpeechClient();

export class SampleController extends BaseController {
    private sampleService: SampleService;

    public constructor(sampleService: SampleService) {
        super();
        this.sampleService = sampleService;
    }

    public getText = async (req: Request & {file: any}, res: Response, next) => {
        try {
        // get the path of the file
        const pdfFile = req.file;
        console.log(req.query);
        let lang = 'en';
        if (req.query && req.query.language) {
             lang = req.query.language;
        }

        if(pdfFile.mimetype === 'application/json') {}

        // const pdfText = await this.getTextFromPdf(pdfFile, 10);
        const text = await new Promise(async (resolve, reject) => {
                await textract.fromBufferWithMime(pdfFile.mimetype, pdfFile.buffer, ( error, extractedText ) => {
                    return resolve(extractedText);
                });
            });


        // translate text to required language
        let translation = await this.sampleService.convertToSelectedLanguage(text, lang);
        

        translation = translation.substring(0, 4900);        

        await this.sampleService.convertTextToMP3(translation);
        
        return this.appResponse.success(res, 200 , {translation});
        } catch (error) {
             throw error;
        }

    }

    public getTextFromPdf = async (pdfFile, xwidth) => {
        // const text = await new Promise(async (resolve, reject ) => {
        //     await new pdfreader.PdfReader().parseBuffer(pdfFile.buffer, (err, item) => {
        //        return resolve(item.page);
        //     });
        // });
        // return text;
        return new Promise((resolve, reject) => {
            const pdftxt = new Array();
            let pg = 0;
            new pdfreader.PdfReader().parseBuffer(pdfFile.buffer, (err, item) => {
              if (err) { console.log('pdf reader error: ' + err); } else if (!item) {
                console.log('inside');
                pdftxt.forEach((a, idx) => {
                  pdftxt[idx].forEach((v, i) => {
                    pdftxt[idx][i].splice(1, 2);
                  });
                });
                resolve(pdftxt);
              } else if (item && item.page) {
                pg = item.page - 1;
                pdftxt[pg] = [];
              } else if (item.text) {
                  console.log(item.text, item.y, item.x);
                  resolve(item.text);
                // let t = 0;
                // let sp = '';
                // const newArray = [];
                // pdftxt[pg].forEach((val, idx) => {
                //   if (val[1] === item.y) {
                //     if (xwidth && item.x - val[2] > xwidth) {
                //       sp += ' ';
                //     } else {
                //       sp = '';
                //     }
                //     pdftxt[pg][idx][0] += sp + item.text;
                //     t = 1;
                //   }
                // });
                // if (t === 0) {
                //   pdftxt[pg].push([item.text, item.y, item.x]);
                // }
              }
            });
          });
    }
}
