import { Svg } from "./modules/svg";
import { DATA_COLORS, ID_FILL_MAP } from "./modules/dataForSvg/dataLogo";
import { AnimationColors } from "./modules/animation-fn";

const svgNode = document.getElementById('logo-svg');
const svgData={
  node: svgNode
};

let svgItem = new Svg(svgData);
let gLogo = svgItem.getGroupLogo();
let gElem = svgItem.getGroupElements();
svgItem.render(gLogo);
svgItem.render(gElem);

//animation colors


const animationLogo = new AnimationColors(svgNode);
animationLogo.init();