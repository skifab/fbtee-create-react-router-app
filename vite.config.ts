import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fbteePreset from "@nkzw/babel-preset-fbtee";
import babel from "vite-plugin-babel";

export default defineConfig({
  plugins: [
    {
      ...babel({
        filter: /\.tsx?$/,
        babelConfig: { 
          presets: ["@babel/preset-typescript",fbteePreset]
        },
      }),
    },
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths()],
});
