import check1 from "./check1.jpg";
import check2 from "./check2.jpg";
import check3 from "./check3.jpg";
import check4 from "./check4.jpg";
import flower1 from "./flower1.png";
import flower2 from "./flower2.png";
import flower3 from "./flower3.png";

interface sampleDesignsInterface {
  check1: string;
  check2: string;
  check3: string;
  check4: string;
  flower1: string;
  flower2: string;
  flower3: string;
}

const sampleDesigns: sampleDesignsInterface = {
  check1,
  check2,
  check3,
  check4,
  flower1,
  flower2,
  flower3,
};

export { sampleDesigns };
