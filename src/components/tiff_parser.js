export { get_tiff_image };

import { fromBlob, } from 'geotiff';

async function get_tiff_image(url) {
  const tiff = await fromBlob(url);
  return await tiff.getImage();
}
