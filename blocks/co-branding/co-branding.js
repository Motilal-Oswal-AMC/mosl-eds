import {
  div,
  h2,
  button,
  input,
  form,
  label,
  p,
} from "../../scripts/dom-helpers.js";

export default function decorate(block) {

  const heading = block.querySelector('h4').textContent.trim()
  const arn = Array.from(block.querySelectorAll('p'))[0].textContent
  const distributor = Array.from(block.querySelectorAll('p'))[1].textContent
  const mobilenum = Array.from(block.querySelectorAll('p'))[2].textContent
  const email = Array.from(block.querySelectorAll('p'))[3].textContent
  const preparedfor = Array.from(block.querySelectorAll('p'))[4].textContent
  const euin = Array.from(block.querySelectorAll('p'))[5].textContent
  const sharebtn = Array.from(block.querySelectorAll('p'))[6].textContent
  const downloadbtn = Array.from(block.querySelectorAll('p'))[7].textContent
  const diclaimerText = block.querySelector('ul li p').textContent
  const diclaimerUl = block.querySelector('ul ul')



  const coBrandingSection = div(
    { class: "co-branding-section" },
    h2({ class: 'co-heading' }, heading),
    form(
      div(
        { class: "form-group" },
        label({ for: "ARN" }, arn),
        input({ type: "text", id: "ARN", name: "ARN", required: true })
      ),
      div(
        { class: "form-group" },
        label({ for: "distributor-name" }, distributor),
        input({
          type: "text",
          id: "distributor-name",
          name: "distributor-name",
          required: true,
        })
      ),
      div(
        { class: "form-group" },
        label({ for: "mobile-number" }, mobilenum),
        input({
          type: "text",
          id: "mobile-number",
          name: "mobile-number",
          required: true,
        })
      ),
      div(
        { class: "form-group" },
        label({ for: "email" }, email),
        input({ type: "email", id: "email", name: "email", required: true })
      ),
      div(
        { class: "form-group" },
        label({ for: "prepared-for" }, preparedfor),
        input({
          type: "text",
          id: "prepared-for",
          name: "prepared-for",
          required: true,
        })
      ),
      div(
        { class: "form-group" },
        label({ for: "euin" }, euin),
        input({ type: "text", id: "euin", name: "euin", required: true })
      )
    ),
    div(
      { class: "co-branded-btns" },
      button({ class: "share" }, sharebtn),
      button({ class: "download" }, downloadbtn)
    ),
    div(
      { class: 'co-ul-main' },
      p({ class: 'co-diclaimer' }, diclaimerText),
      div({ class: 'co-ulbox' }, diclaimerUl)
    )
  );

  block.textContent = "";
  block.append(coBrandingSection);
}
