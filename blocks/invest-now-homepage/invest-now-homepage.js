/* eslint-disable*/
import {
  div,
  p,
  h3,
  img,
  button,
  input,
  label,
  select,
  option,
  span,
  ul,
  li,
} from "../../scripts/dom-helpers.js";
import "../../scripts/flatpickr.js";
import dataCfObj from "../../scripts/dataCfObj.js";
import dataMapMoObj from "../../scripts/constant.js";
import { myAPI } from "../../scripts/scripts.js";

export async function existingUser() {
  const demo = Array.from(document.querySelectorAll(".pan-details-modal p"));
  const inputLable = demo[0];
  if (!inputLable) {
    // console.warn('No <p> elements found inside .pan-details-modal');
    return;
  }

  inputLable.innerHTML = "";

  const addInputDiv = div(
    { class: "input-wrapper" },
    p({ class: "panlabel" }, "Pan Number"),
    input({
      type: "text",
      placeholder: "Enter PAN Number",
      name: "pan",
      class: "iptpanfld",
    })
  );

  dataMapMoObj.panDlts["isGuest"] = "false";
  dataMapMoObj.panDlts["guestMenuState"] = {
    guestMenu: false,
    existingBox: true,
  };
  async function kycCall(param) {
    try {
      const request = {
        panNo: param,
      };
      const rejsin = await myAPI(
        "POST",
        " https://api.moamc.com/InitAPI/api/Init/CVLKYCCheck",
        request
      );
      console.log("kyc api response ", rejsin);
      let isKyc = rejsin.data.kycStatus === "Y" ? true : false;

      const kycForm = document.querySelector(".fdp-kyc-form");
      const panForm = document.querySelector(".pan-details-modal");
      const pansuccessForm = document.querySelector(".otp-fdp");
      if (isKyc) {
        kycForm.style.display = "none"; // display none kycform
        panForm.style.display = "none"; // display none panform
        pansuccessForm.style.display = "block"; // display block otp form
        otpCall(param);
      } else {
        kycForm.style.display = "block";
        panForm.style.display = "none";
        pansuccessForm.style.display = "none";
        const userLoginPanNumber = document.querySelector(".user-pan-number"); // input
        userLoginPanNumber.value = dataMapMoObj.panDlts['pannumber'].toUpperCase();
        userLoginPanNumber.setAttribute('readonly',true);

        const editInput = document.querySelector('.pan-image');
        editInput.addEventListener('click',()=>{
           userLoginPanNumber.removeAttribute('readonly');
        })
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function otpCall(param) {
    try {
      const request = {
        userId: param,
        loginModeId: 1,
        credentialModeId: 1,
        ipV4: "192.168.22.22",
        otpThroughDIT: false,
        ditotpType: "",
        pmsGuest: false,
        isAIF: false,
        mfGuest: false,
        product: "MF",
      };
      const rejsin = await myAPI(
        "POST",
        "https://api.moamc.com/LoginAPI/api/Login/GenerateOtpNew",
        request
      );
      console.log("kyc api response ", rejsin);
    } catch (error) {
      console.log(error);
    }
  }
    // ModifyKyc API  start
  //  https://api.moamc.com/prelogin/api/KYC/KYCProcess
  
  async function modiFyKycApi(param,userName,userMobile,userEmail) {
  
    try {
      const request = { 
    "name": userName, 
    "email": userEmail, 
    "phone": userMobile, 
    "returnUrl": "https://mf.moamc.com/onboarding/personal", 
    "timeOutUrl": "https://mf.moamc.com/error", 
    "panNo":param 
} 
      const rejsin = await myAPI(
        "POST",
        "https://api.moamc.com/prelogin/api/KYC/KYCProcess",
        request
      );
      console.log("this is modiFuykyc Api Response ",rejsin);
    }
    catch(error){
      console.log(error);
    }
  };


  const ModifyKycForm = document.querySelector('.tnc-container .panvalidsubinner4');
console.log("wedfrgr",ModifyKycForm);
ModifyKycForm.addEventListener('click',()=>{

const userPanNumber = document.querySelector(".iptpanfld").value;      // input value
const userLoginPanNumber = document.querySelector(".user-pan-number").value; // input

  const userLoginPanName = document.querySelector(".user-pan-name").value;
  const userLoginMobileNumber = document.querySelector(".user-number").value;
  const userLoginEmail = document.querySelector(".user-email").value;


  modiFyKycApi(userLoginPanNumber,userLoginPanName,userLoginMobileNumber,userLoginEmail);
});
    // ModifyKyc API  ends

  

  inputLable.appendChild(addInputDiv);

  // api call for otp
  // "AEEPW9969G",

  async function apiCall(userPanNumber) {
    try {
      dataMapMoObj.panDlts['isIndividualPan'] = userPanNumber;
      dataMapMoObj.panDlts['pannumber'] = userPanNumber
      const request = {
        panNo: userPanNumber,
      };
      const rejsin = await myAPI(
        "POST",
        "https://api.moamc.com/LoginAPI/api/Login/GetClientType",
        request
      );
      console.log(rejsin);

      // const isSuccess = rejsin.data.existingClient === "" ? false : true;
      const tempArray = ["MF", "BOTH"];
      const exixting = ["ZBF", "REDEEMZBF"];
      if (rejsin.data.guestClient === "") {
        dataMapMoObj.panDlts["isNewGuest"] = true;
      } else if (tempArray.includes(rejsin.data.guestClient)) {
        dataMapMoObj.panDlts["isGuest"] = true;
        dataMapMoObj.panDlts["guestMenuState"] = {
          guestMenu: true,
          existingBox: false,
        };
      } else if (exixting.includes(rejsin.data.existingClient)) {
        dataMapMoObj.panDlts["isGuest"] = false;
        dataMapMoObj.panDlts["guestMenuState"] = {
          guestMenu: true,
          existingBox: false,
        };
      } else if (tempArray.includes(rejsin.data.newClient)) {
        dataMapMoObj.panDlts["isGuest"] = false;
        dataMapMoObj.panDlts["guestMenuState"] = {
          guestMenu: true,
          existingBox: false,
        };
      }

      localStorage.setItem(
        "UPDATE_GUEST_MENU",
        JSON.stringify(dataMapMoObj.panDlts["guestMenuState"])
      );
      localStorage.setItem("isGuest", dataMapMoObj.panDlts["isGuest"]);

      kycCall(userPanNumber);
    } catch (error) {
      console.log(error);
    }
  }

  const parentElements = document.querySelector(".pan-details-modal");
  dataMapMoObj.CLASS_PREFIXES = ["mainpandts", "subpandts", "innerpandts"];
  dataMapMoObj.addIndexed(parentElements);

  //Authenciate click
  const authenticateClick = document.querySelector(".subpandts3 .innerpandts1");
  authenticateClick.addEventListener("click", (e) => {
    const checkInput = document.querySelector(".error-pan");
    const userPanNumber = document.querySelector(".iptpanfld").value;

    const userPanNumberShow = document.querySelector(
      ".sub-otp-con4 .inner-otp-con2 .otp-main-con1"
    );
    // added userPanNumber
    userPanNumberShow.textContent = userPanNumber;

    if (userPanNumber === "") {
      checkInput.classList.add("show-error");
    }
    if (!checkInput.classList.contains("show-error")) {
      apiCall(userPanNumber); // Only called if no error
    } else {
      console.log("PAN number is invalid. API call blocked.");
    }
  });


  // Create the error message element once

  const errorPanEl = document.createElement("p");
  errorPanEl.className = "error-pan hide-error"; // initially hidden
  errorPanEl.textContent = "Invalid PAN number";
  inputLable.appendChild(errorPanEl); // append it once

  inputLable.addEventListener("input", (e) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const inputValue = e.target.value.toUpperCase();

    if (inputValue === "") {
      // If empty, hide the error
      errorPanEl.classList.remove("show-error");
      errorPanEl.classList.add("hide-error");
    } else if (panRegex.test(inputValue)) {
      // If valid PAN, hide error
      errorPanEl.classList.remove("show-error");
      errorPanEl.classList.add("hide-error");
    } else {
      // If invalid PAN, show error
      errorPanEl.classList.remove("hide-error");
      errorPanEl.classList.add("show-error");
    }
  });



  // this function for hide modal forms

  const mod = document.querySelector(".pan-details-modal .icon-modal-btn");
  const mod2 = document.querySelector(".fdp-kyc-form .icon-modal-btn");
  const mod3 = document.querySelector(".otp-fdp .icon-modal-btn");

  function hideFormsClick(btn) {
    const card2 =
      document.querySelector(".our-popular-funds") ||
      document.querySelector(".known-our-funds") ||
      document.querySelector(".fdp-card-container");
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // Stop click from bubbling further
      document.body.classList.remove("noscroll");
      card2.classList.remove("modal-active-parent");
      document.querySelector(".card-modal-overlay").remove();
    });
  }

  hideFormsClick(mod2);
  hideFormsClick(mod);
  hideFormsClick(mod3);
}

function loadCSS(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function getTodaysDateFormatted() {
  const today = new Date();
  const day = today.getDate();
  const month = today.toLocaleString("default", { month: "short" });
  const year = today.getFullYear();
  return `${day} ${month} ${year}`;
}

// Helper function to create a custom dropdown
function createCustomDropdown(id, labelText, options, defaultValue) {
  return div(
    { class: "custom-select-wrapper", id: `custom-select-${id}` },
    label({class:'custom-select-label'},labelText),
    div({ class: "select-selected" }, defaultValue),
    div(
      { class: "select-options" },
      ul(...options.map((opt) => li({ "data-value": opt }, opt)))
    ),
    input({ type: "hidden", id, value: defaultValue })
  );
}

export default function decorate(block) {
  dataMapMoObj.panDlts = {};
  loadCSS('../../scripts/flatpickr.min.css');
  const schcodeFromStorage = localStorage.getItem('schcodeactive');
  const fundData = dataCfObj.find(
    (fund) => fund.schcode === schcodeFromStorage
  );
  if (fundData) {
    console.log("Found Fund Data:", fundData);
    var fundNameFromData = fundData.schDetail.schemeName.replaceAll(
      "Motilal Oswal",
      ""
    );
    const benchmarkFromData = fundData.benchmark;
    console.log("Fund Name:", fundNameFromData);
  } else {
    console.error("No fund data found for schcode:", schcodeFromStorage);
  }
  const col1 = block.children[0].querySelectorAll("p");
  const col2 = block.children[1].querySelectorAll("p");
  const col3 = block.children[2].querySelectorAll("p");

  const lumpsumLabel = col1[1]?.textContent || "";
  const sipLabel = col1[2]?.textContent || "";
  const inputLabel = col1[3]?.textContent || "";

  // const defaultAmount = col2[0]?.textContent || '';
  const rawAmount = col2[0]?.textContent || "";
  const defaultAmount = rawAmount
    ? Number(rawAmount).toLocaleString("en-IN")
    : "";
  const formattedSuggestions = [col2[1], col2[2], col2[3]].map(
    (p) => p?.textContent || ""
  );
  const suggestions = formattedSuggestions.map((s) =>
    Number(s).toLocaleString("en-IN")
  );
  const frequency = col3[0]?.textContent || "";
  const endDate = col3[1]?.textContent || "";
  const ctaLabel = col3[2]?.textContent || "";

  // Frequency options (mirror your JSON)
  const brandName = "Motilal Oswal";
  // const logoSrc = '../../icons/Group.svg';
  const mop = `MO_${schcodeFromStorage}.svg`;
  const logoSrc = `../../icons/iconfund/${mop}`;
  const calendarIconSrc = "../../icons/calendar.svg"; // Replace with your real calendar icon path
  const infotoolsrc = "../../icons/infotooltip.svg";
  const closesrc = "../../icons/cross.svg";
  const frequencyOptions = [
    "Annual",
    "Daily",
    "Fortnightly",
    "Monthly",
    "Quarterly",
    "Weekly",
  ];
  const endDateOptions = ["End Date", "Until I cancel", "Select Date"];

  block.innerHTML = "";

  // Close Button
  const closebtn = div(
    { class: "modal-btn" },
    span(
      { class: "close-btn" },
      img({ class: "modal-btn-svg", src: closesrc, alt: "cross" })
    )
  );

  // Build modal
  const modal = div(
    { class: `invest-now-modal fdp-sip-modal` },
    div(
      { class: "modal-header-container" },
      div(
        { class: "modal-header" },
        div(
          { class: "modal-header-logo" },
          img({ class: "brandlogo", src: logoSrc, alt: "BrandLogo" })
        ),
        div(
          { class: "modal-header-subtitle" },
          p({ class: "brandname" }, brandName),
          h3({ class: "fund-name" }, fundNameFromData)
        )
      ),
      div(
        { class: "modal-toggle" },
        div(
          { class: "modal-btn-lumpsum active" },
          button({ class: "lumpsum-btn" }, lumpsumLabel)
        ),
        div({ class: "modal-btn-sip" }, button({ class: "sip-btn" }, sipLabel))
      )
    ),
    div(
      { class: "modal-inputs-container" },
      div(
        { class: "modal-inputs-subcontainer" },
        div(
          { class: "modal-inputs" },
          div(
            { class: "modal-input" },
            label(inputLabel),
            div(
              { class: "modal-input-symbol" },
              // input({ type: 'number', value: defaultAmount, class: 'amount-input' })),
              input({
                type: "tel",
                inputmode: "numeric",
                pattern: "[0-9]*",
                value: defaultAmount,
                class: "amount-input",
              }),
              span(
                { class: "amount-error error-hide" },
                "Amount must be between 500 and 1000000"
              )
            )
          ),
          div(
            { class: "modal-suggestions" },
            ...suggestions.map((s) =>
              button({ class: "suggestion-btn" }, `₹ ` + s)
            )
          )
        ),
        div(
          { class: "modal-input-fields hidden" },
          div(
            { class: "modal-sip" },
            div(
              { class: "modal-sip-starts" },
              div(
                { class: "sip-starts-maintext" },
                p({ class: "sip-starts-text" }, "SIP starts from ")
              ),
              div(
                { class: "sip-starts-maindate" },
                p({ class: "sip-starts-date" }, getTodaysDateFormatted()),
                // button({ class: 'calendar-btn' },
                //   img({ src: calendarIconSrc, alt: 'Calendar Icon' })
                // ))
                img({
                  class: "calendar-btn",
                  src: calendarIconSrc,
                  alt: "Calendar Icon",
                  "aria-label": "Select start date",
                })
              )
            ),
            div(
              { class: "modal-start-today" },
              label(
                input({ type: "checkbox", class: "start-today-checkbox" }),
                span({ class: "custom-box" }),
                span(" Start Today")
              ),
              div(
                { class: "start-today-note" },
                p(
                  { class: "sip-note" },
                  "Your 1st SIP Installment will be debited today "
                ),
                span(
                  { class: "sip-note-highlight" },
                  img({ class: "", src: infotoolsrc, alt: "information" })
                )
              )
            )
          ),
          div(
            { class: "date-drop-down" },
            createCustomDropdown(
              "frequency",
              "Frequency",
              frequencyOptions,
              frequency
            ),
            createCustomDropdown("endDate", "End Date", endDateOptions, endDate)
          )
        )
      ),
      div(
        { class: "modal-cta" },
        button({ class: "buy-now-btn" }, "BUY NOW"),
        button({ class: "start-now" }, "Start Now")
      )
    )
  );

  // Tooltip
  const tooltip = div(
    { class: "sip-tooltip hide" },
    div(
      { class: "modal-btn tooltip-btn" },
      span(
        { class: "close-btn" },
        img({ class: "modal-btn-svg", src: closesrc, alt: "cross" })
      )
    ),
    div(
      { class: "tooltip-box" },
      p({ class: "tooltip-note" }, "Note"),
      div(
        { class: "tooltip-info" },
        "We’ll debit your first SIP installment today through your chosen payment mode, and all future installments will be automatically collected via your registered Autopay or URN."
      )
    )
  );

  const modalContainer = div(
    { class: "invest-now-container", id: "invest-now-wrapper-flat" },
    closebtn,
    modal,
    tooltip
  );
  block.append(modalContainer);

  modal.querySelector(".start-now").addEventListener("click", () => {
    const mainmo = block.closest(".card-modal-overlay");
    mainmo.querySelector(".invest-now-homepage-container").style.display =
      "none";
    mainmo.querySelector(".pan-details-modal").style.display = "block";
    existingUser();
  });

  const container = document.querySelector(".modal-cta");

  // if (window.location.href.includes('funds-details-page')) {
  //   const buyNowBtn = document.createElement('button');
  //   buyNowBtn.className = 'buy-now-btn';
  //   buyNowBtn.textContent = 'BUY NOW';

  //   const startNowBtn = document.createElement('button');
  //   startNowBtn.className = 'start-now';
  //   startNowBtn.textContent = 'Start Now';

  //   container.appendChild(buyNowBtn);
  //   container.appendChild(startNowBtn);
  // } else {
  //   const investBtn = document.createElement('button');
  //   investBtn.className = 'invest-btn';
  //   investBtn.textContent = ctaLabel;

  //   container.appendChild(investBtn);
  // }

  // 1. Add open/close logic
  const lumpsumBtn = block.querySelector(".modal-btn-lumpsum");
  const sipBtn = block.querySelector(".modal-btn-sip");
  const sipFields = document.querySelector(".modal-input-fields");

  lumpsumBtn.addEventListener("click", () => {
    const sipFields = document.querySelector(".modal-input-fields");
    const sipBtn = block.querySelector(".modal-btn-sip");

    lumpsumBtn.classList.add("active");
    sipBtn.classList.remove("active");
    sipFields.classList.add("hidden");
    sipFields.classList.remove("flex");
  });

  sipBtn.addEventListener("click", () => {
    const sipFields = document.querySelector(".modal-input-fields");
    const sipBtn = block.querySelector(".modal-btn-sip");
    sipBtn.classList.add("active");
    lumpsumBtn.classList.remove("active");
    sipFields.classList.remove("hidden");
    sipFields.classList.add("flex");
  });

  // 2. Attach event listeners to all suggestion buttons
  const suggestionButtons = block.querySelectorAll(".suggestion-btn");
  const amountInput = block.querySelector(".amount-input");

  suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove .active from all buttons
      suggestionButtons.forEach((b) => b.classList.remove("active"));
      // Add .active to the clicked button
      btn.classList.add("active");
      const value = btn.textContent.split(" ")[1];
      amountInput.value = value;
      amountInput.dispatchEvent(new Event("input"));
    });
  });

  // --- 2. ADD this new helper function ---
  function syncSuggestionButtonsState() {
    const currentValue = amountInput.value;
    let hasActiveMatch = false;
    suggestionButtons.forEach((btn) => {
      // Check if button's text (e.g., '₹ 5,000') matches the input's value
      if (`₹ ${currentValue}` === btn.textContent) {
        btn.classList.add("active");
        hasActiveMatch = true;
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // --- 3. MODIFY the `handleAmountInput` function to call the new sync function ---
  function handleAmountInput(e) {
    const input = e.target;
    const rawValue = input.value.replace(/[^0-9]/g, "");

    if (rawValue) {
      const formattedValue = parseInt(rawValue, 10).toLocaleString("en-IN");
      input.value = formattedValue;
    } else {
      input.value = "";
    }

    const amount = parseFloat(rawValue) || 0;
    const amountError = block.querySelector(".amount-error");

    if (amount < 500 && rawValue !== "") {
      amountError.classList.add("error-show");
    } else {
      amountError.classList.remove("error-show");
    }

    if (amount > 1000000) {
      input.value = input.value.slice(0, -1);
    }

    syncSuggestionButtonsState();
  }
  amountInput.addEventListener("input", handleAmountInput);

  // This sets the initial active button based on the default amount.
  syncSuggestionButtonsState();

  //3. tooltip disaply
  const sipNote = block.querySelector(".sip-note-highlight");
  const sipText = block.querySelector(".sip-tooltip");
  sipNote.addEventListener("click", () => {
    sipText.classList.add("show");
    sipText.classList.remove("hide");
  });

  const closeTooltip = block.querySelector(".tooltip-btn");
  closeTooltip.addEventListener("click", () => {
    sipText.classList.add("hide");
    sipText.classList.remove("show");
  });

  // 4. flat date picker
  const calendarIcon = block.querySelector(".calendar-btn");
  const sipDateDisplay = block.querySelector(".sip-starts-date");
  const calendarContainer = block.querySelector(".invest-now-container");

  // ADDED: A variable to store the user-selected date
  let originalSipDate = '';

  const fpInstance = window.flatpickr(calendarIcon, {
    defaultDate: "today",
    altInput: false,
    appendTo: calendarContainer,
    disableMobile: true,

    // FIX 1: Added a safety check to prevent the crash on mobile.
    onReady: function (_, __, fp) {
      if (fp.calendarContainer) {
        fp.calendarContainer.removeAttribute("style");
      } else {
        console.log("somehting is wrong");
      }
    },

    onChange: function (selectedDates, dateStr, instance) {
      const selectedDate = selectedDates[0];
      const day = selectedDate.getDate();
      const month = selectedDate.toLocaleString("default", { month: "short" });
      const year = selectedDate.getFullYear();
      const formattedDate = `${day} ${month} ${year}`;

      sipDateDisplay.textContent = formattedDate;

      // Update the stored date whenever the user picks a new one
      originalSipDate = formattedDate;
    },
    position: (self, node) => {
      const top = self.element.offsetTop + self.element.offsetHeight + 8;
      const left = self.element.offsetLeft;

      node.style.top = `${top}px`;
      node.style.left = `${left}px`;
    },

    // FIX 2: Removed the entire custom 'position' function.
    // Let flatpickr handle its own positioning, as it's more reliable on mobile.
  });

  // ADDED: Logic for the 'Start Today' checkbox
  const startTodayCheckbox = block.querySelector(".start-today-checkbox");

  // Helper function to get today's date in the correct format
  function getTodaysDateFormatted() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString("default", { month: "short" });
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  }

  // Initialize the originalSipDate with the value set by flatpickr on load
  originalSipDate = sipDateDisplay.textContent;

  startTodayCheckbox.addEventListener("change", () => {
    if (startTodayCheckbox.checked) {
      // If checked, display today's date
      sipDateDisplay.textContent = getTodaysDateFormatted();
    } else {
      // If unchecked, revert to the user's selected date
      sipDateDisplay.textContent = originalSipDate;
    }
  });

  // --- CORRECTED CUSTOM DROPDOWN LOGIC ---
  block.querySelectorAll(".custom-select-wrapper").forEach((wrapper) => {
    const selected = wrapper.querySelector(".select-selected");
    const options = wrapper.querySelector(".select-options");
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');

    selected.addEventListener("click", (e) => {
      e.stopPropagation();
      // Close all other dropdowns first
      // 🧰 FIX: Look for the '.open' class on the wrapper, not the options list
      block
        .querySelectorAll(".custom-select-wrapper.open")
        .forEach((openWrapper) => {
          if (openWrapper !== wrapper) {
            openWrapper.classList.remove("open");
          }
        });
      // Toggle the current one
      wrapper.classList.toggle("open");
    });

    options.querySelectorAll("li").forEach((option) => {
      option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        hiddenInput.value = option.getAttribute("data-value");
        // 🧰 FIX: Remove the '.open' class from the wrapper
        wrapper.classList.remove("open");
      });
    });
  });

  // Add a listener to close dropdowns when clicking anywhere else
  block.addEventListener("click", () => {
    // 🧰 FIX: Look for and close any wrapper that has the '.open' class
    block
      .querySelectorAll(".custom-select-wrapper.open")
      .forEach((openWrapper) => {
        openWrapper.classList.remove("open");
      });
  });
}
