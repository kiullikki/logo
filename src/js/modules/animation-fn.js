'use strict';
import { DATA_COLORS, ID_FILL_MAP, DATA_COLOR_POINTS } from "./dataForSvg/dataLogo";

export class AnimationColors {
  constructor(node) {
    this.node = node;
    this.gradientStopList = [];
    this.colors = [];
    this.colorPoints = DATA_COLOR_POINTS;
    this.colorsLength = null;
    this.iterationNumber = 0;
    this.timeAnimation = 50;
  }

  init() {
    let gradientSortList = this.sortedGradientList(this.node, ID_FILL_MAP);
    this.gradientStopList = this.getGradientStopList(gradientSortList);
    this.getColorList();

    setInterval( this.animationIteration.bind(this), this.timeAnimation);
  }

  sortedGradientList(node, mapIdFill) {
    const numbers = Object.getOwnPropertyNames(mapIdFill);
    let sortList = [];
    numbers.forEach((number) => {
      let elem = node.getElementById(mapIdFill[number]);
      sortList.push(elem);
    });
    return sortList;
  }

  getGradientStopList(gradientList) {
    let stopAllNodes = [];
    gradientList.forEach((gradient) => {
      const stopList = gradient.querySelectorAll('stop');
      stopAllNodes.push(stopList);
    });
    return stopAllNodes;
  }

  nodeChangeColors(nodes, iterationNumber, colors) {
    nodes.forEach((node, index) => {
      let colorNumber = this.changeColor(index, iterationNumber, colors.length-1);
      node[0].style = 'stop-color:' + colors[colorNumber];
      node[1].style = 'stop-color:' + colors[colorNumber + 1];
    });
    return nodes;
  }

  changeColor(index, count, maxColorsCount) {
    let colorNumber = (index + count) % maxColorsCount;
    return colorNumber;
  }

  getStepCangeColor(value_1, value_2, quantity) {
    return (value_1 - value_2) / quantity;
  }

  getColorValue(r, g, b) {
    return "rgb(" + r + ', ' + g + ', ' + b + ')';
  }

  getColorList() {
    let lastColor = this.getColorValue(this.colorPoints.orange.r, this.colorPoints.orange.g, this.colorPoints.orange.b);
    let colorsValue_1 = this.getColors(this.colorPoints.orange, this.colorPoints.lime, 22);
    let colorsValue_2 = this.getColors(this.colorPoints.lime, this.colorPoints.green, 23);
    let colorsValue_3 = this.getColors(this.colorPoints.green, this.colorPoints.lime, 23);
    let colorsValue_4 = this.getColors(this.colorPoints.lime, this.colorPoints.orange, 22);
    this.colors = this.colors.concat(colorsValue_1, colorsValue_2, colorsValue_3, colorsValue_4);
    this.colors.push(lastColor);
    this.colorsLength = this.colors.length - 1;
  }

  getColors(color_1, color_2, quantity) {
    const colors = [];
    const stepR = this.getStepCangeColor(color_1.r, color_2.r, quantity),
          stepG = this.getStepCangeColor(color_1.g, color_2.g, quantity),
          stepB = this.getStepCangeColor(color_1.b, color_2.b, quantity);

    for(let i = 0; i < quantity; i++) {
      let r = Math.round(color_1.r - (i * stepR)),
          g = Math.round(color_1.g - (i * stepG)),
          b = Math.round(color_1.b - (i * stepB));
      let newColor = this.getColorValue(r, g, b);
      colors.push(newColor);
    };
    return colors;
  }

  animationIteration() {
    this.gradientStopList = this.nodeChangeColors(this.gradientStopList, this.iterationNumber, this.colors);
    this.iterationNumber = (this.iterationNumber + 1) % this.colorsLength;
  }

  DeepCopy(obj){
    return JSON.parse(JSON.stringify(obj));
  }
}