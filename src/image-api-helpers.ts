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

// function to base64 encode all images from image api
export const getAllImagesEncoded = async () => {
    // get all images
    const imageData = await getImageData();
    const encodedImages = await getEncodedImages(imageData)
    return encodedImages
}

const getEncodedImages = async (imageData) => {
    let encodedImages = []
    const imageFilePath = 'latestDownload.png'

    for (const image of imageData) {
        // parse out url
        const { url } = image;
        // download image
        await downloadImage(url, imageFilePath)
        // base64 encode image
        const imageAsBase64 = base64Encode(imageFilePath)
        // add base64 encoded image to array
        encodedImages.push(imageAsBase64)
    }
    return encodedImages
}
// function to filter images by image property and remove duplicates
export const getFilteredImagesEncoded = async (filterProperty: string) => {
    // get all images
    const imageData = await getImageData();
    console.log(`initial image length=${imageData.length}`)
    // get unique keys of image object
    const validProperties = new Set(Object.keys(imageData[0]))
    // check if filterProperty is one of the unique keys
    // if not then return null
    if (!validProperties.has(filterProperty)) {
        return null
    } else {
        // if so, then remove duplicates that exist in filterProperty
        const filteredData = removeDuplicates(imageData, filterProperty );
        console.log(`filtered image data = ${JSON.stringify(filteredData)}`)
        console.log(`filtered image length=${filteredData.length}`)

        // download and encode the images
        const encodedImages = await getEncodedImages(filteredData)
        return encodedImages
    }


}
function removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
        return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
    })
}