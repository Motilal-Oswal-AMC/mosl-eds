import {
  div,
  label,
  input,
  img,
  p,
  ul,
  li,
  br,
  a,
} from '../../scripts/dom-helpers.js';
import dataMapMoObj from '../../scripts/constant.js';
// import {
//   myAPI,
// } from '../../scripts/scripts.js';
import datacfContact from '../../scripts/branchlocatorapi.js';

// --- 1. CONFIGURATION & FALLBACK DATA ---

// Set to `true` to use the live API.
const useLiveApi = true;
// Local fallback data for Mumbai.
const MumbaiData = {
  success: true,
  msg: 'Data Found Successfully',
  data: {
    MapURL: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.033623652367!2d72.83135327591698!3d19.01833105259943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce15690b2843%3A0x426176587395726!2sMotilal%20Oswal%20Tower!5e0!3m2!1sen!2sin!4v1694083882759!5m2!1sen!2sin',
    contactDet: [{
      officeName: 'For Mutual Fund related Queries and Complaints',
      landlineNo: '40548002',
      mobileNo: '8108622222',
      emailid: 'amc@motilaloswal.com',
      links: null,
    },
    {
      officeName: 'For Distributor/Partner Portal Queries',
      landlineNo: '40548002',
      mobileNo: '8108622222',
      emailid: 'partnerservice@motilaloswal.com',
      links: null,
    },
    {
      officeName: 'For PMS/AIF related queries & Complaints',
      landlineNo: '40548002',
      mobileNo: '8108622222',
      emailid: 'amc@motilaloswal.com',
      links: null,
    },
    ],
    contactAdd: [{
      officeName: 'Registered & Corporate Office : Motilal Oswal Asset Management Company Ltd. ',
      landlineNo: '+91-22 40548002',
      mobileNo: '8108622222',
      emailid: null,
      links: null,
      buildingName: '10th Floor, Motilal Oswal Tower,',
      streetName: 'Rahimtullah Sayani Road,',
      landmark: 'Opposite Parel ST Depot,',
      AreaName: 'Prabhadevi,',
      city: 'Mumbai',
      pincode: '400 025',
      iscorporateOffice: 1,
      notes: 'This is Official Point of Acceptance of Transactions.',
      mapIframe: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.033623652367!2d72.83135327591698!3d19.01833105259943!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce15690b2843%3A0x426176587395726!2sMotilal%20Oswal%20Tower!5e0!3m2!1sen!2sin!4v1694083882759!5m2!1sen!2sin',
    }],
  },
};

// --- 2. HELPER & RENDERING FUNCTIONS ---

function renderMap(container, mapUrl) {
  const finalMapUrl = mapUrl || MumbaiData.data.MapURL;
  // if (!finalMapUrl || finalMapUrl.includes('0')) {
  //   container.innerHTML = '<p>Map not available for this location.</p>';
  //   return;
  // }
  container.innerHTML = `
    <iframe src="${finalMapUrl}" width="100%" height="100%" style="border:0;border-radius: 8px;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
}

function renderDetails(container, data) {
  // console.log(data.data);

  const {
    contactAdd = [], contactDet = [],
  } = data[0];
  let html;
  contactAdd.forEach((addr) => {
    const mobst = (addr.mobileNo === null || addr.landlineNo === null) ? 'none' : 'block';
    // const emailst = addr.emailid === null ? 'none' : 'block';
    let regOff;
    let regOffst;
    let officeNamelo;
    const notes = addr.notes === null ? 'none' : 'block';
    let buildingName = addr.buildingName === null ? '' : addr.buildingName;
    buildingName = buildingName.replaceAll('<p>', '').replaceAll('</p>', '');
    if (addr.officeName.includes(':')) {
      [regOff, officeNamelo] = addr.officeName.split(':');
      regOffst = 'block';
    } else {
      regOff = '';
      regOffst = 'none';
      officeNamelo = addr.officeName;
    }
    html = div(
      {
        class: 'mum-location',
      },
      div(
        {
          class: 'location-head',
        },
        p({
          class: 'location-head1',
        }, addr.city),
        p({
          class: 'location-head2',
          style: `display: ${regOffst}`,
        }, regOff),
      ),
      div(
        {
          class: 'desc-wrap',
        },
        p({
          class: 'desc-wrap-head',
        }, officeNamelo),
        p(
          {
            class: 'desc-wrap-description',
          },
          buildingName,
          br(),
          addr.landmark === null ? '' : addr.landmark,
          br(),
          addr.streetName === null ? '' : addr.streetName,
          br(),
          `${addr.city} - ${addr.pincode}`,
        ),
      ),
      ul(
        {
          class: 'contact-number',
        },
        li(
          {
            class: `contact-number-link ${mobst}`,
          },
          a({
            class: 'contact-txt',
          }, addr.landlineNo),
        ),
        li(
          {
            class: `contact-number-link ${mobst}`,
          },
          a({
            class: 'contact-txt',
          }, addr.mobileNo),
        ),
      ),
      p({
        class: 'info',
        style: `display:${notes}`,
      }, addr.notes),
    );
    container.innerHTML = ' ';
    container.append(html);
  });
  contactDet.forEach((detail) => {
    html = div(
      {
        class: 'mal-location',
        style: 'display:none',
      },
      div(
        {
          class: 'heading1',
        },
        p({
          class: 'location-head1',
          style: 'display:none',
        }, 'Malad Interface'),
      ),
      div(
        {
          class: 'desc',
        },
        p({
          class: 'desc-head',
        }, detail.officeName),
        p({
          class: 'description',
        }, 'No B2, Siddharth, Narsing Ln, opposite NL High School, Malad, Malad West,Mumbai, Maharashtra 400064'),
      ),
      div(
        {
          class: 'contact',
        },
        a({
          href: '',
        }, detail.mobileNo),
        a({
          href: '',
        }, detail.landlineNo),
        a({
          href: '',
        }, detail.emailid),
      ),
    );
    container.append(html);
  });
  // container.innerHTML = html;
}

// --- 3. CORE LOGIC (Updated for POST request) ---
// contact US onload API

async function updateContentForCity(city, detailsContainer, mapContainer) {
  detailsContainer.innerHTML = '<div class="loading">Loading...</div>';
  mapContainer.innerHTML = '';

  // if (useLiveApi) {
  //   try {
  //     const request = {
  //       api_name: 'ContactUs',
  //       cityname: city,
  //     };
  //     console.log(datacfContact);
  //     jsonResponse = await myAPI('POST', 'https://www.motilaloswalmf.com/mutualfund/api/v1/ContactUs', request);
  //   } catch (error) {
  //     jsonResponse = MumbaiData;
  //   }
  // } else {
  //   // console.log('Using local fallback data because useLiveApi is false.');
  //   jsonResponse = MumbaiData; // Use local data directly if flag is false
  // }
  const jsonResponse = datacfContact.data.data
    .filter((elementmap) => elementmap.contactAdd[0].city === city);

  if (jsonResponse.length > 0) {
    renderDetails(detailsContainer, jsonResponse);
    renderMap(mapContainer, jsonResponse[0]?.MapURL);
  } else {
    // console.error('Failed to load or parse contact information.');
    detailsContainer.innerHTML = `<p>Could not load contact information for ${city}.</p>`;
  }
}
async function onLoadContactusCities() {
  if (useLiveApi) {
    try {
      // Create the POST request to the API
      // const request = {
      //   api_name: 'GetBranchCities',
      // };
      // const response = await myAPI('POST', 'https://www.motilaloswalmf.com/mutualfund/api/v1/GetBranchCities', request);
      // const data = response;
      const cityDropdownList = document.querySelector('.location-dropdown .location-options-value');
      let html = '';
      const cityArray = datacfContact.data.data;
      cityArray.forEach((ele) => {
        if (ele.contactAdd[0].city !== null) {
          html += `<li class="city-value">${ele.contactAdd[0].city}</li>`;
        }
      });
      cityDropdownList.innerHTML = html;

      // Contact-Us : Appending city value
      document.querySelectorAll('.location-options-value .city-value').forEach((item) => {
        item.addEventListener('click', (event) => {
          const parent = event.target;
          const locationValue = parent.closest('.location-dropdown').querySelector('.location-value');
          locationValue.textContent = parent.textContent;
          const namecity = parent.textContent;
          const detailsCol = document.querySelector('.location-map .location-info');
          const mapCol = document.querySelector('.location-map .loc-geo');
          updateContentForCity(namecity, detailsCol, mapCol);
          parent.closest('.location-options-value').style.display = 'none';
        });
      });
    } catch (error) {
      // console.log('failed');
    }
  }
}
// --- 4. BLOCK INITIALIZATION ---

export default async function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = ['contactmain', 'contactsub', 'contactinner', 'subcontainer'];
  dataMapMoObj.addIndexed(block);
  block.querySelector('.contactmain1').style.display = 'none';
  block.querySelector('.contactmain2').style.display = 'none';
  const Title = block.querySelector('.contactmain1 .contactinner1').textContent.trim();
  const radiolist = block.querySelector('.contactmain2 .contactinner1');
  const textOr = block.querySelector('.contactmain2 .contactinner2').textContent.trim();
  const plachld1 = block.querySelector('.contactmain2 .contactinner3').textContent.trim();
  const plachld2 = block.querySelector('.contactmain2 .contactinner4').textContent.trim();
  dataMapMoObj.mobduplicate = '';
  const divMapcontainer = div(
    {
      class: 'contact-us-parent',
    },
    div(
      {
        class: 'contact-feature',
      },
      p({
        class: 'contact-branch',
      }, Title),
      div(
        {
          class: 'feature-wrap',
        },
        ...Array.from(radiolist.children).map((el, index) => {
          if (index === 1) {
            dataMapMoObj.mobduplicate = el.textContent.trim();
          }
          return div(
            {
              class: `featrure${(index + 1)}`,
            },
            input({
              class: 'featrure-input',
              type: 'radio',
              name: 'radio',
              id: el.textContent.trim().split(' ').at(0),
              value: 'AMC Branch',
            }),
            label({
              class: 'featrure-label',
              for: el.textContent.trim().split(' ').at(0),
            }, el.textContent.trim()),
          );
        }),
      ),
    ),
    div(
      {
        class: 'location',
      },
      div(
        {
          class: 'location-wrap',
        },
        p({
          class: 'locate-label',
          for: '',
        }, plachld1),
        ul(
          {
            class: 'location-dropdown',
          },
          li(
            {
              class: 'location-options',
              'aria-expanded': 'false',
              tabindex: '0',
            },
            p({
              class: 'location-value',
            }, 'Mumbai'),
            ul({
              class: 'location-options-value',
              style: 'display: none;',
            }),
          ),
        ),
      ),
      p({
        class: 'simple-txt',
      }, dataMapMoObj.toTitleCase(textOr)),
      div(
        {
          class: 'pincode-wrap',
        },
        p({
          class: 'location-pincd',
        }, plachld2),
        div(
          {
            class: 'search-loaction',
          },
          img({
            src: '/icons/black-search-icon.svg',
            alt: 'search-icon',
          }),
          input({
            class: 'search-loaction-input',
            type: 'text',
            name: '',
            id: '',
            placeholder: plachld2,
          }),
        ),
      ),
    ),
    div(
      {
        class: 'location-map',
      },
      div({
        class: 'location-info',
      }),
      div({
        class: 'loc-geo',
      }),
    ),
  );
  block.append(divMapcontainer);
  const searchinpu = block.querySelector('.search-loaction-input');
  const searchdrop = block.querySelector('.location-options-value');
  searchinpu.setAttribute('maxLength', '6');
  const detailsCol = block.querySelector('.location-map .location-info');
  const mapCol = block.querySelector('.location-map .loc-geo');
  searchinpu.addEventListener('focus', () => {
    if (searchdrop.style.display !== 'none') {
      searchdrop.style.display = 'none';
    }
  });

  searchinpu.addEventListener('input', (event) => {
    const mainblk = block.closest('.contact-us-map-container');
    const pranmk = mainblk.querySelector('.location-map');
    const pranmkv2 = mainblk.querySelector('.error-default');
    const inpval = event.target.value;
    if (inpval.length === 6) {
      const pinCity = datacfContact.data.data
        .filter((elementmap) => elementmap.contactAdd[0].pincode === inpval);
      if (pinCity.length !== 0) {
        pranmk.classList.remove('contact-data-not-found');
        pranmkv2.classList.remove('show-contact-error');
        updateContentForCity(pinCity[0].contactAdd[0].city, detailsCol, mapCol);
      } else {
        pranmk.classList.add('contact-data-not-found');
        pranmkv2.classList.add('show-contact-error');
      }
    } else if (inpval.length === 0) {
      const dropVal = block.querySelector('.location-value').textContent.trim();
      updateContentForCity(dropVal, detailsCol, mapCol);
      pranmk.classList.remove('contact-data-not-found');
      pranmkv2.classList.remove('show-contact-error');
    }
  });
  onLoadContactusCities();
  updateContentForCity('Mumbai', detailsCol, mapCol);

  // Contact-Us : on click of locate city field
  block.querySelector('.location-dropdown').addEventListener('click', (event) => {
    const innerUl = event.target.querySelector('.location-options-value');
    if (innerUl) {
      // toggle display
      if (innerUl.style.display === 'none' || innerUl.style.display === '') {
        innerUl.style.display = 'block';
      } else {
        innerUl.style.display = 'none';
      }
    }
  });

  block.querySelector('.featrure1 input').click();

  const errorScreen = block.closest('.contact-us-map-container');
  const errdefault = errorScreen.querySelector('.default-content-wrapper');
  errdefault.classList.add('error-default');
  dataMapMoObj.CLASS_PREFIXES = ['errormain', 'errrorsub', 'errorinner'];
  dataMapMoObj.addIndexed(errdefault);
  const err = errdefault.querySelector('.errormain1 .errorinner1');
  err.setAttribute('alt', 'ErrorImage');

  const demo = document.querySelector('.contact-card .default-content-wrapper');

  dataMapMoObj.CLASS_PREFIXES = ['cont-us-head', 'cont-us-head-li', 'cont-us-head-ul', 'cont-us-txt-li'];
  dataMapMoObj.addIndexed(demo);

  document.querySelector('.contact-card').parentElement.classList.add('contact-us-parent-wrapper');
  document.addEventListener('click', (event) => {
    const innerUl = block.querySelector('.location-options-value');
    if (!event.target.contains(innerUl)) {
      // toggle display
      if (innerUl.style.display === 'block' || innerUl.style.display === '') {
        innerUl.style.display = 'none';
      }
    }
  });

  block.querySelector('.featrure2 input').addEventListener('click', () => {
    window.location.href = 'https://www.kfintech.com/contact-us/';
  });
}
