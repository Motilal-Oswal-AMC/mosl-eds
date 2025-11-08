import dataMapMoObj from '../../scripts/constant.js';

export default function decorate(block) {
  // console.log(block);
  const data = block.querySelectorAll('.tab-glp');
  data.forEach((ele) => {
    if (ele != null) {
      dataMapMoObj.CLASS_PREFIXES = [
        'glp-tab-block',
        'glp-tab-inner',
        'glp-tab-sub-inner',
        'glp-tab-sub-inner-sub',
        'glp-tab-ul',
        'glp-tab-inner-ul',
        'glp-tab-li',
        'glp-tab-sub-inner-ul',
        'glp-tab-inner-li',
        'glp-tab-sub-inner-li',
        'glp-tab-sub-inner-li-sub',
        'glp-li',
        'glp-li-inner',
      ];
      dataMapMoObj.addIndexed(ele);

      const addClassName = document.querySelectorAll('.glp-tab-li1');

      addClassName.forEach((elem) => {
        elem.classList.add('li-containers');
      });

      const addClassNameli = document.querySelectorAll('.glp-tab-sub-inner-ul2');
      addClassNameli.forEach((elem) => {
        elem.classList.add('same-li');
      });

      const addClassNamel = document.querySelectorAll('.glp-tab-sub-inner-ul1');
      addClassNamel.forEach((elem) => {
        elem.classList.add('same-li');
      });
    }
  });
}
