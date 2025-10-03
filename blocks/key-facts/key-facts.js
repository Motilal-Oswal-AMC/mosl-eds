/*    */
import dataCfObj from '../../scripts/dataCfObj.js';
import {
  div,
  span,
  li,
  p,
  ul,
} from '../../scripts/dom-helpers.js';

export default function decorate(block) {
  Array.from(block.children).forEach((el, index) => {
    el.classList.add(`block-item${index + 1}`);
    Array.from(el.children).forEach((elsub, ind) => {
      elsub.classList.add(`block-subitem${ind + 1}`);
      Array.from(elsub.children).forEach((finelsub, sub) => {
        finelsub.classList.add(`block-subitem-finelsub${sub + 1}`);
      });
    });
  });

  const planCode = localStorage.getItem('planCode') || 'Direct:LM';
  const [planFlow, planslabel] = planCode.split(':');
  const planObj = dataCfObj.cfDataObjs.filter((el) => planslabel === el.schcode);
  const data = planObj;
  const DirectPlanlistArr = planObj[0].planList.filter(
    (el) => el.planName === planFlow,
  );
  function dateFormat(date) {
    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    return formattedDate;
  }
  const keyFactsSection = div(
    { class: 'key-facts-section' },

    div(
      { class: 'investment-objective' },
      p(block.querySelector('.block-subitem-finelsub1')),
      p(
        { class: 'investment-discripstion' },
        'The fund aims for medium to long-term capital appreciation by primarily investing in Large and Midcap stocks, though this objective... ',
      ),
    ),
    div(
      { class: 'key-facts-amounts' },
      div(
        { class: 'minimum-amount' },
        div(
          { class: 'Application-Amount' },
          p(
            { class: 'key-facts-amounts-title' },
            block.querySelector('.block-subitem-finelsub2'),
          ),
          p(
            { class: 'key-facts-amounts-sub' },
            '₹500/- and in multiples of ₹1/- thereafter',
          ),
        ),
        div(
          { class: 'Redemption-Amount' },
          p(
            { class: 'key-facts-amounts-title' },
            block.querySelector('.block-subitem-finelsub3'),
          ),
          p(
            { class: 'key-facts-amounts-sub' },
            '₹500/- then ₹1/- increments, up to account balance',
          ),
        ),
      ),
      div(
        { class: 'key-plans' },
        div(
          { class: 'aum-benchmark' },
          div(
            { class: 'aum-groups' },
            div(
              { class: 'aum' },
              p(block.querySelector('.block-subitem-finelsub4')),
              p(
                `₹${data[0].aum[0].latestAum}`,
                span(`(as on ${dateFormat(data[0].aum[0].latestAumAsOnDt)})`),
              ),
            ),
            div(
              { class: 'portfolio' },
              p(block.querySelector('.block-subitem-finelsub1')),
              p(data[0].portfolioTurnoverRatio),
            ),
            div(
              { class: 'Plans' },
              p(
                block.querySelector('.block-subitem2 .block-subitem-finelsub2'),
              ),
              p(DirectPlanlistArr[0].planName),
            ),
            div(
              { class: 'options' },
              p(
                block.querySelector('.block-subitem2 .block-subitem-finelsub3'),
              ),
              p(DirectPlanlistArr[0].optionName),
            ),
          ),
          div(
            { class: 'benchmark-groups' },
            div(
              { class: 'Benchmark' },
              p(
                block.querySelector('.block-subitem2 .block-subitem-finelsub4'),
              ),
              p(data[0].benchmark),
            ),
            div(
              { class: 'expense-ratio' },
              p(
                block.querySelector('.block-subitem3 .block-subitem-finelsub1'),
              ),
              p('Nil'), // not found
            ),
            div(
              { class: 'Inception-date' },
              p(
                block.querySelector('.block-subitem3 .block-subitem-finelsub2'),
              ),
              p(data[0].benchmarkreturns[0].latNavDate),
            ),
            div(
              { class: 'entry-load' },
              p(
                block.querySelector('.block-subitem3 .block-subitem-finelsub3'),
              ),
              p({ class: 'entry-load-detail' }, 'Nil'),
            ),
          ),
        ),
        div(
          { class: 'load-policy' }, // not found
          p(
            { class: 'load-policy-para' },
            block.querySelector('.block-subitem3 .block-subitem-finelsub4'),
          ),
          div(
            { class: 'load-policy-list' },
            ul(
              { class: 'load-policy-list-ul' },
              li(
                '1% exit load applies if redeemed within 365 days of allotment.',
              ),
              li('No exit load applies if redeemed after 365 days.'),
              li(
                'Exit load is applicable when switching between different MOMF Schemes.',
              ),
              li(
                'No exit load for switching between options or plans within the same Scheme.',
              ),
            ),
          ),
        ),
      ),
    ),
  );
  block.appendChild(keyFactsSection);
  // Add Read More / Read Less functionality
  const fullText = data[0].investmentObjective || '';
  const textContent = fullText?.replace(/<[^>]+>/g, '') || ''; // Strip HTML tags for counting
  const words = textContent?.split(/\s+/) || '';
  const preview = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');

  const container = block.querySelector('.investment-discripstion');

  // Create preview paragraph
  const previewPara = document.createElement('p');
  if (!preview) {
    document.querySelector('.investment-objective').style.display = 'none';
  }
  previewPara.innerHTML = preview;

  // Create toggle button
  const toggleBtn = document.createElement('span');
  toggleBtn.textContent = 'read more';
  toggleBtn.className = 'read-toggle-btn';
  // toggleBtn.style.marginLeft = '10px';
  // toggleBtn.style.cursor = 'pointer';
  // toggleBtn.style.color = 'blue';

  // Append preview and button initially
  container.innerHTML = '';
  container.appendChild(previewPara);
  previewPara.appendChild(toggleBtn);

  if (words.length > 20) {
    toggleBtn.addEventListener('click', () => {
      container.innerHTML = '';

      if (toggleBtn.textContent === 'read more') {
        const fullPara = document.createElement('p');
        fullPara.innerHTML = fullText;
        container.appendChild(fullPara);
        toggleBtn.textContent = 'read less';
      } else {
        const previewParaAgain = document.createElement('p');
        previewParaAgain.innerHTML = preview;
        container.appendChild(previewParaAgain);
        toggleBtn.textContent = 'read more';
      }

      container.appendChild(toggleBtn);
    });
  }
  block.querySelector('.entry-load-detail').innerHTML = data[0].entryLoad;
  block.querySelector('.load-policy-list').innerHTML = '';
  const replacepara = data[0].schDetail.exitLoad.replaceAll('<p>', '<li>');
  const replaceparatwo = replacepara.replaceAll('</p>', '</li>');
  const prarrep = replaceparatwo.replaceAll('<li>&nbsp;</li>', '');

  const ulCover = document.createElement('ul');
  ulCover.className = 'load-policy-list-ul';
  ulCover.innerHTML = prarrep;
  block.querySelector('.load-policy-list').append(ulCover);
  // block.querySelector('.load-policy-list').innerHTML = prarrep;
}
