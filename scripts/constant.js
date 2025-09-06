const dataMapMoObj = {
  ObjTemp: {
    inception_Ret: 'Since Inception',
    oneYear_Ret: '1 Year',
    threeYear_Ret: '3 Years',
    fiveYear_Ret: '5 Years',
    sevenYear_Ret: '7 Years',
    tenYear_Ret: '10 Years',
    'Since Inception': 'inception_Ret',
    '1 Year': 'oneYear_Ret',
    '3 Years': 'threeYear_Ret',
    '5 Years': 'fiveYear_Ret',
    '7 Years': 'sevenYear_Ret',
    '10 Years': 'tenYear_Ret',
  },
  objtempdrop: {
    'Since Inception': 'Since Inception',
    '1 year': '1 Year',
    '3 Years': '3 Years',
    '5 years': '5 Years',
    '7 years': '7 Years',
    '10 years': '10 Years',
  },
  icons: {
    'very-high': 'very-high-risk',
    'low-to-moderate': 'moderately-low-risk',
    high: 'high-risk',
    moderate: 'moderate-risk',
    low: 'low-risk',
  },
  iconsNfo: {
    'very-high': 'very-high-risk',
    'low-to-moderate': 'moderately-low-risk',
    high: 'high-risk',
    moderate: 'moderate-risk',
    low: 'low-risk',
  },
  selectreturns: '3 Years',
  schmenmob: 'Popular',
  schstar: [],
  tempMobReturn: [],
  selectreturnstemp: '',
  gropcodevalue: '',
  fundManagerDetails: '',
  selectviewFunds: '',
  deskrightdrp: '',
  CLASS_PREFIXES: ['block-item', 'block-subitem', 'block-subitem-finelsub'],
  addIndexed(parentElement, level = 0) {
    if (level >= this.CLASS_PREFIXES.length || !parentElement.children.length) {
      return;
    }
    const prefix = this.CLASS_PREFIXES[level];
    const { children } = parentElement; // Cache children for clarity.
    for (let i = 0; i < children.length; i += 1) {
      const child = children[i];
      const index = i + 1; // Class names are typically 1-based.
      child.classList.add(`${prefix}${index}`);
      this.addIndexed(child, level + 1);
    }
  },
  addIndexedTwo(parentElement, level = 0) {
    if (level >= this.CLASS_PREFIXES.length || !parentElement.children.length) {
      return;
    }
    const prefix = this.CLASS_PREFIXES[level];
    const { children } = parentElement; // Cache children for clarity.
    for (let i = 0; i < children.length; i += 1) {
      let parClass = Array.from(children[0].parentElement.classList)[0].split('-').at(-2);
      const child = children[i];
      const index = i + 1; // Class names are typically 1-based.
      child.classList.add(`${prefix}${parClass}${index}`);
      parClass = '';
      this.addIndexedTwo(child, level + 1);
    }
  },
  myAPI: async (method, url, body = null) => {
    const options = { method };
    if (body) {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      return text;
    }
  },
};
export default dataMapMoObj;
