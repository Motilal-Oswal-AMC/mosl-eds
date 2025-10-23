import {
  div,
  p,
  h3,
  img,
  button,
  input,
  label,
  span,
  ul,
  li,
  h2,
} from '../../scripts/dom-helpers.js';
import '../../scripts/flatpickr.js';
import dataCfObj from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';
import { myAPI } from '../../scripts/scripts.js';

const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms); });
async function removeClassAfterDelay() {
  const closestParam = document.querySelector('main');
  await delay(1200);
  // closestParam.querySelector('.modal-content').remove();
  const bodym = document.querySelector('body');
  bodym.classList.remove('modal-open');
  bodym.classList.remove('noscroll');
  closestParam.querySelector('.modal').remove();
}

function hideFormsClick(btn) {
  // const card2 = closestParam.querySelector('.our-popular-funds')
  //   || closestParam.querySelector('.known-our-funds')
  //   || closestParam.querySelector('.fdp-card-container');

  // const card2 = closestParam.querySelector('.our-popular-funds')
  //   || closestParam.querySelector('.known-our-funds')
  //   || document.querySelector('.fdp-card-container');

  const card2 = document.querySelector('main');

  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop click from bubbling further
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    const classAddv12 = card2.querySelector('.invest-now-homepage-container');
    if (Array.from(classAddv12.classList).includes('hide-modal')) {
      classAddv12.classList.remove('hide-modal');
    }
    classAddv12.classList.add('hide-modal');
    classAddv12.classList.remove('modal-show');
    // }
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    const classAdd = card2.querySelector('.pan-details-modal');
    if (Array.from(classAdd.classList).includes('hide-modal')) {
      classAdd.classList.remove('hide-modal');
    }
    classAdd.classList.add('hide-modal');
    // async function removeClassAfterDelay() {
    //   await delay(1200);
    //   closestParam.querySelector('.modal').remove();
    // }
    classAdd.classList.remove('modal-show');
    // }
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    // v2 for kyc form

    const classAddv2 = card2.querySelector('.fdp-kyc-form');
    if (Array.from(classAdd.classList).includes('hide-modal')) {
      classAddv2.classList.remove('hide-modal');
    }
    classAddv2.classList.add('hide-modal');
    classAddv2.classList.remove('modal-show');
    // }
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    // v3 for otp

    const classAddv3 = card2.querySelector('.otp-fdp');
    if (Array.from(classAdd.classList).includes('hide-modal')) {
      classAddv3.classList.remove('hide-modal');
    }
    classAddv3.classList.add('hide-modal');
    classAddv3.classList.remove('modal-show');
    // }
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    // Fund added to cart successfully

    const classAddv4 = card2.querySelector('.added-fund-cart');
    if (Array.from(classAdd.classList).includes('hide-modal')) {
      classAddv4.classList.remove('hide-modal');
    }
    classAddv4.classList.add('hide-modal');
    classAddv4.classList.remove('modal-show');
    // }
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    // Pass Code Two Auth
    const classAddv5 = card2.querySelector('.two-step-auth');
    if (Array.from(classAdd.classList).includes('hide-modal')) {
      classAddv5.classList.remove('hide-modal');
    }
    classAddv5.classList.add('hide-modal');
    classAddv5.classList.remove('modal-show');
    // }
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    // Reset Pass Code Two Auth
    const classAddv6 = card2.querySelector('.reset-passcode');
    if (Array.from(classAdd.classList).includes('hide-modal')) {
      classAddv6.classList.remove('hide-modal');
    }
    classAddv6.classList.add('hide-modal');
    classAddv6.classList.remove('modal-show');
    // }
    document.body.classList.remove('noscroll');
    card2.classList.remove('modal-active-parent');

    // overlay.classList.add('hide-overlay');
    removeClassAfterDelay();
  });
}

export async function existingUser(paramblock) {
  const closestParam = paramblock.closest('main');
  const kycForm = closestParam.querySelector('.fdp-kyc-form');
  const panForm = closestParam.querySelector('.pan-details-modal');
  const pansuccessForm = closestParam.querySelector('.otp-fdp');
  const resetForm = closestParam.querySelector('.reset-passcode');

  const demo = Array.from(closestParam.querySelectorAll('.pan-details-modal p'));
  const inputLable = demo[0];
  if (!inputLable) {
    // console.warn('No <p> elements found inside .pan-details-modal');
    return;
  }

  inputLable.innerHTML = '';

  const addInputDiv = div(
    { class: 'input-wrapper' },
    label({ class: 'panlabel' }, 'Enter PAN Number'),
    input({
      type: 'text',
      placeholder: '',
      name: 'pan',
      class: 'iptpanfld',
      maxlength: '10',
    }),
    img({ class: 'error-icon cancel-error', src: '../../icons/icon-error.svg', alt: 'Cross Icon' }),
    img({ class: 'error-icon cancel-icon', src: '../../icons/remove-circle.svg', alt: 'Cross Icon' }),
  );

  dataMapMoObj.panDlts.isGuest = 'false';
  dataMapMoObj.panDlts.guestMenuState = {
    guestMenu: false,
    existingBox: true,
  };

  // function setCookie(cname, cvalue, exdays) {
  //   const d = new Date();
  //   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  //   const expires = `expires=${d.toUTCString()}`;
  //   document.cookie = `${cname}=${cvalue};${expires};path=/`;
  // }

  // function removeCookie(cname) {
  //   document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // }
  // removeCookie('')

  // eslint-disable-next-line consistent-return
  async function setmpinforgets(params) {
    try {
      const reqminfor = {
        userId: dataMapMoObj.panDlts.pannumber,
        clientType: 'MF',
        mpin: params.resetpass,
        confirmMpin: params.confirmpass,
        password: params.otpval,
      };
      const header = {
        'Content-Type': 'application/json',
        'User-Agent': 'WEB/MultipleCampaign',
        'user-agent': 'WEB/MultipleCampaign',
        UserAgent: 'WEB/MultipleCampaign',
      };
      if (params.resetpass !== params.confirmpass) {
        params.confirmPass.classList.add('passcode-fail');
        params.resetPass.classList.add('passcode-fail');
        return false;
      }
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/loginapi/api/Login/SETMPIN',
        reqminfor,
        header,
      );
      // console.log(rejsin);.
      window.alert(rejsin.message);
      panForm.classList.add('show-element');
      panForm.classList.remove('hide-element');
      panForm.querySelector('.iptpanfld').value = '';
      panForm.querySelector('.iptpanfld')
        .parentElement.classList.remove('active');
      resetForm.classList.remove('show-element');
      resetForm.classList.add('hide-element');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  async function apiPasscode(params) {
    try {
      const reqAuth = {
        password: params.optNo,
        userId: params.panNo,
        loginModeId: 1,
        credentialModeId: 3,
        ipV4: '192.198.22.22',
        otpThroughDIT: false,
        ditotpType: '',
        pmsGuest: false,
        isAIF: false,
        mfGuest: false,
        product: 'MF',
      };

      const header = {
        'Content-Type': 'application/json',
        'User-Agent': 'WEB/MultipleCampaign',
        'user-agent': 'WEB/MultipleCampaign',
        UserAgent: 'WEB/MultipleCampaign',
      };
      const passclass = closestParam.querySelector('.two-step-auth .twostepinner2');
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/loginapi/api/Login/AuthenticateUserCred',
        reqAuth,
        header,
      );
      if (rejsin.data && rejsin.data.userInfo) {
        document.cookie = `token= ${rejsin.data.accessToken}`;
        document.cookie = `refreshToken= ${rejsin.data.refreshToken}`;
        localStorage.setItem('userObj', JSON.stringify(rejsin.data.userInfo));
        if (dataMapMoObj.panRes.data.guestClient !== '') {
          // window.location.href = 'https://mf.moamc.com/mutualfund/onboarding/personal';
        } else if (dataMapMoObj.panRes.data.guestClient === '') {
          // window.location.href = 'https://mf.moamc.com/mutualfund/prelogin-to-postlogin-connector';
        }
        passclass.classList.add('passcode-success');
        window.location.href = 'https://mf.moamc.com/mutualfund/portfolio';
      } else {
        passclass.classList.add('passcode-fail');
      }
    } catch (error) {
      // console.log(error);
    }
  }

  function passCodeValidation(passpoint) {
    passpoint.forEach((inputelfac, index) => {
      inputelfac.setAttribute('maxLength', 1);
      inputelfac.addEventListener('input', () => {
        inputelfac.value = inputelfac.value.replace(/[^0-9]/g, '');
        if (inputelfac.value.length === 1 && index < passpoint.length - 1) {
          passpoint[index + 1].focus();
        }
      });
      inputelfac.addEventListener('keydown', (event) => {
        const totalInputs = passpoint.length;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
        }
        switch (event.key) {
          case 'Tab':
            if (!event.shiftKey && index === totalInputs - 1) {
              event.preventDefault();
              passpoint[0].focus();
            } else if (event.shiftKey && index === 0) {
              event.preventDefault();
              passpoint[totalInputs - 1].focus();
            }
            break;

          case 'ArrowRight': {
            const nextIndex = (index + 1) % totalInputs;
            passpoint[nextIndex].focus();
            break;
          }
          case 'ArrowLeft': {
            // Move to the previous input, or wrap to the last
            const prevIndex = (index - 1 + totalInputs) % totalInputs;
            passpoint[prevIndex].focus();
            break;
          }
          case 'Backspace':
            if (inputelfac.value.length === 0 && index > 0) {
              passpoint[index - 1].focus();
            }
            break;
          default:
            break;
        }
      });
    });
  }

  async function apiAuth(params) {
    try {
      const reqAuth = {
        password: params.optNo,
        userId: params.panNo,
        loginModeId: 1,
        credentialModeId: 1,
        ipV4: '192.198.22.22',
        otpThroughDIT: false,
        ditotpType: '',
        pmsGuest: false,
        isAIF: false,
        mfGuest: false,
        product: 'MF',
      };
      const header = {
        'Content-Type': 'application/json',
        'User-Agent': 'WEB/MultipleCampaign',
        'user-agent': 'WEB/MultipleCampaign',
        UserAgent: 'WEB/MultipleCampaign',
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/loginapi/api/Login/AuthenticateUserCred',
        reqAuth,
        header,
      );
      if (rejsin.data !== 'null' && rejsin.data.userInfo) {
        const twoAuth = closestParam.querySelector('.two-step-auth');
        const resetscreen = closestParam.querySelector('.reset-passcode');
        // twoAuth.style.display = 'block';
        // const boolpin = rejsin.data.userInfo.mPinFlag;
        pansuccessForm.classList.add('hide-element');
        pansuccessForm.classList.remove('show-element');
        pansuccessForm.classList.remove('modal-show');
        pansuccessForm.querySelector('.main-otp-con2 .otp-field')
          .classList.add('otp-succes');
        // if (boolpin === 'true') {
        // resetscreen.classList.add('show-element');
        // resetscreen.classList.add('modal-show');
        // resetscreen.classList.remove('hide-modal');
        // dataMapMoObj.passcode(resetscreen);
        // } else {
        twoAuth.classList.add('show-element');
        twoAuth.classList.add('modal-show');
        twoAuth.classList.remove('hide-modal');
        const passpoint = twoAuth.querySelectorAll('input');
        passCodeValidation(passpoint);
        const contbtn = twoAuth.querySelectorAll('.twostepmain2 button');
        contbtn[1].addEventListener('click', () => {
          let passValue = '';
          passpoint.forEach((elfor) => {
            passValue += elfor.value;
          });
          if (passValue.length < 4) {
            // pansuccessForm.querySelector('.otpfield').classList.add('otp-failed');
          } else {
            const panNum = {
              panNo: params.panNo,
              optNo: passValue,
              otpField: pansuccessForm,
            };
            apiPasscode(panNum);
          }
        });
        const forgetbtn = twoAuth.querySelector('.twostepmain2 .twostepsub4');
        forgetbtn.addEventListener('click', () => {
          twoAuth.classList.remove('show-element');
          twoAuth.classList.add('hide-element');
          twoAuth.classList.remove('modal-show');
          twoAuth.classList.remove('hide-modal');

          resetscreen.classList.add('show-element');
          resetscreen.classList.add('modal-show');
          resetscreen.classList.remove('hide-modal');
          dataMapMoObj.passcode(resetscreen);
        });
        // }
        // document.cookie = `accessToken= ${rejsin.data.accessToken}`;
        // document.cookie = `refreshToken= ${rejsin.data.refreshToken}`;
        // localStorage.setItem('userObj', JSON.stringify(rejsin.data.userInfo));
        // if (dataMapMoObj.panRes.data.guestClient !== '') {
        //   window.location.href = 'https://mf.moamc.com/mutualfund/onboarding/personal';
        // } else if (dataMapMoObj.panRes.data.guestClient === '') {
        //   window.location.href = 'https://mf.moamc.com/mutualfund/prelogin-to-postlogin-connector';
        // }
      } else if (rejsin.data === 'null') {
        pansuccessForm.querySelector('.main-otp-con2 .otp-field')
          .classList.add('otp-fail');
      }
      // console.log(rejsin);
      // params.otpField.classList.add('otp-succes');
    } catch (error) {
      // console.log(error);
      pansuccessForm.querySelector('.main-otp-con2 .otp-field')
        .classList.add('otp-fail');
    }
  }

  function forgetpasscode(resetscreen) {
    const texture = resetscreen
      .querySelector('.resetpasscode2 .innerpasscode3');
    texture.textContent = '';
    texture.textContent = dataMapMoObj.otpText;
    const resetpass = resetscreen
      .querySelector('.resetpasscode2 .innerpasscode5');
    const resetinp = resetpass.querySelectorAll('.pass-wrap input');
    passCodeValidation(resetinp);
    const confirmpass = resetscreen
      .querySelector('.resetpasscode2 .innerpasscode6');
    const confinp = confirmpass.querySelectorAll('.pass-wrap input');
    passCodeValidation(confinp);

    const resbtn = resetscreen.querySelector('.resend-btn');
    resbtn.addEventListener('click', () => {
      const paramPan = dataMapMoObj.panDlts.pannumber;
      dataMapMoObj.otpCallpan(paramPan);
    });
    const resentpass = resetscreen
      .querySelector('.resetpasscode2 .innerpasscode4');
    const resinp = resentpass.querySelectorAll('.otp-wrap input');
    dataMapMoObj.otpinput(resinp);
    const mod7 = resetscreen.querySelector('.resetpasscode2 .icon-modal-cross-btn');
    hideFormsClick(mod7);

    const resentSubmit = resetscreen.querySelector('.resetpasscode2 .submt-btn-txt');
    resentSubmit.addEventListener('click', () => {
      dataMapMoObj.setmpin = {
        resetPass: resetpass.querySelector('.passcode-field-wrap'),
        confirmPass: confirmpass.querySelector('.passcode-field-wrap'),
      };
      dataMapMoObj.setmpin.otpval = '';
      dataMapMoObj.setmpin.resetpass = '';
      dataMapMoObj.setmpin.confirmpass = '';
      resetinp.forEach((reinp) => {
        dataMapMoObj.setmpin.resetpass += reinp.value;
      });
      resinp.forEach((reinp) => {
        dataMapMoObj.setmpin.otpval += reinp.value;
      });
      confinp.forEach((reinp) => {
        dataMapMoObj.setmpin.confirmpass += reinp.value;
      });
      if (dataMapMoObj.setmpin.resetpass.length === 4
        && dataMapMoObj.setmpin.confirmpass.length === 4
        && dataMapMoObj.setmpin.otpval.length === 6
      ) {
        resetpass.querySelector('.passcode-field-wrap').classList
          .remove('passcode-fail');
        confirmpass.querySelector('.passcode-field-wrap').classList
          .remove('passcode-fail');
        resentpass.querySelector('.otp-field-wrap')
          .classList.remove('otp-fail');
        resentpass.querySelector('.otp-field-wrap')
          .classList.add('otp-success');

        setmpinforgets(dataMapMoObj.setmpin);
      }
      if (dataMapMoObj.setmpin.resetpass.length < 4) {
        resetpass.querySelector('.passcode-field-wrap').classList
          .add('passcode-fail');
        resetpass.querySelector('.passcode-field-wrap').classList
          .remove('passcode-success');
      }
      if (dataMapMoObj.setmpin.confirmpass.length < 4) {
        confirmpass.querySelector('.passcode-field-wrap').classList
          .add('passcode-fail');
        confirmpass.querySelector('.passcode-field-wrap').classList
          .remove('passcode-success');
      }
      if (dataMapMoObj.setmpin.confirmpass.length < 6) {
        resentpass.querySelector('.otp-field-wrap')
          .classList.add('otp-fail');
        resentpass.querySelector('.otp-field-wrap')
          .classList.remove('otp-success');
      }
    });
  }
  dataMapMoObj.passcode = forgetpasscode;

  async function panDetails(params) {
    try {
      const request = {
        name: params.userLogPanNm,
        panNo: params.userLogPan,
        otp: 0,
        saveForLater: true,
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/MFTransaction/api/InvestorDetails/panDetail',
        request,
      );
      const guestFlag = localStorage.getItem('isGuest');
      if (guestFlag === 'true') {
        document.cookie = `token=${rejsin.data.accessToken}`;
        document.cookie = `refreshToken=${rejsin.data.refreshToken}`;
        // setCookie('refreshToken', rejsin.data.refreshToken);
        window.location.href = 'https://mf.moamc.com/mutualfund/onboarding/personal';
      } else if (guestFlag === 'false') {
        const locobj = {
          panNo: params.userLogPan,
          panName: params.userLogPanNm,
          mobileNo: params.userLogMoNm,
          emailId: params.userLogEm,
        };
        localStorage.setItem('signzy', JSON.stringify(locobj));
        window.location.href = 'https://mf.moamc.com/mutualfund/prelogin-to-postlogin-connector';
      }
    } catch (error) {
      // console.log(error);
    }
  }

  async function lmsentCall(paramData) {
    try {
      const request = {
        frmdata: `LMS~${paramData.userLogPan}|${paramData.userLogPanNm}|+91${paramData.userLogMoNm}|${paramData.userLogEm}||Mumbai||${paramData.kycflag}|MF New investor|||||||||${paramData.isnri}|`,
      };
      const setRep = await myAPI('POST', 'https://api.moamc.com/initapi/api/Init/Lmsentry', request);
      console.log(setRep);
      panDetails(paramData);
    } catch (error) {
      // console.log(error);
    }
  }

  async function modiFyKycApicall(param) {
    try {
      const request = {
        name: param.userLogPanNm,
        email: param.userLogEm,
        phone: param.userLogMoNm,
        returnUrl: 'https://mf.moamc.com/onboarding/personal',
        timeOutUrl: 'https://mf.moamc.com/error',
        panNo: param.userLogPan,
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/prelogin/api/KYC/KYCProcess',
        request,
      );
      console.log('this is modiFuykyc Api Response ', rejsin);
      lmsentCall(param);
    } catch (error) {
      // console.log(error);
    }
  }

  async function getCkycData(paramDtArg) {
    try {
      const reqGetckyc = {
        panNo: paramDtArg,
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/prelogin/api/KYC/GetKYCData',
        reqGetckyc,
      );
      if (rejsin.data !== null) {
        // username
        kycForm.querySelector('.name-inp').value = rejsin.data.investorName;
        kycForm.querySelector('.name-inp').setAttribute('readonly', '');
        kycForm.querySelector('.name-inp')
          .parentElement.classList.add('active');
        // phonenumber
        kycForm.querySelector('.mob-inp').value = rejsin.data.mobileNo;
        kycForm.querySelector('.mob-inp').setAttribute('readonly', '');
        kycForm.querySelector('.mob-inp')
          .parentElement.classList.add('active');
        // email
        kycForm.querySelector('.email-inp').value = rejsin.data.email;
        kycForm.querySelector('.email-inp').setAttribute('readonly', '');
        kycForm.querySelector('.email-inp')
          .parentElement.classList.add('active');
        // city
        kycForm.querySelector('.city-inp').value = rejsin.data.city;
        kycForm.querySelector('.city-inp').setAttribute('readonly', '');
        kycForm.querySelector('.city-inp')
          .parentElement.classList.add('active');

        const conti = kycForm.querySelector('.tnc-container .button-container .button');
        conti.classList.add('active-form-btn');
      }
    } catch (error) {
      // console.log(error);
    }
  }

  async function otpCall(param) {
    try {
      const request = {
        userId: param,
        loginModeId: 1,
        credentialModeId: 1,
        ipV4: '192.168.22.22',
        otpThroughDIT: false,
        ditotpType: '',
        pmsGuest: false,
        isAIF: false,
        mfGuest: false,
        product: 'MF',
      };

      const header = {
        'Content-Type': 'application/json',
        'User-Agent': 'WEB/MultipleCampaign',
        'user-agent': 'WEB/MultipleCampaign',
        UserAgent: 'WEB/MultipleCampaign',
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/LoginAPI/api/Login/GenerateOtpNew',
        request,
        header,
      );
      if (rejsin.data !== null) {
        const subtext = pansuccessForm.querySelector('.main-otp-con2 .sub-otp-con5');
        subtext.textContent = '';
        subtext.textContent = rejsin.data;
        dataMapMoObj.otpText = rejsin.data;

        const subevent = closestParam.querySelector('.main-otp-con2 .sub-otp-con6');
        subevent.classList.add('sbmt-active');
        const inotp = pansuccessForm.querySelectorAll('.otp-wrap input');
        if (subevent.querySelector('.inner-otp-con1')) {
          subevent.querySelector('.inner-otp-con1').removeAttribute('href');
        }
        subevent.addEventListener('click', () => {
          let optValue = '';
          inotp.forEach((elfor) => {
            optValue += elfor.value;
          });
          if (optValue.length < 6) {
            pansuccessForm.querySelector('.otpfield').classList.add('otp-failed');
          } else {
            const panNum = {
              panNo: param,
              optNo: optValue,
              otpField: pansuccessForm.querySelector('.otpfield'),
            };
            apiAuth(panNum);
          }
        });
      } else if (rejsin.message.toLocaleLowerCase() !== 'successful') {
        const subtext = pansuccessForm.querySelector('.sub-otp-con3');
        subtext.textContent = '';
        subtext.textContent = rejsin.message;
      }
    } catch (error) {
      // console.log(error);
    }
  }
  dataMapMoObj.otpCallpan = otpCall;
  async function kycCall(param) {
    try {
      const request = {
        panNo: param,
      };
      const rejsin = await myAPI(
        'POST',
        ' https://api.moamc.com/InitAPI/api/Init/CVLKYCCheck',
        request,
      );
      const kycres = rejsin.data.kycStatus;
      // const isKyc = dataMapMoObj.panRes.data.existingClient;
      dataMapMoObj.kycStatus = rejsin.data.kycStatus;
      const boolkyc = kycres === 'Y' ? 'true' : 'false';
      localStorage.setItem('kycstatus', boolkyc);

      const KRA_VERIFIED = ['002', '102', '202', '302', '402', '502'];
      const KRA_VALIDATED = ['007', '107', '207', '307', '407', '507', '011', '111', '211', '311',
        '411', '511', '012', '112', '212', '312', '412', '512'];
      if (KRA_VERIFIED.includes(rejsin.data.cvlAppStatus)) {
        localStorage.setItem('kraVerified', 'Y');
      }

      if (KRA_VALIDATED.includes(rejsin.data.cvlAppStatus)) {
        localStorage.setItem('kraValidated', 'Y');
      }

      const resentBtn = pansuccessForm
        .querySelector('.sub-otp-con4 .inner-otp-con3');
      resentBtn.addEventListener('click', () => {
        const parampan = dataMapMoObj.panDlts.pannumber;
        // if(){
        dataMapMoObj.otpLimit += 1;
        // }
        if (dataMapMoObj.otpLimit <= 5) {
          otpCall(parampan);
        }
      });
      if (kycres === 'Y') {
        kycForm.classList.add('hide-element');
        panForm.classList.add('hide-element');
        panForm.classList.remove('show-element');
        pansuccessForm.classList.remove('hide-element');
        pansuccessForm.classList.add('show-element');
        pansuccessForm
          .querySelector('.otp-heading .otp-main-con1').textContent = '';
        pansuccessForm
          .querySelector('.otp-heading .otp-main-con1').textContent = rejsin.data.nameAsOnPan;
        // kycForm.style.display = 'none'; // display none kycform
        // panForm.style.display = 'none'; // display none panform
        // pansuccessForm.style.display = 'flex'; // display block otp form
        const paninp = pansuccessForm.querySelector('.otp-wrap input');
        paninp.focus();
        const classAddv3 = closestParam.querySelector('.otp-fdp');
        if (Array.from(classAddv3.classList).includes('hide-modal')) {
          classAddv3.classList.remove('hide-modal');
        }
        classAddv3.classList.remove('hide-modal');
        classAddv3.classList.add('modal-show');
        panForm.classList.remove('show-modal');
        const inputs = pansuccessForm.querySelectorAll('.otp-wrap input');
        dataMapMoObj.otpinput(inputs);
        otpCall(param);
        dataMapMoObj.otpLimit = 1;
      } else {
        kycForm.style.display = 'block';
        panForm.style.display = 'none';
        pansuccessForm.style.display = 'none';

        const classAddv3 = closestParam.querySelector('.fdp-kyc-form');
        if (Array.from(classAddv3.classList).includes('hide-modal')) {
          classAddv3.classList.remove('hide-modal');
        }
        classAddv3.classList.remove('hide-modal');
        classAddv3.classList.add('modal-show');

        const userLoginPanNumber = classAddv3.querySelector('.panvalidsub3 .pan-inp');
        userLoginPanNumber.value = dataMapMoObj.panDlts.pannumber.toUpperCase();
        userLoginPanNumber.setAttribute('readonly', true);
        userLoginPanNumber.parentElement.classList.remove('pan-fail');
        userLoginPanNumber.parentElement.classList.add('active');
        const userNm = classAddv3.querySelector('.name-inp');
        const userNo = classAddv3.querySelector('.mob-inp');
        const userem = classAddv3.querySelector('.email-inp');
        const usercity = classAddv3.querySelector('.city-inp');
        // userNm.parentElement.classList.remove('show-error');
        // userNo.parentElement.classList.remove('show-error');
        // userem.parentElement.classList.remove('show-error');
        // usercity.parentElement.classList.remove('show-error');
        classAddv3.querySelector('#opt1').click();
        // const editInput = closestParam.querySelector('.pan-image');
        userLoginPanNumber.setAttribute('maxLength', 10);
        userNo.setAttribute('maxLength', 10);
        const clearbtn = classAddv3.querySelectorAll('.error-icon');
        Array.from(clearbtn).forEach((clear) => {
          clear.addEventListener('click', (prev) => {
            prev.target.previousElementSibling.value = '';
          });
        });
        const continueBTN = classAddv3.querySelector('.tnc-container .button-container .button');
        continueBTN.removeAttribute('href');
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        const phoneRegex = /^\d{10}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const usernameRegex = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;

        userLoginPanNumber.addEventListener('input', (e) => {
          const inputValue = e.target.value.toUpperCase();
          const errorPanEl = e.target.parentElement;
          if (panRegex.test(inputValue)) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('active');
            userLoginPanNumber.setAttribute('readonly', true);
            if (panRegex.test(userLoginPanNumber.value)
              && phoneRegex.test(userNo.value)
              && emailRegex.test(userem.value)
              && usernameRegex.test(userNm.value)) {
              continueBTN.classList.add('active-form-btn');
            }
            // flagForm = '';
          } else {
            errorPanEl.classList.add('show-error');
            errorPanEl.classList.add('active');
            continueBTN.classList.remove('active-form-btn');
            // flagForm = 'Y';
          }
          if (inputValue.length === 0) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.remove('active');
          }
        });
        userNm.addEventListener('input', (e) => {
          const inputValue = e.target.value.toUpperCase();
          const errorPanEl = e.target.parentElement;
          if (usernameRegex.test(inputValue)) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('active');
            userLoginPanNumber.setAttribute('readonly', true);
            if (panRegex.test(userLoginPanNumber.value)
              && phoneRegex.test(userNo.value)
              && emailRegex.test(userem.value)
              && usernameRegex.test(userNm.value)) {
              continueBTN.classList.add('active-form-btn');
            }
          } else {
            errorPanEl.classList.add('show-error');
            errorPanEl.classList.add('active');
            continueBTN.classList.remove('active-form-btn');
          }

          if (inputValue.length === 0) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.remove('active');
          }
        });
        userNo.addEventListener('input', (e) => {
          const inputValue = e.target.value.toUpperCase();
          const errorPanEl = e.target.parentElement;
          e.target.value = inputValue.replace(/[^0-9]/g, '');
          if (phoneRegex.test(inputValue)) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('active');
            userLoginPanNumber.setAttribute('readonly', true);
            if (panRegex.test(userLoginPanNumber.value)
              && phoneRegex.test(userNo.value)
              && emailRegex.test(userem.value)
              && usernameRegex.test(userNm.value)) {
              continueBTN.classList.add('active-form-btn');
            }
          } else {
            errorPanEl.classList.add('show-error');
            errorPanEl.classList.add('active');
            continueBTN.classList.remove('active-form-btn');
          }
          if (inputValue.length === 0) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.remove('active');
          }
        });
        userem.addEventListener('input', (e) => {
          const inputValue = e.target.value.toUpperCase();
          const errorPanEl = e.target.parentElement;
          if (emailRegex.test(inputValue)) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('active');
            userLoginPanNumber.setAttribute('readonly', true);
            if (panRegex.test(userLoginPanNumber.value)
              && phoneRegex.test(userNo.value)
              && emailRegex.test(userem.value)
              && usernameRegex.test(userNm.value)) {
              continueBTN.classList.add('active-form-btn');
            }
          } else {
            errorPanEl.classList.add('active');
            errorPanEl.classList.add('show-error');
            continueBTN.classList.remove('active-form-btn');
          }
          if (inputValue.length === 0) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.remove('active');
          }
        });
        usercity.addEventListener('input', (e) => {
          const inputValue = e.target.value.toUpperCase();
          const errorPanEl = e.target.parentElement;
          if (inputValue.length !== 0) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.add('active');
          } else {
            errorPanEl.classList.add('show-error');
            errorPanEl.classList.add('active');
          }
          if (inputValue.length === 0) {
            errorPanEl.classList.remove('show-error');
            errorPanEl.classList.remove('active');
          }
        });
        if (boolkyc === 'true') {
          const pandata = {
            userLogPanNm: userLoginPanNumber.value,
            userLogPan: rejsin.data.nameAsOnPan,
          };
          panDetails(pandata);
        } else {
          getCkycData(userLoginPanNumber.value);
        }
      }
    } catch (error) {
      // console.log(error);
    }
  }
  function otpValidation(inputs) {
    inputs.forEach((inputel, index) => {
      inputel.setAttribute('maxLength', 1);
      inputel.addEventListener('input', () => {
        inputel.value = inputel.value.replace(/[^0-9]/g, '');
        if (inputel.value.length === 1 && index < inputs.length - 1) {
          inputs[index + 1].focus();
        }
      });
      inputel.addEventListener('keydown', (event) => {
        const totalInputs = inputs.length;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
        }
        switch (event.key) {
          case 'Tab':
            if (!event.shiftKey && index === totalInputs - 1) {
              event.preventDefault();
              inputs[0].focus();
            } else if (event.shiftKey && index === 0) {
              event.preventDefault();
              inputs[totalInputs - 1].focus();
            }
            break;

          case 'ArrowRight': {
            const nextIndex = (index + 1) % totalInputs;
            inputs[nextIndex].focus();
            break;
          }
          case 'ArrowLeft': {
            // Move to the previous input, or wrap to the last
            const prevIndex = (index - 1 + totalInputs) % totalInputs;
            inputs[prevIndex].focus();
            break;
          }
          case 'Backspace':
            if (inputel.value.length === 0 && index > 0) {
              inputs[index - 1].focus();
            }
            break;
          default:
            break;
        }
      });
    });
  }
  dataMapMoObj.otpinput = otpValidation;
  // ModifyKyc API  start
  //  https://api.moamc.com/prelogin/api/KYC/KYCProcess

  // ModifyKyc API  start
  //  https://api.moamc.com/prelogin/api/KYC/KYCProcess

  const modiparent = closestParam.querySelector('.fdp-kyc-form');
  const ModifyKycForm = modiparent.querySelector('.tnc-container .button-container .button');
  if (ModifyKycForm !== null) {
    ModifyKycForm.addEventListener('click', () => {
      const userLoginPanNumber = modiparent.querySelector('.panvalidsub3 .pan-inp').value; // input
      const isNri = modiparent.querySelector('#opt1').checked;
      const userLoginPanName = modiparent.querySelector('.name-inp').value;
      const userLoginMobileNumber = modiparent.querySelector('.mob-inp').value;
      const userLoginEmail = modiparent.querySelector('.email-inp').value;
      const usercity = modiparent.querySelector('.city-inp').value;
      const formdata = {
        userLogPan: userLoginPanNumber,
        userLogPanNm: userLoginPanName,
        userLogMoNm: userLoginMobileNumber,
        userLogEm: userLoginEmail,
        isnri: isNri,
        userCity: usercity,
        kycflag: dataMapMoObj.kycStatus,
      };
      const continueBTN = document.querySelector('.tnc-container .button-container .button');
      if (Array.from(continueBTN.classList).includes('active-form-btn')) {
      // lmsentCall(formdata);
        modiFyKycApicall(formdata);
      }
    });
  }
  // ModifyKyc API  ends

  inputLable.appendChild(addInputDiv);

  // api call for otp
  // 'AEEPW9969G',

  async function apiCall(userPanNumber) {
    try {
      dataMapMoObj.panDlts.isIndividualPan = userPanNumber;
      dataMapMoObj.panDlts.pannumber = userPanNumber;
      const request = {
        panNo: userPanNumber,
      };
      const rejsin = await myAPI(
        'POST',
        'https://api.moamc.com/LoginAPI/api/Login/GetClientType',
        request,
      );
      dataMapMoObj.panRes = rejsin;

      // const isSuccess = rejsin.data.existingClient === '' ? false : true;
      const tempArray = ['MF', 'BOTH'];
      const exixting = ['ZBF', 'REDEEMZBF'];
      if (rejsin.data.guestClient === '') {
        dataMapMoObj.panDlts.isNewGuest = true;
      } else if (tempArray.includes(rejsin.data.guestClient)) {
        dataMapMoObj.panDlts.isGuest = true;
        dataMapMoObj.panDlts.guestMenuState = {
          guestMenu: true,
          existingBox: false,
        };
      } else if (exixting.includes(rejsin.data.existingClient)) {
        dataMapMoObj.panDlts.isGuest = false;
        dataMapMoObj.panDlts.guestMenuState = {
          guestMenu: true,
          existingBox: false,
        };
      } else if (tempArray.includes(rejsin.data.newClient)) {
        dataMapMoObj.panDlts.isGuest = false;
        dataMapMoObj.panDlts.guestMenuState = {
          guestMenu: true,
          existingBox: false,
        };
      }

      if (window.location.href.includes('/our-funds/funds-details-page')) {
        const planCodesh = localStorage.getItem('planCode') || 'Direct:LM';
        const planslabel = planCodesh.split(':')[1];
        const schemeCode = planslabel;
        const parcloset = closestParam.querySelector('.fdp-card-container');
        const paranearby = parcloset.querySelector('.dropdownmidle .selecttext');
        const planCodenearby = paranearby.getAttribute('dataattr');
        const dataplan = dataCfObj.cfDataObjs.filter((eldata) => eldata.schcode === schemeCode);
        const amcPlanCode = dataplan[0].moAmcCode;
        const optioncode = dataplan[0].planList
          .filter((elop) => elop.groupedCode === planCodenearby);
        const sOptCode = optioncode[0].optionCode; //
        const { planCode } = optioncode[0];
        const existingQueryParams = '?';

        const redirectURL = `/quickbuy?fund=${schemeCode}&plan=${planCode}&amcPlan=${amcPlanCode}&option=${sOptCode}${existingQueryParams}&landingPage=true`;
        localStorage.setItem('prelogin-to-postlogin-redirect-url', redirectURL);
        localStorage.setItem('prelogin-to-postlogin-clientType', JSON.stringify(rejsin.data));
      }
      localStorage.setItem(
        'UPDATE_GUEST_MENU',
        JSON.stringify(dataMapMoObj.panDlts.guestMenuState),
      );
      localStorage.setItem('isGuest', dataMapMoObj.panDlts.isGuest);

      kycCall(userPanNumber);
    } catch (error) {
      // console.log(error);
    }
  }

  const parentElements = closestParam.querySelector('.pan-details-modal');
  dataMapMoObj.CLASS_PREFIXES = ['mainpandts', 'subpandts', 'innerpandts'];
  dataMapMoObj.addIndexed(parentElements);

  // Authenciate click
  const authenticateClick = closestParam.querySelector('.subpandts3 .innerpandts1');
  authenticateClick.addEventListener('click', () => {
    const checkInput = closestParam.querySelector('.error-pan');
    const userPanNumber = closestParam.querySelector('.iptpanfld').value;

    const userPanNumberShow = closestParam.querySelector(
      '.sub-otp-con3 .inner-otp-con1 .otp-main-con2',
    );
    // added userPanNumber
    if (userPanNumberShow !== null) {
      const inner = closestParam
        .querySelector('.sub-otp-con3 .inner-otp-con1');
      inner.classList.add('active');
      userPanNumberShow.value = userPanNumber.toUpperCase();
      userPanNumberShow.setAttribute('readonly', true);
    }

    const panDet = closestParam.querySelector('.pan-details-modal'); // .style.display = 'block';
    panDet.classList.add('show-modal');

    // existingUser(block);
    // const classAddv3 = closestParam.querySelector('.fdp-kyc-form');
    // if (Array.from(classAddv3.classList).includes('hide-modal')) {
    //   classAddv3.classList.remove('hide-modal');
    // }
    // classAddv3.classList.remove('hide-modal');
    // classAddv3.classList.add('modal-show');
    if (userPanNumber === '') {
      checkInput.classList.add('show-error');
    }
    if (!checkInput.classList.contains('show-error')) {
      // document.querySelector('.subpandts3 .innerpandts1').style.backgroundColor = '#2E2A94';
      apiCall(userPanNumber); // Only called if no error
    } else {
      console.log('PAN number is invalid. API call blocked.');
    }
  });

  // Create the error message element once

  const errorPanEl = document.createElement('p');
  errorPanEl.className = 'error-pan hide-error'; // initially hidden
  errorPanEl.textContent = 'Invalid PAN number';
  inputLable.appendChild(errorPanEl); // append it once

  inputLable.addEventListener('click', (e) => {
    const inputVal = e.currentTarget.querySelector('input');
    if (inputVal.value === '') {
      e.target.parentElement.classList.add('active');
    }
  });

  const erricon = inputLable.querySelectorAll('.error-icon');
  Array.from(erricon).forEach((el) => {
    el.addEventListener('click', () => {
      inputLable.querySelector('input').value = '';
      inputLable.querySelector('.input-wrapper').classList.remove('show-error');
      inputLable.querySelector('.input-wrapper').classList.remove('active');
    });
  });

  inputLable.addEventListener('input', (e) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    const inputValue = e.target.value.toUpperCase();

    const btnAuthenticate = document.querySelector('.subpandts3 .innerpandts1');

    if (inputValue === '') {
      // If empty, hide the error
      errorPanEl.previousElementSibling.classList.remove('show-error');
      errorPanEl.previousElementSibling.classList.add('hide-error');
      e.target.parentElement.classList.remove('active');
    } else if (panRegex.test(inputValue)) {
      // If valid PAN, hide error
      errorPanEl.previousElementSibling.classList.remove('show-error');
      errorPanEl.previousElementSibling.classList.add('hide-error');
      btnAuthenticate.classList.add('pan-active');
      e.target.parentElement.classList.add('active');
    } else {
      // If invalid PAN, show error
      errorPanEl.previousElementSibling.classList.remove('hide-error');
      errorPanEl.previousElementSibling.classList.add('show-error');
      btnAuthenticate.classList.remove('pan-active');
      e.target.parentElement.classList.add('active');
    }
  });

  document.addEventListener('click', (event) => {
    if (!closestParam.querySelector('.dropdown-wrap').contains(event.target)) {
      closestParam.querySelector('.dropdown-wrap')
        .classList.remove('dropdown-active');
    }
    if (!inputLable.querySelector('input').contains(event.target)
      && inputLable.querySelector('input').value === '') {
      inputLable.querySelector('.innerpandts1').classList.remove('active');
    }
  });
  // this function for hide modal forms

  const mod = closestParam.querySelector('.pan-details-modal .icon-modal-cross-btn');
  const mod2 = closestParam
    .querySelector('.fdp-kyc-form .panvalidsub3 .icon-modal-cross-btn');
  const mod3 = closestParam
    .querySelector('.otp-fdp .main-otp-con2 .icon-modal-cross-btn');
  const mod6 = closestParam
    .querySelector('.two-step-auth .twostepmain2 .icon-modal-cross-btn');

  // closestParam.querySelector('.pan-details-modal');

  hideFormsClick(mod2);
  hideFormsClick(mod);
  hideFormsClick(mod3);
  hideFormsClick(mod6);
}

function loadCSS(href) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

// Helper function to create a custom dropdown
function createCustomDropdown(id, labelText, options, defaultValue) {
  return div(
    { class: 'custom-select-wrapper', id: `custom-select-${id}` },
    label({ class: 'custom-select-label' }, labelText),
    p({ class: 'select-selected' }, defaultValue),
    ul({ class: 'select-options' }, ...options.map((opt) => li({ class: 'select-list', 'data-value': opt }, opt))),
    input({ type: 'hidden', id, value: defaultValue }),
  );
}

export default function decorate(block) {
  const mainclass = block.closest('main');
  dataMapMoObj.panDlts = {};
  if (mainclass.querySelector('.modal-stepup-one')) {
    const modelone = mainclass.querySelector('.modal-stepup-one');
    dataMapMoObj.CLASS_PREFIXES = ['modelonemain', 'modelonesub', 'modeloneinner', 'modelinnerone', 'modelsubone'];
    dataMapMoObj.addIndexed(modelone);
  }
  if (mainclass.querySelector('.modal-stepup-two')) {
    const modeltwo = mainclass.querySelector('.modal-stepup-two');
    dataMapMoObj.CLASS_PREFIXES = ['modeltwomain', 'modeltwosub', 'modeltwoinner', 'modelinnertwo', 'modelsubtwo'];
    dataMapMoObj.addIndexed(modeltwo);
    const mod5 = mainclass.querySelector('.added-fund-cart .icon-modal-cross-btn');
    hideFormsClick(mod5);
  }
  if (mainclass.querySelector('.added-fund-cart')) {
    dataMapMoObj.CLASS_PREFIXES = ['addcartmain', 'addcartsub', 'addcartinner', 'addinnercar'];
    dataMapMoObj.addIndexed(mainclass.querySelector('.added-fund-cart'));
    const mod5 = mainclass.querySelector('.added-fund-cart .icon-modal-cross-btn');
    hideFormsClick(mod5);
    const addcardSec = mainclass.querySelector('.added-fund-cart');
    addcardSec.querySelector('.addcartsub4 .addcartinner1').addEventListener('click', () => {
      // console.log('okies');
      mod5.click();
    });
    addcardSec.querySelector('.addcartsub4 .addcartinner2').addEventListener('click', () => {
      localStorage.clear();
      window.location.href = `${window.location.origin}/motilalfigma/our-funds`;
    });
    // return false;
  }
  const twoStepAuthMain = mainclass.querySelector('.two-step-auth');

  if (twoStepAuthMain) {
    dataMapMoObj.CLASS_PREFIXES = ['twostepmain', 'twostepsub', 'twostepinner', 'twostepsubinner'];
    dataMapMoObj.addIndexed(mainclass.querySelector('.two-step-auth'));

    const twoStpTitle = twoStepAuthMain.querySelector('.twostepsub1').textContent;
    const twostppasscodelabel = twoStepAuthMain.querySelector('.twostepsub2').textContent;
    const twostpfrgtpass = twoStepAuthMain.querySelector('.twostepsub3').textContent;
    const twostpcontbtn = twoStepAuthMain.querySelector('.twostepsub4').textContent;
    const twostpterms = twoStepAuthMain.querySelector('.twostepsub5').cloneNode(true);
    const twostpcrossbtn = twoStepAuthMain.querySelector('.twostepsub6').cloneNode(true);
    twoStepAuthMain.querySelector('.twostepmain1').style.display = 'none';
    const twoStepMainStr = div(
      { class: 'two-step-wrap' },
      div({ class: 'modal-cross-wrap' }, twostpcrossbtn),
      h2({ class: 'two-step-heading' }, twoStpTitle),
      div(
        { class: 'passcode-wrap' },
        p({ class: 'passcode-label' }, twostppasscodelabel),
        div(
          { class: 'passcode-inp-wrap' },
          div(
            { clasS: 'passcode-field' },
            input({ type: 'password', class: 'passcode-inp', maxlength: '1' }),
          ),
          div(
            { clasS: 'passcode-field' },
            input({ type: 'password', class: 'passcode-inp', maxlength: '1' }),
          ),
          div(
            { clasS: 'passcode-field' },
            input({ type: 'password', class: 'passcode-inp', maxlength: '1' }),
          ),
          div(
            { clasS: 'passcode-field' },
            input({ type: 'password', class: 'passcode-inp', maxlength: '1' }),
          ),
        ),
        span({ class: 'passcode-error' }, 'Incorrect Passcode'),
      ),
      button({ class: 'frgt-pass-btn' }, twostpfrgtpass),
      button({ class: 'cont-btn' }, twostpcontbtn),
      div({ class: 'terms-cons' }, twostpterms),
    );
    if (!twoStepAuthMain.querySelector('.two-step-wrap')) {
      twoStepAuthMain.append(twoStepMainStr);
      // const mod6 = twoStepAuthMain.querySelector('.two-step-wrap .icon-modal-cross-btn');
      // hideFormsClick(mod6);
    }
    // return false;
  }
  loadCSS('../../scripts/flatpickr.min.css');
  const schcodeFromStorage = localStorage.getItem('schcodeactive');
  const fundData = dataCfObj.cfDataObjs.find(
    (fund) => fund.schcode === schcodeFromStorage,
  );
  let fundNameFromData;
  if (fundData) {
    // console.log('Found Fund Data:', fundData);
    fundNameFromData = fundData.schDetail.schemeName;
  } else {
    // console.error('No fund data found for schcode:', schcodeFromStorage);
  }

  // Step up UI
  const stepblk = block.closest('.invest-now-homepage-container');
  let divstepup;
  const blkcompo = stepblk.querySelector('.step-up-block-wrapper');
  // console.log(blkcompo);

  if (blkcompo) {
    dataMapMoObj.CLASS_PREFIXES = ['mainstepup', 'substepup', 'innerstepup',
      'stepupmain', 'stepupsub', 'stepupinner',
    ];
    dataMapMoObj.addIndexed(blkcompo);
    const checkboxcont = blkcompo.querySelector('.substepup1 .stepupmain1').cloneNode(true);
    const fieldlabel1 = blkcompo.querySelector('.substepup1 .stepupmain2').textContent.trim();
    const fieldlabel2 = blkcompo.querySelector('.substepup1 .stepupmain3').textContent.trim();
    const fieldlabel3 = blkcompo.querySelector('.substepup1 .stepupmain4').textContent.trim();
    const fieldlabel4 = blkcompo.querySelector('.substepup2 .stepupmain1').textContent.trim();
    const fieldlabel5 = blkcompo.querySelector('.substepup2 .stepupmain2').textContent.trim();
    const fieldlabel6 = blkcompo.querySelector('.substepup1 .stepupmain5').textContent.trim();
    const stepupOptions = [
      'Yearly',
      'Daily',
      'Fortnightly',
      'Monthly',
      'Quarterly',
      'Weekly',
    ];
    checkboxcont.prepend(input({
      class: 'stepup-box',
      type: 'checkbox',
      onclick: (event) => {
        const chkevent = event.target.closest('.steup-container');
        if (Array.from(chkevent.classList).includes('stepup-active')) {
          chkevent.classList.remove('stepup-active');
        } else {
          chkevent.classList.add('stepup-active');
        }
      },
    }));
    divstepup = div(
      { class: 'steup-container' },
      div(
        { class: 'stepup-checkbox' },
        checkboxcont,
        div({ class: 'discripone' }, fieldlabel1),
      ),
      div(
        { class: 'form-container' },
        div(
          { class: 'input-wrapper' },
          div(
            { class: 'inputfield' },
            div(
              { class: 'stepupfield' },
              label(
                { class: 'stepuplabel', for: 'stepamnt' },
                fieldlabel2,
              ),
              input({
                class: 'stepupamt', type: 'text', id: 'stepamnt', value: '1,000',
              }),
            ),
            div(
              {
                class: 'stepupfieldrop',
              },
              createCustomDropdown(
                'stepup-dropdown',
                fieldlabel3,
                stepupOptions,
                stepupOptions[0],
              ),
            ),
          ),
          p(
            { class: 'stepdisp' },
            fieldlabel6,
          ),
        ),
      ),
      div(
        { class: 'input-contain' },
        div(
          { class: 'maxsipfield' },
          div(
            { class: 'maxstepupfield' },
            label(
              { class: 'maxstepuplabel', for: 'maxsipamnt' },
              fieldlabel4,
            ),
            input({
              class: 'maxstepupamt', type: 'text', id: 'maxsipamnt', value: '24,000',
            }),
          ),
        ),
        div(
          { class: 'discription2' },
          fieldlabel5,
        ),
      ),
    );
  } else {
    divstepup = '';
  }

  const col1 = block.children[0].querySelectorAll('p');
  let col2 = '';

  if (block.children[1] === undefined) {
    return false;
  }
  col2 = block.children[1].querySelectorAll('p');
  const col3 = block.children[2].querySelectorAll('p');

  const lumpsumLabel = col1[1]?.textContent || '';
  const sipLabel = col1[2]?.textContent || '';
  const inputLabel = col1[3]?.textContent || '';

  // const defaultAmount = col2[0]?.textContent || '';
  const rawAmount = col2[0]?.textContent || '';
  const defaultAmount = rawAmount
    ? Number(rawAmount).toLocaleString('en-IN')
    : '';
  const formattedSuggestions = [col2[1], col2[2], col2[3]].map(
    (pelem) => pelem?.textContent || '',
  );
  const suggestions = formattedSuggestions.map((s) => Number(s).toLocaleString('en-IN'));
  const frequency = col3[0]?.textContent || '';
  const endDate = col3[1]?.textContent || '';
  // const ctaLabel = col3[2]?.textContent || '';

  // Frequency options (mirror your JSON)
  // const brandName = 'Motilal Oswal';
  // const logoSrc = '../../icons/Group.svg';
  const mop = `MO_${schcodeFromStorage}.svg`;
  const logoSrc = `../../icons/schemeicons/${mop}`;
  // const calendarIconSrc = '../../icons/calendar.svg';
  // // Replace with your real calendar icon path
  const infotoolsrc = '../../icons/information.svg';
  const closesrc = '../../icons/cross.svg';
  const frequencyOptions = [
    'Annual',
    'Daily',
    'Fortnightly',
    'Monthly',
    'Quarterly',
    'Weekly',
  ];
  const endDateOptions = ['Until I cancel', 'Select Date'];
  const startDateOptions = ['Until I cancel', 'Select Date'];

  block.innerHTML = '';

  // Close Button
  function getTodaysDateFormatted() {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('default', { month: 'short' });
    const year = today.getFullYear();
    return `${day} ${month} ${year}`;
  }

  const closebtn = div(
    { class: 'modal-btn' },
    span(
      { class: 'close-btn' },
      img({ class: 'modal-btn-svg', src: closesrc, alt: 'cross' }),
    ),
  );

  // Build modal
  const textdrop = dataMapMoObj.planText === undefined ? '' : dataMapMoObj.planText;
  const modal = div(
    { class: 'invest-now-modal fdp-sip-modal' },
    div(
      { class: 'modal-header-container' },
      div(
        { class: 'modal-header' },
        div(
          { class: 'modal-header-logo' },
          img({ class: 'brandlogo', src: logoSrc, alt: 'BrandLogo' }),
        ),
        div(
          { class: 'modal-header-subtitle' },
          // p({ class: 'brandname' }, brandName),
          h3({ class: 'fund-name' }, fundNameFromData),
          div(
            { class: 'dropdown-wrap' },
            p({ class: 'selected-txt' }, textdrop),
            ul(
              { class: 'dropdown-list' },
              ...dataMapMoObj.planlistArr.map((eloption) => li({
                class: 'list-name',
                datacode: eloption.groupedCode,
              }, `${eloption.planName} | ${eloption.optionName}`)),
            ),
          ),
        ),
      ),
    ),
    div(
      { class: 'modal-inputs-container' },
      div(
        { class: 'modal-inputs-subcontainer' },
        div(
          { class: 'modal-inputs' },
          div(
            { class: 'modal-toggle' },
            div(
              { class: 'modal-btn-lumpsum lumsum-sip-btn active' },
              button({ class: 'lumsip-btn' }, lumpsumLabel),
            ),
            div({ class: 'modal-btn-sip lumsum-sip-btn' }, button({ class: 'lumsip-btn' }, sipLabel)),
          ),
          div(
            { class: 'modal-input' },
            label({ class: 'invest-amnt-label' }, inputLabel),
            div(
              { class: 'modal-input-symbol' },
              // input({ type: 'number', value: defaultAmount, class: 'amount-input' })),
              input({
                type: 'tel',
                inputmode: 'numeric',
                pattern: '[0-9]*',
                value: defaultAmount,
                class: 'amount-input',
              }),
            ),
            span({ class: 'amount-word-format' }, 'Rupees ten thousand only'),
            span(
              { class: 'amount-error error-hide' },
              'Amount must be between 500 and 1000000',
            ),
          ),
          div(
            { class: 'modal-suggestions' },
            ...suggestions.map((s) => button({ class: 'suggestion-btn' }, `+₹${s}`)),
          ),
        ),
        div(
          { class: 'modal-input-fields hidden' },
          div(
            { class: 'modal-sip' },
            div(
              { class: 'modal-start-today' },
              label(
                { class: 'start-today-label' },
                input({ type: 'checkbox', class: 'start-today-checkbox' }),
                // span({ class: 'custom-box' }),
                span({ class: 'label-txt' }, ' Start Today'),
              ),
              div(
                { class: 'start-today-note' },
                p(
                  { class: 'sip-note' },
                  'Your first SIP instalment will be deducted today.',
                ),
                div(
                  { class: 'sip-note-highlight' },
                  img({ class: 'tooltip-info', src: infotoolsrc, alt: 'information' }),
                  div(
                    { class: 'tooltip-wrap' },
                    p({ class: 'tooltip-text' }, 'We’ll debit your first SIP installment today through your chosen payment mode, and all future installments will be automatically collected via your registered Autopay or URN.'),
                    button({ class: 'tooltip-btn-mob' }, 'Ok'),
                  ),
                ),
              ),
            ),
            div(
              { class: 'modal-sip-dropdown' },
              div(
                { class: 'date-drop-down' },
                createCustomDropdown('startDate', 'Start Date', startDateOptions, getTodaysDateFormatted()),
                createCustomDropdown(
                  'frequency',
                  'Frequency',
                  frequencyOptions,
                  frequency,
                ),
                createCustomDropdown('endDate', 'End Date', endDateOptions, endDate),
              ),
            ),
          ),
          divstepup,
        ),
      ),
      div(
        { class: 'modal-cta' },
        button({
          class: 'buy-now-btn modal-cta-btn',
          onclick: () => {
            const mainmo = block.closest('main');
            const investMod = mainmo.querySelector('.invest-now-homepage-container'); // .style.display = 'none';
            const panMod = mainmo.querySelector('.added-fund-cart'); // .style.display = 'block';
            investMod.classList.add('hide-element');
            investMod.classList.remove('show-element');
            panMod.classList.add('show-element');
            const cart3 = panMod.querySelector('.addcartsub3');
            const strong3 = cart3.querySelector('strong');
            panMod.querySelector('.addcartsub3').innerHTML = '';
            panMod.querySelector('.addcartsub3').textContent = `${fundNameFromData}`;
            panMod.querySelector('.addcartsub3').append(strong3);
            const classAddv2 = mainmo.querySelector('.added-fund-cart');
            if (Array.from(classAddv2.classList).includes('hide-modal')) {
              classAddv2.classList.remove('hide-modal');
            }
            classAddv2.classList.remove('hide-modal');
            classAddv2.classList.add('modal-show');
          },
        }, 'Add to Cart'),
        button({ class: 'start-now modal-cta-btn' }, 'Invest Now'),
      ),
    ),
  );

  // Tooltip
  // const tooltip = div(
  //   { class: 'sip-tooltip hide' },
  //   div(
  //     { class: 'modal-btn tooltip-btn' },
  //     span(
  //       { class: 'close-btn' },
  //       img({ class: 'modal-btn-svg', src: closesrc, alt: 'cross' }),
  //     ),
  //   ),
  //   div(
  //     { class: 'tooltip-box' },
  //     p({ class: 'tooltip-note' }, 'Note'),
  //     div(
  //       { class: 'tooltip-info' },
  //       'We’ll debit your first SIP
  // installment today through your chosen payment mode,
  //  and all future installments will be automatically collected
  // via your registered Autopay or URN.',
  //     ),
  //   ),
  // );

  const modalContainer = div(
    { class: 'invest-now-container', id: 'invest-now-wrapper-flat' },
    closebtn,
    modal,
    // tooltip,
  );
  block.append(modalContainer);

  const classAdd = block.closest('.invest-now-homepage-container');
  if (Array.from(classAdd.classList).includes('hide-modal')) {
    classAdd.classList.remove('hide-modal');
  }
  if (classAdd) {
    classAdd.classList.add('modal-show');
    classAdd.classList.remove('hide-modal');
  }
  const mainmoin = block.closest('main');
  const mod4 = mainmoin.querySelector('.invest-now-homepage .modal-btn');
  hideFormsClick(mod4);
  modal.querySelector('.start-now').addEventListener('click', () => {
    const mainmo = block.closest('main');
    const investMod = mainmo.querySelector('.invest-now-homepage-container'); // .style.display = 'none';
    const panMod = mainmo.querySelector('.pan-details-modal'); // .style.display = 'block';
    investMod.classList.add('hide-element');
    investMod.classList.remove('show-element');
    panMod.classList.remove('hide-element');
    panMod.classList.add('show-element');
    try {
      existingUser(block);
    } catch (error) {
      console.log(error);
    }
    const classAddv2 = mainmo.querySelector('.pan-details-modal');
    if (Array.from(classAddv2.classList).includes('hide-modal')) {
      classAddv2.classList.remove('hide-modal');
    }
    classAddv2.classList.remove('hide-modal');
    classAddv2.classList.add('modal-show');

    // const classAddv3 = mainmo.querySelector('.otp-fdp');
    // if (Array.from(classAddv3.classList).includes('hide-modal')) {
    //   classAddv3.classList.remove('hide-modal');
    // }
    // classAddv3.classList.remove('hide-modal');
    // classAddv3.classList.add('modal-show');
  });

  // 1. Add open/close logic
  const lumpsumBtn = block.querySelector('.modal-btn-lumpsum');
  const sipBtn = block.querySelector('.modal-btn-sip');
  const sipFields = block.querySelector('.modal-input-fields');
  lumpsumBtn.addEventListener('click', () => {
    lumpsumBtn.classList.add('active');
    sipBtn.classList.remove('active');
    sipFields.classList.add('hidden');
    sipFields.classList.remove('flex');
  });

  sipBtn.addEventListener('click', () => {
    sipBtn.classList.add('active');
    lumpsumBtn.classList.remove('active');
    sipFields.classList.remove('hidden');
    sipFields.classList.add('flex');
  });

  // 2. Attach event listeners to all suggestion buttons
  const suggestionButtons = block.querySelectorAll('.suggestion-btn');
  const amountInput = block.querySelector('.amount-input');

  suggestionButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove .active from all buttons
      suggestionButtons.forEach((b) => b.classList.remove('active'));
      // Add .active to the clicked button
      btn.classList.add('active');
      const value = btn.textContent.split('₹')[1];
      amountInput.value = value;
      amountInput.dispatchEvent(new Event('input'));
    });
  });

  // --- 2. ADD this new helper function ---
  function syncSuggestionButtonsState() {
    const currentValue = amountInput.value;
    // eslint-disable-next-line no-unused-vars
    let hasActiveMatch = false;
    suggestionButtons.forEach((btn) => {
      // Check if the button's text matches the input's value
      if (currentValue === btn.textContent.split('₹')[1]) { // Added .trim() for robustness
        btn.classList.add('active');
        hasActiveMatch = true; // This reassignment is now valid
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // --- 3. MODIFY the `handleAmountInput` function to call the new sync function ---
  function handleAmountInput(e) {
    const inputVal = e.target;
    const rawValue = inputVal.value.replace(/[^0-9]/g, '');

    if (rawValue) {
      const formattedValue = parseInt(rawValue, 10).toLocaleString('en-IN');
      input.value = formattedValue;
    } else {
      input.value = '';
    }

    const amount = parseFloat(rawValue) || 0;
    const amountError = block.querySelector('.amount-error');

    if (amount < 500 && rawValue !== '') {
      amountError.classList.add('error-show');
    } else {
      amountError.classList.remove('error-show');
    }

    if (amount > 1000000) {
      input.value = input.value.slice(0, -1);
    }

    syncSuggestionButtonsState();
  }
  amountInput.addEventListener('input', handleAmountInput);

  // This sets the initial active button based on the default amount.
  syncSuggestionButtonsState();

  // 3. tooltip disaply
  // const sipNote = block.querySelector('.sip-note-highlight');
  // const sipText = block.querySelector('.sip-tooltip');
  // sipNote.addEventListener('click', () => {
  //   sipText.classList.add('show');
  //   sipText.classList.remove('hide');
  // });

  // const closeTooltip = block.querySelector('.tooltip-btn');
  // closeTooltip.addEventListener('click', () => {
  //   sipText.classList.add('hide');
  //   sipText.classList.remove('show');
  // });

  // 4. flat date picker
  // const calendarIcon = block.querySelector('.calendar-btn');
  const sipDateDisplay = block.querySelector('#custom-select-startDate .select-selected');
  const calendarContainer = block.querySelector('.invest-now-container');
  const selDate = block.querySelector('#custom-select-endDate .select-options');
  const finsel = selDate.querySelector('[data-value="Select Date"]');
  const dateSel = block.querySelector('#custom-select-endDate .select-selected');
  function flakterDate(datelement, displayDate) {
    // ADDED: A variable to store the user-selected date
    let originalSipDate = '';
    const fpInstance = window.flatpickr(datelement, {
      defaultDate: 'today',
      altInput: false,
      appendTo: calendarContainer,
      disableMobile: true,
      // FIX 1: Added a safety check to prevent the crash on mobile.
      onReady(_, __, fp) {
        if (fp.calendarContainer) {
          fp.calendarContainer.removeAttribute('style');
        } else {
          console.log('somehting is wrong');
        }
      },
      onChange(selectedDates) { // (selectedDates, dateStr, instance) {
        const selectedDate = selectedDates[0];
        const day = selectedDate.getDate();
        const month = selectedDate.toLocaleString('default', { month: 'short' });
        const year = selectedDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;

        sipDateDisplay.textContent = formattedDate;
        console.log(displayDate);
        // const optionval =
        // block.querySelector('#custom-select-frequency .select-selected').textContent;
        // flakterDateV2(finsel, dateSel, optionval);
        // Update the stored date whenever the user picks a new one
        originalSipDate = formattedDate;
      },
      position: (self, node) => {
        const top = self.element.offsetTop + self.element.offsetHeight + 8;
        const left = self.element.offsetLeft;

        node.style.top = `${top}px`;
        node.style.left = `${left}px`;
      },
    });
    console.log(fpInstance);
    // ADDED: Logic for the 'Start Today' checkbox
    const startTodayCheckbox = block.querySelector('.start-today-checkbox');

    // Helper function to get today's date in the correct format

    // Initialize the originalSipDate with the value set by flatpickr on load
    originalSipDate = sipDateDisplay.textContent;

    startTodayCheckbox.addEventListener('change', () => {
      if (startTodayCheckbox.checked) {
        // If checked, display today's date
        sipDateDisplay.textContent = getTodaysDateFormatted();
      } else {
        // If unchecked, revert to the user's selected date
        sipDateDisplay.textContent = originalSipDate;
      }
    });
  }

  function flakterDateV2(datelement, displayDate, dropdownVal) {
    let disableRule = [];
    const defaultDate = new Date(); // Initialize with today

    // Use a single 'today' constant for all calculations
    const today = new Date();
    // Set time to 0 to avoid time-related comparison issues
    today.setHours(0, 0, 0, 0);

    switch (dropdownVal) {
      case 'Monthly': {
        const recurringDay = today.getDate();
        defaultDate.setMonth(today.getMonth() + 1);

        const year = defaultDate.getFullYear();
        const nextMonth = defaultDate.getMonth() + 1;
        const lastDayOfNextMonth = new Date(year, nextMonth, 0).getDate();
        const targetDay = Math.min(recurringDay, lastDayOfNextMonth);
        defaultDate.setDate(targetDay);

        disableRule = [
          (date) => {
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            const targetDayInMonth = Math.min(recurringDay, lastDayOfMonth);
            return date.getDate() !== targetDayInMonth;
          },
        ];
        break;
      }
      case 'Annual': {
        const recurringDay = today.getDate();
        const recurringMonth = today.getMonth();
        defaultDate.setFullYear(today.getFullYear() + 1);

        disableRule = [
          (date) => date.getDate() !== recurringDay || date.getMonth() !== recurringMonth,
        ];
        break;
      }
      case 'Weekly': {
        const recurringDayOfWeek = today.getDay();
        defaultDate.setDate(today.getDate() + 7);

        disableRule = [
          (date) => date.getDay() !== recurringDayOfWeek,
        ];
        break;
      }
      case 'Fortnightly': { // <-- CORRECTED LOGIC
        const startTime = today.getTime();
        defaultDate.setDate(today.getDate() + 14);

        disableRule = [
          (date) => {
            // Calculate difference in whole days for reliability
            const diffDays = Math.round((date.getTime() - startTime) / (1000 * 60 * 60 * 24));
            return diffDays % 14 !== 0;
          },
        ];
        break;
      }
      case 'Quarterly': {
        const startDay = today.getDate();
        const startMonth = today.getMonth();
        defaultDate.setMonth(today.getMonth() + 3);

        disableRule = [
          (date) => {
            const yearDiffInMonths = (date.getFullYear() - today.getFullYear()) * 12;
            const monthDiffInMonths = date.getMonth() - startMonth;
            const monthDiff = yearDiffInMonths + monthDiffInMonths;
            const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
            const targetDay = Math.min(startDay, lastDayOfMonth);
            return date.getDate() !== targetDay || monthDiff % 3 !== 0;
          },
        ];
        break;
      }
      case 'Daily': { // <-- CORRECTED LOGIC
        defaultDate.setDate(today.getDate() + 1);
        // No custom disable rules are needed for 'Daily'. 'minDate' handles it.
        disableRule = [];
        break;
      }
      default:
        // Default case with no rules
        disableRule = [];
        break;
    }

    const fpInstance = window.flatpickr(datelement, {
      defaultDate,
      altInput: false,
      appendTo: calendarContainer,
      disableMobile: true,
      disable: disableRule,
      minDate: today, // Consistently prevent past dates for all cases

      onReady(_, __, fp) {
        if (fp.calendarContainer) {
          fp.calendarContainer.removeAttribute('style');
        }
      },
      onChange(selectedDates) {
        if (!selectedDates[0]) return;
        const selectedDate = selectedDates[0];
        const day = selectedDate.getDate();
        const month = selectedDate.toLocaleString('default', { month: 'short' });
        const year = selectedDate.getFullYear();
        const formattedDate = `${day} ${month} ${year}`;
        displayDate.textContent = formattedDate;
        // originalSipDate = formattedDate;
      },
    });
    console.log(fpInstance);
    // Manually set the initial display text after initialization
    if (defaultDate) {
      const day = defaultDate.getDate();
      const month = defaultDate.toLocaleString('default', { month: 'short' });
      const year = defaultDate.getFullYear();
      displayDate.textContent = `${day} ${month} ${year}`;
    }
  }
  // flakterDate(calendarIcon, sipDateDisplay); //temp
  // flakterDateV2(finsel, dateSel, 'Monthly');
  // --- CORRECTED CUSTOM DROPDOWN LOGIC ---
  block.querySelectorAll('.custom-select-wrapper').forEach((wrapper) => {
    const selected = wrapper.querySelector('.select-selected');
    const options = wrapper.querySelector('.select-options');
    const hiddenInput = wrapper.querySelector('input[type="hidden"]');

    selected.addEventListener('click', (e) => {
      e.stopPropagation();
      block
        .querySelectorAll('.custom-select-wrapper.open')
        .forEach((openWrapper) => {
          if (openWrapper !== wrapper) {
            openWrapper.classList.remove('open');
          }
        });
      // Toggle the current one
      wrapper.classList.toggle('open');
    });

    options.querySelectorAll('li').forEach((option) => {
      option.addEventListener('click', () => {
        selected.textContent = option.textContent;
        hiddenInput.value = option.getAttribute('data-value');
        wrapper.classList.remove('open');
        if (selected.closest('#custom-select-startDate')) {
          if (block.querySelectorAll('.flatpickr-calendar').length === 2) {
            block.querySelectorAll('.flatpickr-calendar')[1].remove();
          }
          const sel = selected.closest('#custom-select-startDate');
          const paraText = sel.querySelector('.select-selected');
          const selDte = block.querySelector('#custom-select-endDate .select-options');
          const fisel = selDte.querySelector('[data-value="Select Date"]');
          flakterDate(fisel, paraText.textContent);
          const attr = Array.from(block.querySelectorAll('.flatpickr-calendar'));
          attr[0].classList.add('open');
        }
        if (selected.closest('#custom-select-frequency')) {
          if (block.querySelectorAll('.flatpickr-calendar').length === 2) {
            block.querySelectorAll('.flatpickr-calendar')[1].remove();
          }
          flakterDateV2(finsel, dateSel, option.textContent);
          const attr = Array.from(block.querySelectorAll('.flatpickr-calendar'));
          attr[0].classList.add('open');
        }
        if (selected.closest('#custom-select-endDate')) {
          if (block.querySelectorAll('.flatpickr-calendar').length === 2) {
            block.querySelectorAll('.flatpickr-calendar')[1].remove();
          }
          const parSel = selected.closest('.date-drop-down');
          const paraText = parSel.querySelector('#custom-select-frequency .select-selected');
          flakterDateV2(finsel, dateSel, paraText.textContent);
          const attr = Array.from(block.querySelectorAll('.flatpickr-calendar'));
          attr[0].classList.add('open');
        }
      });
    });
  });

  // Add a listener to close dropdowns when clicking anywhere else
  block.addEventListener('click', () => {
    // const flpcand = block.querySelector('.flatpickr-calendar');
    block
      .querySelectorAll('.custom-select-wrapper.open')
      .forEach((openWrapper) => {
        openWrapper.classList.remove('open');
      });
    // if (flpcand
    //   && !event.target.contains(flpcand)
    //   && Array.from(flpcand.classList).includes('open')) {
    //   flpcand.classList.remove('open');
    // }
  });

  if (blkcompo) {
    blkcompo.style.display = 'none';
  }
  if (stepblk !== null) {
    const drpsel = stepblk.querySelector('.dropdown-wrap .selected-txt');
    const drpdown = stepblk.querySelector('.dropdown-wrap .dropdown-list');
    drpsel.addEventListener('click', () => {
      const className = Array.from(drpsel.parentElement.classList);
      const classwrap = className.includes('dropdown-active');
      if (classwrap) {
        drpsel.parentElement.classList.remove('dropdown-active');
      } else {
        drpsel.parentElement.classList.add('dropdown-active');
      }
    });
    drpdown.addEventListener('click', (event) => {
      const { target } = event;
      drpsel.textContent = '';
      drpsel.textContent = target.textContent;
      drpsel.parentElement.classList.remove('dropdown-active');
    });
    document.addEventListener('click', (event) => {
      if (!stepblk.querySelector('.dropdown-wrap').contains(event.target)) {
        stepblk.querySelector('.dropdown-wrap')
          .classList.remove('dropdown-active');
      }
      if (!Array.from(event.target.classList).includes('date-drop-down')
        && !block.querySelector('.date-drop-down').contains(event.target)) {
        block.querySelector('.flatpickr-calendar').classList.remove('open');
      }
    });
  }
  return block;
}
