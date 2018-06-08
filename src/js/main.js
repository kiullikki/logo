import { Svg } from "./modules/svg";
import { DATA_COLORS, ID_FILL_MAP } from "./modules/dataForSvg/dataLogo";
import { AnimationColors } from "./modules/animation-fn";

const svgNode = document.getElementById('logo-svg');
const svgData={
  node: svgNode
};

let svgItem = new Svg(svgData);
svgItem.render();

//animation colors
const animationLogo = new AnimationColors(svgNode);
animationLogo.init();

function mouseoverHandler() {
  animationLogo.run();
}

svgNode.addEventListener('mouseenter', mouseoverHandler);
