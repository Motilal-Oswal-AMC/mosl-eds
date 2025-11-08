import dataMapMoObj from '../../scripts/constant.js';
// import url '../accordion/accordion.js';
// import {
//   input
// } from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [
    'our-authors-cont',
    'our-authors-section',
    'our-authors-sub',
    'authors-lists',
    'authors-lists-wrap',
    'authors-titles',
    'authors-dropdown',
  ];
  dataMapMoObj.addIndexed(block);
}
