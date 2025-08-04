/* eslint-disable */
import dataCfObj from "../../scripts/dataCfObj.js";
import { div, input, label, span, p, button, ul,li } from "../../scripts/dom-helpers.js";
import dataMapMoObj from "../../scripts/constant.js";
import fundcardblock from "../fund-card/fund-card.js";
import listviewblock from '../list-view-card/list-view-card.js'
export default function decorate(block) {

  Array.from(block.closest('.section').children).forEach((el, index) => {
    el.classList.add("item"+(index+1))
  })
  Array.from(block.children).forEach((el, index) => {
    el.classList.add("block-item" + (index + 1));
    Array.from(el.children).forEach((elsub, index) => {
      elsub.classList.add("block-subitem" + (index + 1));
      Array.from(elsub.children).forEach((finelsub, index) => {
        finelsub.classList.add("block-subitem-finelsub" + (index + 1));
      });
    });
  });

  dataMapMoObj["data"] = dataFilterfun(dataCfObj);
  dataMapMoObj["funddata"] = dataCfObj.slice(0,9);
  let divfund = div(
    { class: "blockwrapper" },
    div(
      { class: "upper-container" },
      div(
        { class: "fundcontainer" },
        block.querySelector(".block-subitem1"),
        div(
          { class: "search-trending-wrapper" },
          div(
            { class: "search-input" },
            input({
              class: "search",
              placeholder: block
                .querySelector(".block-subitem2 .block-subitem-finelsub1")
                .textContent.trim(),
            }),
            ul({class:"list-search", style:"display:none"},
              ...dataMapMoObj["funddata"].map((el)=>{
                return li({class:"list-fund-name",schcode:el.schcode},el.schDetail.schemeName)
              })
            )
          ),
          div(
            { class: "watchlist" },
            div(
              { class: "staricon" },
              block.querySelector(
                ".block-subitem2 .block-subitem-finelsub2 span"
              ),
              block.querySelector(
                ".block-subitem2 .block-subitem-finelsub3 span"
              )
            ),
            div(
              { class: "watchlisttext" },
              span(
                block
                  .querySelector(".block-subitem2 .block-subitem-finelsub3")
                  .textContent.trim()
              )
            )
          ),
          div(
            { class: "trending-container" },
            div(
              { class: "trendinglabel" },
              p(
                block.querySelector(
                  ".block-subitem2 .block-subitem-finelsub4 span"
                )
              ),
              label(
                block
                  .querySelector(".block-subitem2 .block-subitem-finelsub5")
                  .textContent.trim()
              )
            ),
            div(
              { class: "trendingmostlist" },
              block.querySelector(".block-subitem2 .block-subitem-finelsub6")
            )
          )
        )
      )
    ),
    div(
      { class: "filter-cards" },
      div(
        { class: "left-container" },
        div(
          { class: "FundCategory-container" },
          div(
            { class: "filter-sort-container" },
            div(
              { class: "filter-wrapper" },
              block.querySelector(".block-item2 .block-subitem-finelsub1 span"),
              label(
                block
                  .querySelector(".block-item2 .block-subitem-finelsub2")
                  .textContent.trim()
              )
            ),
            div(
              { class: "sort-wrapper" },
              block.querySelector(".block-item2 .block-subitem-finelsub3 span"),
              label(
                block
                  .querySelector(".block-item2 .block-subitem-finelsub4")
                  .textContent.trim()
              )
            )
          ),
          div(
            { class: "filter-overlay" },
            div(
              { class: "filter-container" },
              div(
                { class: "clearall-wrapper" },
                span("Filters"),
                button({ class: "clearall-btn" }, "Clear All")
              ),
              div(
                { class: "filter-list-wrapper" },
                // div({class:"fundcategory-label"},
                //   span(block.querySelector(".block-subitem1 .block-subitem-finelsub6").textContent.trim())
                // ),
                ...dataMapMoObj.data.fundCategory.map((element, index) => {
                  let indexeq = index === 0 ? "indaneqsub" : "";
                  if (
                    capitalizeEachWord(
                      Object.keys(element)[0].replaceAll("-", " ")
                    ) === "Indian Equity"
                  ) {
                    dataMapMoObj[index + "ArrayDoc"] = div(
                      { class: "Indian-Equity-container" },
                      ...dataMapMoObj.data.fundCategory[
                        dataMapMoObj.data.fundCategory.length - 1
                      ]["indianEquitySub"].map((elme, ind) => {
                        let sublabel = Object.keys(elme)[0]
                          .split("-")[1]
                          .trim();
                        return div(
                          { class: "checkbox-label-container" },
                          input({
                            class: "categorey-direct",
                            type: "checkbox",
                            id: "ind" + (ind + 1),
                            dataattr: elme[Object.keys(elme)].join("-"),
                            onclick: (event) => {
                              checkfilter(block);

                              // viewFunction(block);
                            },
                          }),
                          label({ for: "ind" + (ind + 1) }, sublabel)
                        );
                      })
                    );
                  }
                  return Object.keys(element)[0] !== "indianEquitySub"
                    ? div(
                        { class: "checkbox-label-container " + indexeq },
                        input({
                          class: "categorey-direct",
                          type: "checkbox",
                          id: "index" + (index + 1),
                          dataattr: element[Object.keys(element)[0]].join("-"),
                          onclick: (event) => {
                            let fundScheme = event.target
                              .getAttribute("dataattr")
                              .split("-");
                            // viewFunction(block);
                            if (event.target.closest(".indaneqsub")) {
                              let el = event.target.closest(".indaneqsub");
                              if (el.querySelector(".innerIndianEquity")) {
                                el.querySelectorAll(
                                  ".innerIndianEquity input"
                                ).forEach((elemsub) => {
                                  elemsub.checked =
                                    el.querySelector("input").checked;
                                });
                              }
                            }
                            checkfilter(block);
                          },
                        }),
                        label(
                          { for: "index" + (index + 1) },
                          capitalizeEachWord(
                            Object.keys(element)[0].replaceAll("-", " ")
                          ),
                          span(
                            { class: "fund-length" },
                            "(" + element[Object.keys(element)[0]].length + ")"
                          )
                        ),
                        capitalizeEachWord(
                          Object.keys(element)[0].replaceAll("-", " ")
                        ) === "Indian Equity"
                          ? div(
                              { class: "innerIndianEquity" },
                              dataMapMoObj[index + "ArrayDoc"]
                            )
                          : ""
                      )
                    : "";
                }),
                ...dataMapMoObj.data.fundType.map((element, index) => {
                  return div(
                    { class: "checkbox-label-container" },
                    input({
                      class: "categorey-direct",
                      type: "checkbox",
                      id: "fundtype" + (index + 1),
                      dataattr: element[Object.keys(element)[0]].join("-"),
                      onclick: (event) => {
                        checkfilter(block);
                        // viewFunction(block);
                      },
                    }),
                    label(
                      { for: "fundtype" + (index + 1) },
                      capitalizeEachWord(
                        Object.keys(element)[0].replaceAll("-", " ")
                      ),
                      span("(" + element[Object.keys(element)[0]].length + ")")
                    )
                  );
                })
              ),
              div(
                { class: "apply-wrapper" },
                button({ class: "close-btn" }, "Close"),
                button({ class: "apply-btn" }, "Apply")
              )
            )
          ),
          div(
            { class: "sort-overlay" },
            div(
              { class: "sort-container" },
              div(
                { class: "sort-label" },
                // span(label(
                //   block.querySelector(".block-item3 .block-subitem-finelsub1").textContent.trim()
                // ))
                span(
                  block
                    .querySelector(".block-item3 .block-subitem-finelsub1")
                    .textContent.trim()
                )
              ),
              div(
                { class: "arrange-returns" },
                div(
                  { class: "arrange-container" },
                  span("Arrange by"),
                  div(
                    { class: "radio-label-container" },
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "popular" }),
                      label({ for: "popular" }, "Popular")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "lastnav" }),
                      label({ for: "lastnav" }, "Latest NAV")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "lastnavone" }),
                      label({ for: "lastnavone" }, "Latest by 1 day")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "oldnew" }),
                      label({ for: "oldnew" }, "Oldest to Newest")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "newold" }),
                      label({ for: "newold" }, "Newest to Oldest")
                    )
                  )
                ),
                div(
                  { class: "return-container" },
                  span("Returns Period"),
                  div(
                    { class: "radio-label-container" },
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "sinceinp" }),
                      label({ for: "sinceinp" }, "Since Inception")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "oneyear" }),
                      label({ for: "oneyear" }, "1 year")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "threeyear" }),
                      label({ for: "threeyear" }, "3 years")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "fiveyear" }),
                      label({ for: "fiveyear" }, "5 years")
                    ),
                    div(
                      { class: "radio-label" },
                      input({ type: "radio", id: "tenyear" }),
                      label({ for: "tenyear" }, "10 years")
                    )
                  )
                )
              ),
              div(
                { class: "close-apply-btn" },
                button("close"),
                button("Apply")
              )
            )
          )
        )
      ),
      div(
        { class: "right-container" },
        div(
          { class: "sort-pop-container" },
          div(
            { class: "sort-popular" },
            div(
              { class: "sort-container" },
              label(
                block
                  .querySelector(".block-item3 .block-subitem-finelsub1")
                  .textContent.trim()
              )
            ),
            div(
              { class: "popular-container" },
              label(
                block
                  .querySelector(".block-item3 .block-subitem-finelsub2")
                  .textContent.trim()
              )
            )
          ),
          div(
            { class: "group-view-container" },
            div(
              { class: "view-container" },
              div(
                {
                  class: "squareby-container grid-view-active",
                  onclick: (event) => {
                    event.currentTarget.classList.add("grid-view-active");
                    event.currentTarget
                      .closest(".view-container")
                      .querySelector(".listby-container")
                      .classList.remove("list-view-active");
                    event.currentTarget
                      .closest(".right-container")
                      .querySelector(".list-view-header").style.display =
                      "none";
                    viewFunction(block);
                  },
                },
                block.querySelector(".block-item3 .block-subitem-finelsub3")
              ),
              div(
                {
                  class: "listby-container",
                  onclick: (event) => {
                    event.currentTarget.classList.add("list-view-active");
                    event.currentTarget
                      .closest(".view-container")
                      .querySelector(".squareby-container")
                      .classList.remove("grid-view-active");
                    event.currentTarget
                      .closest(".right-container")
                      .querySelector(".list-view-header").style.display =
                      "block";
                    viewFunction(block);
                  },
                },
                block.querySelector(".block-item3 .block-subitem-finelsub4")
              )
            ),
            div(
              { class: "togglebtn" },
              p("Direct"),
              div(
                { class: "fund-toggle-wrap" },
                input({
                  type: "checkbox",
                  id: "toggle",
                  onclick: (event) => {
                    checkfilter(block);
                  },
                }),
                label({ class: "fund-toggle", for: "toggle" })
              ),
              p("Regular")
            ),
            div({ class: "compare-btn" }, button("Compare"))
          )
        ),
        div(
          { class: "cards-container" },
          ...dataMapMoObj["funddata"].map((el) => {
            return fundcardblock(el);
          })
        ),
        div(
          { class: "list-view-header", style: "display:none" },
          div(
            { class: "list-header" },
            block.closest(".section").querySelector(".item2")
          ),
          div({ class: "list-container" })
        )
      )
    )
  );
  block.innerHTML = "";
  block.append(divfund);
  
  //added wrapper
  let divmop = div({class:"indanequity-wrapper"},
    block.querySelector(".indaneqsub #index1"),
    block.querySelector(".indaneqsub [for='index1']"),
  )
  let divinner = block.querySelector(".indaneqsub .innerIndianEquity");
  block.querySelector(".indaneqsub").innerHTML = "";
  block.querySelector(".indaneqsub").append(divmop,divinner)
  
}

function dataFilterfun(param) {
  let dataMapObj = {};
  dataMapObj["schemeName"] = [];
  dataMapObj["fundCategory"] = [
    { "indian-equity": [] },
    { "international-equity": [] },
    { "hybrid-&-balanced": [] },
    { "multi-asset": [] },
    { commodity: [] },
    { "debt-&-liquid": [] },
    {
      indianEquitySub: [
        { "Indian Equity - Large and Mid Cap": [] },
        { "Indian Equity - Large Cap": [] },
        { "Indian Equity - Mid Cap": [] },
        { "Indian Equity - Small Cap": [] },
        { "Indian Equity - Sector": [] },
        { "Indian Equity - Factor": [] },
        { "Indian Equity - Tax Saver (ELSS)": [] },
        { "Indian Equity - Multi Cap": [] },
      ],
    },
  ];
  dataMapObj["fundType"] = [{ active: [] }, { "index-funds": [] }, { etf: [] }];
  dataMapObj["sort"] = [
    {
      ListDropdown: [
        { text: "Popular", value: "inception_Ret" },
        { text: "1 Year Returns", value: "oneYear_Ret" },
        { text: "3 Year Returns", value: "threeYear_Ret" },
        { text: "5 Year Returns", value: "fiveYear_Ret" },
        { text: "7 Year Returns", value: "sevenYear_Ret" },
        { text: "10 Year Returns", value: "tenYear_Ret" },
      ],
      inception_Ret: [],
      oneYear_Ret: [],
      threeYear_Ret: [],
      fiveYear_Ret: [],
      sevenYear_Ret: [],
      tenYear_Ret: [],
    },
  ];

  for (let name of param) {
    if (
      [...name.fundsTaggingSection].includes("motilal-oswal:indian-equity-")
    ) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["indian-equity"]) {
          element["indian-equity"].push(name.schcode);
        }
      });
    }
    if (
      [...name.fundsTaggingSection].includes("motilal-oswal:hybrid-&-balanced")
    ) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["hybrid-&-balanced"]) {
          element["hybrid-&-balanced"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:debt-&-liquid")) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["debt-&-liquid"]) {
          element["debt-&-liquid"].push(name.schcode);
        }
      });
    }
    if (
      [...name.fundsTaggingSection].includes(
        "motilal-oswal:international-equity"
      )
    ) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["international-equity"]) {
          element["international-equity"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:multi-asset")) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["multi-asset"]) {
          element["multi-asset"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:commodity")) {
      dataMapObj["fundCategory"].forEach((element) => {
        if (element["commodity"]) {
          element["commodity"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:index-funds")) {
      dataMapObj["fundType"].forEach((element) => {
        if (element["index-funds"]) {
          element["index-funds"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:active")) {
      dataMapObj["fundType"].forEach((element) => {
        if (element["active"]) {
          element["active"].push(name.schcode);
        }
      });
    }
    if ([...name.fundsTaggingSection].includes("motilal-oswal:etf")) {
      dataMapObj["fundType"].forEach((element) => {
        if (element["etf"]) {
          element["etf"].push(name.schcode);
        }
      });
    }
    if (name.fundSubCategorisation) {
      dataMapObj["fundCategory"][dataMapObj["fundCategory"].length - 1][
        "indianEquitySub"
      ].forEach((elementsub, index) => {
        if (elementsub[name.fundSubCategorisation]) {
          elementsub[name.fundSubCategorisation].push(name.schcode);
        }
      });
    }
    for (const element of name.returns) {
      let key = Object.keys(element);
      if (
        [...key].includes("inception_Ret") &&
        !dataMapObj["sort"][0]["inception_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["inception_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("oneYear_Ret") &&
        !dataMapObj["sort"][0]["oneYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["oneYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("threeYear_Ret") &&
        !dataMapObj["sort"][0]["threeYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["threeYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("fiveYear_Ret") &&
        !dataMapObj["sort"][0]["fiveYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["fiveYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("sevenYear_Ret") &&
        !dataMapObj["sort"][0]["sevenYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["sevenYear_Ret"].push(name.schcode);
      }
      if (
        [...key].includes("tenYear_Ret") &&
        !dataMapObj["sort"][0]["tenYear_Ret"].includes(name.schcode)
      ) {
        dataMapObj["sort"][0]["tenYear_Ret"].push(name.schcode);
      }
    }
    dataMapObj["schemeName"].push({
      schemeName: name.schDetail.schemeName,
      schcode: name.schcode,
    });
  }
  return dataMapObj;
}
function capitalizeEachWord(sentence) {
  if (sentence.includes("etf")) {
    return sentence.toUpperCase() + "'s";
  }
  return sentence.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

function viewFunction(param) {
  param.querySelector(".list-container").innerHTML = ""
  param.querySelector(".cards-container").innerHTML = ""
  if (Array.from(param.querySelector(".listby-container").classList).includes("list-view-active")) {
    dataMapMoObj["funddata"].forEach((el)=>{
      param.querySelector(".list-container").append(listviewblock(el));
    })    
  }else{
    dataMapMoObj["funddata"].forEach((el)=>{
      param.querySelector(".cards-container").append(fundcardblock(el));
    })
  }
}

function checkfilter(block){
  let tempData = [];
  Array.from(block.querySelector(".filter-list-wrapper").children).forEach((el)=>{
    if (el.closest(".checkbox-label-container").querySelector(".innerIndianEquity")) {
        el.closest(".checkbox-label-container").querySelectorAll(".innerIndianEquity input").forEach((elemsub)=>{
          if (elemsub.checked && !tempData.includes(elemsub.getAttribute('dataattr'))) {
            elemsub.getAttribute('dataattr').split("-").forEach((eldata)=>{
            if (!tempData.includes(eldata)) {
                  tempData.push(eldata)
              }
            })
          }
        })
    }
    if(el.querySelector("input").checked && el.querySelector("input").getAttribute("id") !== "index1"){
      el.querySelector("input").getAttribute('dataattr').split("-").forEach((eldata)=>{
      if (!tempData.includes(eldata)) {
            tempData.push(eldata)
        }
      })
     }
  })
  dataMapMoObj["funddata"] = []
  dataMapMoObj["funddata"] = dataCfObj.filter((el,index)=>{
    if (tempData.length > 0) {
      if (tempData.includes(el.schcode)) {
        return el
      }
    }else{
      if (index < 9) {
        return el
      }
    }
  })
  viewFunction(block)
}