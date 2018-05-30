import { Svg } from "./modules/svg";
import { DATA_PATCH } from "./modules/dataForSvg/dataLogo";


const svgNode = document.getElementById('logo-svg');
const svgData={
  node: svgNode
};

let svgItem = new Svg(svgData);
let gLogo = svgItem.getGroupLogo();
let gElements = svgItem.getGroupElements();

svgItem.render(gLogo);
svgItem.render(gElements);