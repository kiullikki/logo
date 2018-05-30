'use strict';
import { DATA_PATCH, DATA__STYLE } from "./dataForSvg/dataLogo";

export class Svg {
  constructor(svgData) {
    this.svgNode = svgData.node;
    this.svgNS = 'http://www.w3.org/2000/svg';
    this.pathes = DATA_PATCH;
  }

  render(elem) {
    this.svgNode.appendChild(elem);
    this.svgNode.appendChild(this.getDefs());
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
    myG.appendChild(this.getPath(logo.bottomLayer, 'fil0'));
    myG.appendChild(this.getPath(logo.topLayer, 'fil1'));
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

  getPath(path, className) {
    const myPath = document.createElementNS(this.svgNS, 'path');
    myPath.setAttributeNS(null, 'class', className);
    myPath.setAttributeNS(null,'d', path); // set path 
    return myPath
  }

  getPolygon(path, color) {
    const myPoligon = document.createElementNS(this.svgNS, 'polygon');
    myPoligon.setAttributeNS(null, 'fill', color);
    myPoligon.setAttributeNS(null,'points', path);
    return myPoligon
  }

  getDefs() {
    const myDefs = document.createElementNS(this.svgNS, 'defs');
    myDefs.appendChild(this.getStyle(DATA__STYLE));
    return myDefs
  }

  getStyle(data) {
    const myStyle = document.createElementNS(this.svgNS, 'style');
    const myData = this.getData(data);
    myStyle.setAttributeNS(null, 'type', "text/css");
    myStyle.textContent = '<![CDATA[' + myData + ']]>';
    return myStyle
  }

  getData(data) {
    let str = '';
    for (var key in data) {
      if (typeof data[key] !== "undefined") {
        let str = str + '.' + key + data[key];
      }
    }
    return str
  }
}