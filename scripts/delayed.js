import { getMetadata } from './aem.js';
import { a, li, ul } from './dom-helpers.js';

function decorateBreadcrumbItems(title, url, icon = '') {
  // return li(a({ href: url }, title));
  if (icon) {
    const link = a({ href: url });
    const img = document.createElement('img');
    img.src = icon;
    img.alt = 'home-icon';
    link.appendChild(img);
    return li(link);
  }
  return li(a({ href: url }, title));
}

// breadcrumbs use chat gpt2
export default async function createBreadcrumbs() {
  // 1. Get breadcrumbs_title from <meta> or fallback to document.title
  const segments = window.location.pathname.split('/').filter(Boolean);

  let currentPath = '';
  // splice(0, segments.length - 1)
  const items = await Promise.all(
    segments.slice(0, segments.length - 1).map(async (segment) => {
      currentPath += `/${segment}`;
      const url = currentPath;
      const resp = await fetch(url);
      const html = await resp.text();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const breadcrumbTitle = tempDiv.querySelector('meta[name="breadcrumbs_title"]')
        || tempDiv.querySelector('meta[property="og:title"]');
      const breadcrumbHide = tempDiv.querySelector(
        'meta[name="breadcrumbs_hide"]',
      );
      if (breadcrumbHide.getAttribute('content') === 'true') return null;
      // const anchor = await (a({
      //   href: url,
      // }, breadcrumbTitle ? breadcrumbTitle.getAttribute('content') : segment));
      return decorateBreadcrumbItems(
        breadcrumbTitle.getAttribute('content'),
        url,
      );
    }),
  );
  const homeIcon = '/icons/home-icon.svg';
  // const homeLink = '/in/en/mutual-fund/home-page';
  return ul(
    decorateBreadcrumbItems('Home', '/mutual-fund/in/en/home-page', homeIcon),
    ...items.filter((item) => item !== null),
    decorateBreadcrumbItems(
      getMetadata('breadcrumbs_title'),
      window.location.pathname,
    ),
  );
}

async function decorateBreadcrumbs() {
  try {
    if (getMetadata('breadcrumbs') === 'true') {
      const breadcrumb = await createBreadcrumbs();
      breadcrumb.classList.add('breadul');
      Array.from(breadcrumb.children).forEach((brelesub) => {
        brelesub.classList.add('breadli');
      });
      document.querySelector('.breadcrumbs-fdp').appendChild(breadcrumb);
    }
  } catch (error) {
    // console.log(error);
  }
}

decorateBreadcrumbs();
