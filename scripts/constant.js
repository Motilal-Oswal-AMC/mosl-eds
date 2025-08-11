/*    */
const dataMapMoObj = {
  ObjTemp: {
    inception_Ret: 'SINCE INCEPTION',
    oneYear_Ret: '1 YEAR',
    threeYear_Ret: '3 YEARS',
    fiveYear_Ret: '5 YEARS',
    sevenYear_Ret: '7 YEARS',
    tenYear_Ret: '10 YEARS',
    'SINCE INCEPTION': 'inception_Ret',
    '1 YEAR': 'oneYear_Ret',
    '3 YEARS': 'threeYear_Ret',
    '5 YEARS': 'fiveYear_Ret',
    '7 YEARS': 'sevenYear_Ret',
    '10 YEARS': 'tenYear_Ret',
  },
  icons: {
    'very-high': 'very-high-risk',
    'low-to-moderate': 'moderately-low-risk',
    high: 'high-risk',
    moderate: 'moderate-risk',
    low: 'low-risk',
  },
  "icons-nfo": {
    'very-high': 'very-high-risk',
    'low-to-moderate': 'moderately-low-risk',
    high: 'high-risk',
    moderate: 'moderate-risk',
    low: 'low-risk',
  },
  selectreturns: '',
  schstar: [],
  tempMobReturn: [],
  selectreturnstemp: '',
  CLASS_PREFIXES: [
    'block-item',
    'block-subitem',
    'block-subitem-finelsub',
  ],
  addIndexedClasses: function (parentElement, level = 0) {
    if (level >= dataObj.CLASS_PREFIXES.length || !parentElement.children.length) {
      return;
    }

    const prefix = dataObj.CLASS_PREFIXES[level];
    const {
      children
    } = parentElement; // Cache the children collection for clarity.

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const index = i + 1; // Class names are typically 1-based, not 0-based.

      child.classList.add(`${prefix}${index}`);

      dataObj.addIndexedClasses(child, level + 1);
    }
  }
};

export default dataMapMoObj;
