'use strict';
import { DATA_PATHS, DATA_STYLE, DATA_GRADIENT, ID_FILL_MAP } from "./dataForSvg/dataLogo";

export class Svg {
  constructor(svgData) {
    this.svgNode = svgData.node;
    this.svgNS = 'http://www.w3.org/2000/svg';
    this.pathes = DATA_PATHS;
    this.fillForElements = {
      0: 'rgb(199, 166, 18)',
      1: 'rgb(136, 189, 11)'
    };
  }

  render() {
    let fragment = document.createDocumentFragment();
    let gLogo = this.getGroupLogo();
    let gElem = this.getGroupElements();
    fragment.appendChild(gLogo);
    fragment.appendChild(gElem);
    this.svgNode.appendChild(fragment);
  }

  getGroupLogo() {
    const myG = document.createElementNS(this.svgNS,'g');
    const pathNames = Object.getOwnPropertyNames(this.pathes.logo);
    myG.setAttributeNS(null,'id', 'logo-paths');
    pathNames.forEach((name) => {
      myG.appendChild(this.getPath(this.pathes.logo[name], name));
    });
    return myG;
  }

  getGroupElements() {
    // const fillOtherElem = "url(#id0)";
    // const pathOtherElem = this.pathes.elements['1'];
  
    const myG = document.createElementNS(this.svgNS,'g');
    const pathNames = Object.getOwnPropertyNames(this.pathes.elements);
    myG.setAttributeNS(null,'id', 'logo-elements');
  
    // myG.appendChild(this.getPath(pathOtherElem, '1', fillOtherElem));
  
    pathNames.forEach((name) => {
      myG.appendChild(this.getPath(this.pathes.elements[name], name, this.fillForElements[name]));
    });
    return myG;
  }

  getPath(path, idPath, fill) {
    const myPath = document.createElementNS(this.svgNS, 'path'),
          url = 'url(#' + ID_FILL_MAP[idPath] + ')',
          className = 'svg-logo__path-' + idPath;

    let fillValue = fill || url;
          
    myPath.setAttributeNS(null, 'class', className);
    myPath.setAttributeNS(null, 'fill', fillValue);
    myPath.setAttributeNS(null,'d', path); // set path 
    return myPath
  }


  getDefs() {
    const myDefs = document.createElementNS(this.svgNS, 'defs');
    DATA_GRADIENT.forEach((item) => {
      myDefs.appendChild(this.getGradient(item));
    });
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
}