const textToSpeech = require("@google-cloud/text-to-speech");
const { Translate } = require("@google-cloud/translate").v2;
const fs = require("fs");
const util = require("util");
// Creates a client
const translate = new Translate({ projectId: "mecopro" });
const client = new textToSpeech.TextToSpeechClient();
export class SampleService {
  public convertToSelectedLanguage = async (text, convertedLanguage) => {
    // The text to translate
    // The target language
    const target = convertedLanguage;
    // Translates some text into Russian
    const [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
    return translation;
  };
  public getSample = async () => {
    return {
      name: "TESTING",
      city: "Bangalore"
    };
  };
  public convertTextToMP3 = async textToConvet => {
    const convertedLanguage = "kn";
    // The text to synthesize
    const text = await this.convertToSelectedLanguage(
      textToConvet || "My name is Spandana",
      convertedLanguage
    );
    // Construct the request
    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: convertedLanguage, ssmlGender: "NEUTRAL" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" }
    };
    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("output.mp3", response.audioContent, "binary");
    console.log("Audio content written to file: output.mp3");
  };
}