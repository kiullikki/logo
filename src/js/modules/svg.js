'use strict';
import { DATA_PATCH } from "./dataForSvg/dataPath";

export class Svg {
  constructor(svgData) {
    this.svgNode = svgData.node;
    this.svgNS = 'http://www.w3.org/2000/svg';
    this.pathes = DATA_PATCH;
  }

  render(elem) {
    this.svgNode.appendChild(elem);
  }

  getCircle(data) {
    const myCircle = document.createElementNS(this.svgNS,"circle"); //to create a circle. for rectangle use "rectangle"
    myCircle.setAttributeNS(null,"id","mycircle");
    myCircle.setAttributeNS(null,"cx",100);
    myCircle.setAttributeNS(null,"cy",100);
    myCircle.setAttributeNS(null,"r", data.r);
    myCircle.setAttributeNS(null,"fill","none");
    myCircle.setAttributeNS(null,"stroke", data.stroke);
    myCircle.setAttributeNS(null,"stroke-width", data.width);

    return myCircle;
  }

  getGroupLogo() {
    const myG = document.createElementNS(this.svgNS,'g');
    const logo = this.pathes.logo;
    myG.setAttributeNS(null,'id', 'logo-paths');
    myG.appendChild(this.getPath(logo.bottomLayer, 'green'));
    myG.appendChild(this.getPath(logo.topLayer, 'yellow'));
    return myG;
  }

  getGroupElements() {
    const myG = document.createElementNS(this.svgNS,'g');
    const elements = this.pathes.elements;
    myG.setAttributeNS(null,'id', 'logo-elements');
    myG.appendChild(this.getPolygon(elements.poligon_1, 'red'));
    myG.appendChild(this.getPolygon(elements.poligon_2, 'red'));
    myG.appendChild(this.getPath(elements.path_1, 'red'));
    myG.appendChild(this.getPath(elements.path_2, 'red'));
    return myG;
  }

  getPath(path, color) {
    const myPath = document.createElementNS(this.svgNS, 'path');
    myPath.setAttributeNS(null, 'fill', color);
    myPath.setAttributeNS(null,'d', path); // set path 
    return myPath
  }

  getPolygon(path, color) {
    const myPoligon = document.createElementNS(this.svgNS, 'polygon');
    myPoligon.setAttributeNS(null, 'fill', color);
    myPoligon.setAttributeNS(null,'points', path);
    return myPoligon
  }
}