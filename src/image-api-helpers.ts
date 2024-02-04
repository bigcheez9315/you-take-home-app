import axios from "axios";
import fs from 'fs'
const IMAGE_API_BASE_URL = 'https://youdotcom-interview-api.azurewebsites.net/api/HttpAPI';

// Function to get image data
export const getImageData = async () => {
    const resp = await axios.get(IMAGE_API_BASE_URL)
    return resp.data
}

// function to filter image data by index
export const getFilteredImage = async (imageIndex: string) => {
    const imageData = await getImageData();
    const filteredImages = imageData.filter(function (el) {
        return el.index == imageIndex 
      });
    console.log(`filtered images: ${JSON.stringify(filteredImages)}`)
    return filteredImages[0]
}

// Function to download image from a url and store it in local file with
// path = image_path
export const downloadImage = (url: string, imagePath: string) =>
  axios({
    url,
    responseType: 'stream',
  }).then(
    response =>
      new Promise<void>((resolve, reject) => {
        response.data
          .pipe(fs.createWriteStream(imagePath))
          .on('finish', () => resolve())
          .on('error', e => reject(e));
      }),
  );

  export const base64Encode = (file) =>  {
    // read binary data
    return  fs.readFileSync(file, { encoding: 'base64' });;
}