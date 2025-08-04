/* eslint-disable */
import {
  button,
  div,
  label,
  option,
  select,
  span,
  ul,
  li,
  h2,
  p,
  img,
} from "../../scripts/dom-helpers.js";
import dataCfObj from "../../scripts/dataCfObj.js";
import dataMapMoObj from "../../scripts/constant.js";
export default function decorate(block) {
  Array.from(block.children).forEach((element,index) => {
    element.classList.add("compound-item"+(index+1));
    Array.from(element.children).forEach((subelement,index) => {
      subelement.classList.add("compound-sub-item"+(index+1));
      Array.from(subelement.children).forEach((innerelement,index) => {
        innerelement.classList.add("compound-inner-item"+(index+1));
      });
    });
  });

  Array.from(block.closest(".fdp-card-container").children).forEach((el,index)=>{
    el.classList.add("item"+(index+1));
  })
  let cfObj = dataCfObj.slice(0, 1);
  const fundsTaggingSection = cfObj[0].fundsTaggingSection.slice(0, 2);
  let finPlangrp = [];
  const tempReturns = [];
  cfObj[0].returns.forEach((ret, jind) => {
    if (jind === 0) {
      [...Object.keys(ret)].forEach((key) => {
        if (dataMapMoObj.ObjTemp[key]) {
          tempReturns.push(dataMapMoObj.ObjTemp[key]);
        }
      });
    }
    finPlangrp.push(ret.plancode + ret.optioncode);
  });

  const DirectPlanlistArr = cfObj[0].planList.filter((el) => {
    if (el.planName === "Regular" && finPlangrp.includes(el.groupedCode)) {
      return el;
    }
  });
  let classplan =
    DirectPlanlistArr.length !== 0 && tempReturns.length !== 0
      ? ""
      : " not-provided";
  let classdropdown = DirectPlanlistArr.length !== 0 ? "flex" : "none";

  const cardContainer = div(
    { class: "card-container" },
    div(
      { class: "card-wrapper" },
      div(
        { class: "upperdiv" },
        div(
          { class: "fundname-dropdown" },
          div({ class: "fundname" }, h2(cfObj[0].schDetail.schemeName)),
          div(
            { class: "card-category" },
            div(
              { class: "fund-tagging" },
              ul(
                { class: "fundtagging-list" },
                ...fundsTaggingSection.map((eloption) =>
                  li(
                    eloption
                      .replaceAll("motilal-oswal:", "")
                      .replaceAll("-", " ")
                      .toUpperCase()
                  )
                )
              )
            ),
            div(
              {
                class: "planlist-dropdown",
                style: "display:" + classdropdown,
              },
              select(
                {
                  onchange: (event) => {
                    planListEvent(event, block);
                  },
                  "aria-label": "Select Investment Plan",
                },
                ...DirectPlanlistArr.map((el) =>
                  option(
                    {
                      value: el.groupedCode,
                    },
                    el.optionName
                  )
                )
              )
            )
          )
        ),
        div({ class: "discription" },
            block.querySelector(".compound-item1 .compound-inner-item1")?.textContent
        )
      ),
      div({ class: "middlediv" }
      ),
      div({ class: "lowerdiv" },
      )
    )
  );

    block.innerHTML = "";
    block.append(cardContainer)
}
