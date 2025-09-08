import {
    div,
    p,
    img,
    table,
    tbody,
    thead,
    tr,
    th,
    td,
} from '../../scripts/dom-helpers.js';

import objData from '../../scripts/dataCfObj.js';
import dataMapMoObj from '../../scripts/constant.js';

export default async function decorate(block) {

    let fundManagers;
    let agentData;
    if (dataMapMoObj.fundManagerDetails.length !== 0) {
        fundManagers = dataMapMoObj.fundManagerDetails;
    } else {
        fundManagers = objData[0].fundManager;
    }
    console.log(fundManagers);
    let selectedAgent = localStorage.getItem('FM-AgentName');

    fundManagers.forEach(function (e) {
        if (selectedAgent === e.fundManagerName.split(' ').join('')) {
            agentData = e;
        }
    })

    const portfolioBlock = div(
        { class: 'portfolio-composition' },
        div(
            { class: 'fm-details' },
            img({ src: `/icons/fund-managers/${agentData.fundManagerName.toLowerCase().replace(/\s+/g, '-')}.svg`, alt: 'managerpic', class: 'fm-img' }),
            div(
                { class: 'fm-dealer-details' },
                p(agentData.fundManagerName),
                p(agentData.designation)
            )
        ),
        div({ class: 'fm-param' },),
        div(
            { class: 'fm-scheme-table' },
            table(
                thead(
                    tr(
                        th({ "rowspan": '2' }, 'Scheme name'),
                        th({ "colspan": '2' }, '1Y'),
                        th({ "colspan": '2' }, '3Y'),
                        th({ "colspan": '2' }, '5Y')
                    ),
                    tr(
                        th('Scheme'),
                        th('Benchmark'),
                        th('Scheme'),
                        th('Benchmark'),
                        th('Scheme'),
                        th('Benchmark')
                    )
                ),
                tbody(
                    tr(
                        td('Motilal Oswal Large and Midcap Fund'),
                        td('24.02%'),
                        td('9.86%'),
                        td('32.75%'),
                        td('21.43%'),
                        td('33.64%'),
                        td('28.31%')
                    ),
                    tr(
                        td('Motilal Oswal Flexi Cap Fund'),
                        td('20.32%'),
                        td('9.25%'),
                        td('25.66%'),
                        td('18.52%'),
                        td('24.08%'),
                        td('25.17%')
                    ),
                    tr(
                        td('Motilal Oswal Large Cap Fund'),
                        td('26.85%'),
                        td('9.20%'),
                        td('32.75%'),
                        td('21.43%'),
                        td('33.64%'),
                        td('28.31%')
                    ),
                    tr(
                        td('Motilal Oswal Midcap Fund'),
                        td('20.91%'),
                        td('10.20%'),
                        td('33.08%'),
                        td('26.69%'),
                        td('39.55%'),
                        td('34.16%')
                    )
                )
            )
        )
    )

    block.innerHTML = '';
    portfolioBlock.querySelector('.fm-param').innerHTML = agentData.description;
    block.append(portfolioBlock)

}