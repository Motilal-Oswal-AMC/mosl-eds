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
  ObjTempfdp: {
    inception_Ret: 'Since Inception',
    oneYear_Ret: 'Since 1 year',
    threeYear_Ret: 'Since 3 years',
    fiveYear_Ret: 'Since 5 years',
    sevenYear_Ret: 'Since 7 years',
    tenYear_Ret: 'Since 10 years',
    'Since Inception': 'inception_Ret',
    'Since 1 year': 'oneYear_Ret',
    'Since 3 years': 'threeYear_Ret',
    'Since 5 years': 'fiveYear_Ret',
    'Since 7 years': 'sevenYear_Ret',
    'Since 10 years': 'tenYear_Ret',
  },
  objtempdrop: {
    'Since Inception': 'Since Inception',
    '1 year': '1 Year',
    '3 years': '3 Years',
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
      child.classList.add('comlist');
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
  altFunction: (element, altTextr) => {
    element.setAttribute('alt', altTextr);
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
  formatDate: (dateString) => {
    const date = new Date(`${dateString}T00:00:00`);

    // Array of month abbreviations
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Function to get the correct ordinal suffix (st, nd, rd, th)
    function getOrdinalSuffix(days) {
      if (days > 3 && days < 21) return 'th'; // for teens
      switch (days % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }

    const dayWithSuffix = day  //+ getOrdinalSuffix(day);

    // Combine parts into the final format
    return `${dayWithSuffix} ${month} ${year}`;
  },
  toTitleCase: (str) => {
    if (!str) {
      return '';
    }

    return str
      .toLowerCase()
      .split(' ')
      .map((word) => {
        if (word.length === 0) {
          return '';
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  },

  ObjDataidFdp: {
    // 'performance-graph' : '2000',
    'periodic-returns': '600',
    'past-performance-calculator': '550',
    'why-this-fund-section': '600',
    'fund-philosophy-video': '600',
    'custom-tab': '590',
    'key-facts-section': '550',
    'fund-manager-section': '580',
    'downloadsec': '560',
    'content-library': '580',
    'people-also-like': '580',
    'product-label': '550',
  },
};
export default dataMapMoObj;
