import { base64Encode, downloadImage, getFilteredImage, getImageData } from "./image-api-helpers";

const express = require('express');
// const dotenv = require('dotenv');

// dotenv.config();

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('You take-home app welcome page!');
});
app.get('/metadata/:image_index', async (req, res) => {
  console.log("image index  is " + req.params.image_index);
  const imageIndex = req.params.image_index
  // Query image api to get image filtered on imageIndex
  const filteredImage = await getFilteredImage(imageIndex)
  // Return the URL and title of the image with that index.
  const responseData = JSON.stringify({url: filteredImage.url, title: filteredImage.title})
  res.send(responseData)
})
app.get('/image/:image_index', async (req, res) => {
  console.log("image index  is " + req.params.image_index);
  const imageIndex = req.params.image_index

  // filter images to get image with imageIndex
  const filteredImage = await getFilteredImage(imageIndex)
  const imageUrl = filteredImage['url']
  // download image using url and store in local path defined as imagePath
  const imagePath = 'latestDownload.png'
  console.log(`downloading image to path = ${imagePath}`)

  await downloadImage(imageUrl, imagePath)
  // base64 encode image file
  console.log('finished downloading image. Now going to base64 encode file')
  const imageAsBase64 = base64Encode(imagePath)
  console.log(`base64 encoded image = ${imageAsBase64}`)
  // return base64 encoded image file
  res.send(imageAsBase64)
  // download the image from its URL and return it base64 encoded.
})
app.get('/images', async (req, res) => {
  // check if filter query param is passed in
  const filterQueryparam = req.query.filter;
  if (!filterQueryparam) {
    // if not then return all images base64 encoded
    console.log("Return all images base64 encoded");
  } else {
    //  Use filter query param to filter by an image property to remove any duplicates.
    //  If the property doesn't exist, you should return the proper HTTP status code
  }
  
})
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
