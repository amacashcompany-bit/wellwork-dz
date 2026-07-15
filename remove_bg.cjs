const { Jimp } = require('jimp');

async function removeBackground() {
  try {
    const image = await Jimp.read('src/assets/brand/wellwork-logo-mark.jpg');
    
    // Replace black-ish pixels with transparent pixels
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // Threshold for black (can be adjusted)
      if (red < 35 && green < 35 && blue < 35) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });

    await image.write('src/assets/brand/wellwork-logo-mark.png');
    console.log("Image saved as PNG with transparent background!");
  } catch (err) {
    console.error(err);
  }
}

removeBackground();
