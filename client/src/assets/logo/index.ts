import cat from "./cat.png";
import react from "./react.png";
import threejs from "./threejs.png";
import dog from "./dog.png";
import elephant from "./elephant.png";
import flower from "./flower.png";
import giraffe from "./giraffe.png";
import js from "./js.png";
import linux from "./linux.png";
import moon from "./moon.png";
import nodejs from "./nodejs.png";
import peacockFeather from "./peacockFeather.png";

interface sampleLogoInterface {
  cat: string;
  react: string;
  threejs: string;
  dog: string;
  elephant: string;
  flower: string;
  giraffe: string;
  js: string;
  linux: string;
  moon: string;
  nodejs: string;
  peacockFeather: string;
}

const sampleLogo: sampleLogoInterface = {
  cat,
  react,
  threejs,
  dog,
  elephant,
  flower,
  giraffe,
  js,
  linux,
  moon,
  nodejs,
  peacockFeather: peacockFeather,
};

export { sampleLogo };
