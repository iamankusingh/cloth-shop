import cat from "./cat.png";
import react from "./react.png";
import threejs from "./threejs.png";

interface ImageExports {
  cat: string;
  react: string;
  threejs: string;
}

const exportedImages: ImageExports = {
  cat,
  react,
  threejs,
};

export { exportedImages };
