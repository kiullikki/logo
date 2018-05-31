'use strict';
import { DATA_PATCH, DATA_STYLE, DATA_GRADIENT } from "./dataForSvg/dataLogo";

export class Svg {
  constructor(svgData) {
    this.svgNode = svgData.node;
    this.svgNS = 'http://www.w3.org/2000/svg';
    this.pathes = DATA_PATCH;
  }

  render(elem) {
    this.svgNode.appendChild(elem);
  }

  getGroupLogo() {
    const myG = document.createElementNS(this.svgNS,'g');
    const logo = this.pathes.logo;
    myG.setAttributeNS(null,'id', 'logo-paths');
    myG.appendChild(this.getPath(logo.bottomLayer, 'logo-paths__bottom', 'url(#gradient-bottom)'));
    myG.appendChild(this.getPath(logo.topLayer, 'logo-paths__top', 'url(#gradient-top)'));
    return myG;
  }

  getGroupElements() {
    const myG = document.createElementNS(this.svgNS,'g');
    const elements = this.pathes.elements;
    myG.setAttributeNS(null,'id', 'logo-elements');
    myG.appendChild(this.getPath(elements.path_1, 'red'));
    myG.appendChild(this.getPath(elements.path_2, 'red'));
    return myG;
  }

  getPath(path, className, fill) {
    const myPath = document.createElementNS(this.svgNS, 'path');
    myPath.setAttributeNS(null, 'class', className);
    myPath.setAttributeNS(null, 'fill', fill);
    myPath.setAttributeNS(null,'d', path); // set path 
    return myPath
  }

  // getPolygon(path, color) {
  //   const myPoligon = document.createElementNS(this.svgNS, 'polygon');
  //   myPoligon.setAttributeNS(null, 'fill', color);
  //   myPoligon.setAttributeNS(null,'points', path);
  //   return myPoligon
  // }

  getDefs() {
    const myDefs = document.createElementNS(this.svgNS, 'defs');
    myDefs.appendChild(this.getGradient(DATA_GRADIENT.bottom));
    myDefs.appendChild(this.getGradient(DATA_GRADIENT.top));
    return myDefs
  }

  getGradient(data) {
    const gradient = document.createElementNS(this.svgNS, 'linearGradient');
    gradient.setAttributeNS(null, 'id', data.id);
    gradient.setAttributeNS(null, 'gradientUnits', data.gradientUnits);
    gradient.setAttributeNS(null, 'x1', data.coords.start.x);
    gradient.setAttributeNS(null, 'y1', data.coords.start.y);
    gradient.setAttributeNS(null, 'x2', data.coords.end.x);
    gradient.setAttributeNS(null, 'y2', data.coords.end.y);

    // add stops for gradients
    data.stops.forEach((item, index) => {
      gradient.appendChild(this.getStops(item, index, data.id));
    });
    return gradient;
  }


  getStops(data, index, id) {
    const stop = document.createElementNS(this.svgNS, 'stop');
    const stopStyle = 'stop-opacity:1; stop-color:' + data.color;
    const myId = id + '_stop_' + index;
    stop.setAttributeNS(null, 'offset', data.offset);
    stop.setAttributeNS(null, 'style', stopStyle);
    stop.setAttributeNS(null, 'id', myId);
    return stop;
  }

  // getStyle(data) {
  //   const myStyle = document.createElementNS(this.svgNS, 'style');
  //   const myData = this.getData(data);
  //   myStyle.setAttributeNS(null, 'type', "text/css");
  //   // myStyle.innerHTML = '<[CDATA[' + myData + ']]>';
  //   return myStyle
  // }

  // getData(data) {
  //   let value = '';
  //   for (var key in data) {
  //     if (typeof data[key] !== "undefined") {
  //       value = value + ' .' + key + ' ' + data[key];
  //     }
  //   }
  //   return value
  // }
}