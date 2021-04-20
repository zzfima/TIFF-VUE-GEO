<template>
  <v-container>
    <v-flex sx4>
      <input type="file" name="tiff-file" id="tiff-file" accept="image/tiff" required @change="readTIFF" />
      <canvas id="plot"></canvas>
      <v-text-field label="BoundingBox" v-model="BoundingBox" />
      <v-text-field label="Origin" v-model="Origin" />
      <v-text-field label="Resolution" v-model="Resolution" />
      <v-text-field label="Width" v-model="Width" />
      <v-text-field label="Height" v-model="Height" />
      <v-text-field label="TileWidth" v-model="TileWidth" />
      <v-text-field label="TileHeight" v-model="TileHeight" />
      <v-text-field label="SamplesPerPixel" v-model="SamplesPerPixel" />
    </v-flex>
  </v-container>
</template>

<script>
import { get_tiff_image } from "./tiff_parser";
import { plot } from "plotty";

export default {
  name: "TIFFVisualizer",

  data: () => ({
    imageData: "", // we will store base64 format of image in this string
    BoundingBox: 0,
    Origin: 0,
    Resolution: 0,
    Width: 0,
    Height: 0,
    TileWidth: 0,
    TileHeight: 0,
    SamplesPerPixel: 0,
  }),
  methods: {
    readTIFF() {
      this.BoundingBox = 0;
      this.Origin = 0;
      this.Resolution = 0;
      this.Width = 0;
      this.Height = 0;
      this.TileWidth = 0;
      this.TileHeight = 0;
      this.SamplesPerPixel = 0;

      var files = document.getElementById("tiff-file").files;
      var file = files[0];
      console.log(file.type);

      this.imageData = URL.createObjectURL(file);

      get_tiff_image(file).then((image) => {
        this.BoundingBox = image.getBoundingBox();
        this.Origin = image.getOrigin();
        this.Resolution = image.getResolution();
        this.Width = image.getWidth();
        this.Height = image.getHeight();
        this.TileWidth = image.getTileWidth();
        this.TileHeight = image.getTileHeight();
        this.SamplesPerPixel = image.getSamplesPerPixel();

        var width = this.Width;
        var height = this.Height;
        (async function () {
          const data = await image.readRasters();
          const canvas = document.getElementById("plot");
          new plot({
            canvas,
            data: data[0],
            width: width,
            height: height,
            domain: [0, 256],
            colorScale: "viridis",
          }).render();
        })();
      });
    },
  },
};
</script>
