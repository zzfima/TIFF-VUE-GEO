<template>
  <v-container>
    <v-flex sx4>
      <input type="file" name="tiff-file" id="tiff-file" accept="image/tiff" required @change="readTIFF" />
      <div id="preview">
        <img v-if="imageData" :src="imageData" />
      </div>
      <v-text-field label="bbox" v-model="bbox" />
      <v-text-field label="pixelWidth" v-model="pixelWidth" />
      <v-text-field label="pixelHeight" v-model="pixelHeight" />
    </v-flex>
  </v-container>
</template>

<script>
import { get_tiff_image } from "./tiff_parser";

export default {
  name: "HelloWorld",

  data: () => ({
    imageData: "", // we will store base64 format of image in this string
    bbox: 0,
    pixelWidth: 0,
    pixelHeight: 0,
  }),
  methods: {
    readTIFF() {
      var files = document.getElementById("tiff-file").files;
      var file = files[0];
      console.log(file.type);

      this.imageData = URL.createObjectURL(file);

      get_tiff_image(file).then((image) => {
        this.bbox = image.getBoundingBox();
        this.pixelWidth = image.getWidth();
        this.pixelHeight = image.getHeight();
      });
    },
  },
};
</script>
