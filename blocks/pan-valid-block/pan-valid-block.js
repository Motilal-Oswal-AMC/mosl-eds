import dataMapMoObj from '../../scripts/constant.js';
import {
  div, input, label, p, img, ul, li, span,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  dataMapMoObj.CLASS_PREFIXES = [
    'panvalidmain',
    'panvalidsub',
    'panvalidinner',
    'panvalidsubmain',
    'panvalidsubinner',
  ];
  dataMapMoObj.addIndexed(block.closest(['.section']));
  const panvalidmain1 = block.closest('.section');
  const titlle = panvalidmain1.querySelector('.panvalidmain1');
  const panlab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner1')
    .textContent.trim();

  const reslab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner2')
    .textContent.trim();

  const listraio = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidsubinner3',
  ).children;

  const distext = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner4')
    .textContent.trim();
  const distextsub = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner5')
    .textContent.trim();
  const namelab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidsubinner6')
    .textContent.trim();

  const pnlab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidinner2 .panvalidsubinner1')
    .textContent.trim();
  const emlab = panvalidmain1
    .querySelector('.panvalidmain2 .panvalidinner2 .panvalidsubinner2')
    .textContent.trim();
  const tnctext = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidinner2 .panvalidsubinner3',
  );
  const tncbtn = panvalidmain1.querySelector(
    '.panvalidmain2 .panvalidinner2 .panvalidsubinner4',
  );

  block.querySelector('.panvalidinner1').style.display = 'none';
  block.querySelector('.panvalidinner2').style.display = 'none';

  const divpv = div(
    { class: 'maincontainer' },
    titlle,
    div(
      {
        class: 'form-container',
      },
      div(
        {
          class: 'pan-container',
        },
        div(
          {
            class: 'pan-input',
          },
          label(
            {
              for: '',
            },
            panlab,
          ),
          input({
            type: 'text',
          }),
          img({ class: 'pan-image', src: '../../icons/pencil.svg' }),
        ),
        div(
          {
            class: 'radio-container',
          },
          div(
            {
              class: 'radios',
            },
            div(
              p(
                {
                  class: 'residenttext',
                },
                reslab,
              ),
            ),
            div(
              {
                class: 'radio-btns',
              },
              div(
                { class: 'radio-1' },
                label({ class: 'rad-label', for: 'opt1' }, listraio[0].textContent.trim()),
                input({
                  class: 'radio-btns-input', type: 'radio', name: 'radio-click', id: 'opt1',
                }),
              ),
              div(
                { class: 'radio-2' },
                label({ class: 'rad-label', for: 'opt2' }, listraio[1].textContent.trim()),
                input({
                  type: 'radio', name: 'radio-click', id: 'opt2',
                }),
              ),
            ),
          ),
          div(
            {
              class: 'kyc',
            },
            p(
              {
                class: 'iscriptin',
              },
              distext,
            ),
            p(
              {
                class: 'subdiscriptin',
              },
              distextsub,
            ),
          ),
        ),
      ),
      div(
        {
          class: 'name-container',
        },
        div(
          {
            class: 'name-label pan-fields',
          },
          label(
            {
              class: 'pan-fields-label',
              for: '',
            },
            namelab,
          ),
          input({
            type: 'text',
            name: '',
            id: '',
            placeholder: 'Name as on PAN',
          }),
        ),
        div(
          {
            class: 'number-label pan-fields',
          },
          label(
            {
              for: '',
            },
            pnlab,
          ),
          input({
            type: 'text',
            name: '',
            id: '',
            placeholder: 'Add Number',
          }),
          p({ class: 'country-code' }, '+91'),
        ),
        div(
          {
            class: 'email-label pan-fields',
          },
          ul(
            { class: 'list-of-options' },
            li({ class: 'email' }, 'Email'),
            li({ class: 'google' }, 'Google'),
            li({ class: 'Phone' }, 'Phone Number'),
            li({ class: 'etc' }, 'ETC'),
            li({ class: 'email' }, 'Email'),
          ),
          label(
            {
              for: '',
            },
            emlab,
          ),
          input(
            {
              type: 'email',
              name: '',
              id: '',
              placeholder: 'Type here',
            },
          ),
        ),
      ),
    ),
    div({ class: 'tnc-container' }, tnctext, tncbtn),
  );

  block.append(divpv);

  // ✅ FINAL: Replace label with only the latest selected value (no 'Selected:', no multiple)

  const emailLabel = block.querySelector('.email-label label');
  emailLabel.style.display = 'none'; // Hide initially

  const listItems = block.querySelectorAll('.list-of-options li');
  const optionsList = block.querySelector('.list-of-options');

  // Toggle dropdown when clicking label container (but not li)
  block.querySelector('.email-label').addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'li') return;

    optionsList.style.display = optionsList.style.display === 'none' || optionsList.style.display === ''
      ? 'block'
      : 'none';
  });

  // When user clicks an li, update label with that value only
  listItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const value = item.textContent.trim();

      // Show label and update value (single selection only)
      emailLabel.style.display = 'block';
      emailLabel.textContent = value;

      // Optionally close dropdown after selection
      optionsList.style.display = 'none';
    });
  });

  document.addEventListener('click', (event) => {
    if (!block.querySelector('.email-label').contains(event.target)) {
      block.querySelector('.list-of-options').style.display = 'none';
    }
  });

  const mofdp = block.closest('main');
  dataMapMoObj.CLASS_PREFIXES = ['main-otp-con', 'sub-otp-con', 'inner-otp-con', 'otp-main-con', 'otp-sub-con'];
  dataMapMoObj.addIndexed(mofdp.querySelector('.otp-fdp'));
  const optVar = mofdp.querySelector('.otp-fdp');
  const divotp = div(
    { class: 'main-contaienr' },
    div(
      { class: 'wrapper-block' },
      optVar.querySelector('.sub-otp-con1'),
      div(
        { class: 'otpfield' },
        div(
          { class: 'otp-wrap' },
          input({
            type: 'text',
            class: 'otp-input',
            'aria-label': 'OTP digit 1 of 6',
            required: true,
            pattern: '[0-9]',
          }),
        ),
        div(
          { class: 'otp-wrap' },
          input({
            type: 'text',
            class: 'otp-input',
            'aria-label': 'OTP digit 2 of 6',
            required: true,
            pattern: '[0-9]',
          }),
        ),
        div(
          { class: 'otp-wrap' },
          input({
            type: 'text',
            class: 'otp-input',
            'aria-label': 'OTP digit 3 of 6',
            required: true,
            pattern: '[0-9]',
          }),
        ),
        div(
          { class: 'otp-wrap' },
          input({
            type: 'text',
            class: 'otp-input',
            'aria-label': 'OTP digit 4 of 6',
            required: true,
            pattern: '[0-9]',
          }),
        ),
        div(
          { class: 'otp-wrap' },
          input({
            type: 'text',
            class: 'otp-input',
            'aria-label': 'OTP digit 5 of 6',
            required: true,
            pattern: '[0-9]',
          }),
        ),
        div(
          { class: 'otp-wrap' },
          input({
            type: 'text',
            class: 'otp-input',
            'aria-label': 'OTP digit 6 of 6',
            required: true,
            pattern: '[0-9]',
          }),
        ),
      ),
      optVar.querySelector('.sub-otp-con2'),
      optVar.querySelector('.sub-otp-con3'),
      optVar.querySelector('.sub-otp-con4'),
    ),
  );
  optVar.querySelector('.main-otp-con1').append(divotp);
}
