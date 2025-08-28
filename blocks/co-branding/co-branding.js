import {
  div,
  h2,
  button,
  input,
  form,
  label,
  p,
  span,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  const heading = block.querySelector('h4').textContent.trim();
  const arn = Array.from(block.querySelectorAll('p'))[0].textContent;
  const distributor = Array.from(block.querySelectorAll('p'))[1].textContent;
  const mobilenum = Array.from(block.querySelectorAll('p'))[2].textContent;
  const email = Array.from(block.querySelectorAll('p'))[3].textContent;
  const preparedfor = Array.from(block.querySelectorAll('p'))[4].textContent;
  const euin = Array.from(block.querySelectorAll('p'))[5].textContent;
  const sharebtn = Array.from(block.querySelectorAll('p'))[6].textContent;
  const downloadbtn = Array.from(block.querySelectorAll('p'))[7].textContent;
  const diclaimerText = block.querySelector('ul li p').textContent;
  const diclaimerUl = block.querySelector('ul ul');
  diclaimerUl.classList.add('co-ullist');
  block.querySelector('.co-ullist').querySelectorAll('li');
  Array.from(block.querySelector('.co-ullist').children).forEach((el) => {
    el.classList.add('co-listname');
  });

  const coBrandingSection = div(
    { class: 'co-branding-section' },
    h2({ class: 'co-heading' }, heading),
    form(
      { class: 'cobrand-form' },
      div(
        { class: 'cobrand-field' },
        label({ class: 'cobrand-label', for: 'ARN' }, arn),
        input({
          class: 'cobrand-input',
          type: 'text',
          id: 'ARN',
          name: 'ARN',
          required: true,
        }),
        span({ class: 'error-msg' }, 'Please enter valid ARN Number'),
      ),
      div(
        { class: 'cobrand-field' },
        label({ class: 'cobrand-label', for: 'distributor-name' }, distributor),
        input({
          class: 'cobrand-input',
          type: 'text',
          id: 'distributor-name',
          name: 'distributor-name',
          required: true,
        }),
        span({ class: 'error-msg' }, 'Please enter valid Distributor Name'),
      ),
      div(
        { class: 'cobrand-field' },
        label({ class: 'cobrand-label', for: 'mobile-number' }, mobilenum),
        input({
          class: 'cobrand-input',
          type: 'text',
          id: 'mobile-number',
          name: 'mobile-number',
          required: true,
        }),
        span({ class: 'error-msg' }, 'Please enter valid Mobile Number'),
      ),
      div(
        { class: 'cobrand-field' },
        label({ class: 'cobrand-label', for: 'email' }, email),
        input({
          class: 'cobrand-input',
          type: 'email',
          id: 'email',
          name: 'email',
          required: true,
        }),
        span({ class: 'error-msg' }, 'Please enter valid Email'),
      ),
      div(
        { class: 'cobrand-field' },
        label({ class: 'cobrand-label', for: 'prepared-for' }, preparedfor),
        input({
          class: 'cobrand-input',
          type: 'text',
          id: 'prepared-for',
          name: 'prepared-for',
          required: true,
        }),
        span({ class: 'error-msg' }, 'Please enter valid Prepared'),
      ),
      div(
        { class: 'cobrand-field' },
        label({ class: 'cobrand-label', for: 'euin' }, euin),
        input({
          class: 'cobrand-input',
          type: 'text',
          id: 'euin',
          name: 'euin',
          required: true,
        }),
        span({ class: 'error-msg' }, 'Please enter valid EUIN'),
      ),
    ),
    div(
      { class: 'cobrand-btns' },
      button({ class: 'share' }, sharebtn),
      button({ class: 'download' }, downloadbtn),
    ),
    div(
      { class: 'cobrand-disc' },
      p({ class: 'co-diclaimer' }, diclaimerText),
      div({ class: 'co-listwrap' }, diclaimerUl),
    ),
  );

  block.textContent = '';
  block.append(coBrandingSection);
}
