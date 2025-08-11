import Swiper from '../swiper/swiper-bundle.min.js';

export default function decorate(block) {
  // 1. Setup main Swiper containers
  block.classList.add('swiper');
  const swiperWrapper = document.createElement('div');
  swiperWrapper.classList.add('swiper-wrapper');
  const swiperPagination = document.createElement('div');
  swiperPagination.classList.add('swiper-pagination');

  // 2. Get all the original content rows before clearing the block
  const sourceRows = Array.from(block.children);
  block.innerHTML = ''; // Clear the main block to build it from scratch

  // 3. Process each source row to create a slide
  sourceRows.forEach((row) => {
    // Extract the raw content parts from the source structure
    const picture = row.querySelector('picture');
    const anchor = row.querySelector('a');
    const textContent = row.children[2]; // Assumes text content is in the third div

    // Skip this row if it doesn't have the necessary parts
    if (!picture || !anchor || !textContent) {
      return;
    }

    // --- Create the final slide structure ---

    const slide = document.createElement('div');
    slide.classList.add('swiper-slide');

    // Create the first card div (.swiper-slide-cards-1)
    const card1 = document.createElement('div');
    card1.classList.add('swiper-slide-cards-1');

    // Configure the anchor and image
    anchor.textContent = ''; // Ensure anchor has no text
    anchor.classList.add('button');
    anchor.appendChild(picture); // Place the image inside the anchor
    card1.appendChild(anchor); // Place the anchor inside the first card

    // Create the second card div (.swiper-slide-cards-2)
    const card2 = document.createElement('div');
    card2.classList.add('swiper-slide-cards-2');
    card2.innerHTML = textContent.innerHTML; // Copy the text content (the UL)

    // Append the newly created cards to the slide
    slide.appendChild(card1);
    slide.appendChild(card2);

    // Add the fully constructed slide to the Swiper wrapper
    swiperWrapper.appendChild(slide);
  });

  // 4. Final assembly of the Swiper block
  block.appendChild(swiperWrapper);
  block.appendChild(swiperPagination);

  // 5. Initialize Swiper
  Swiper(block, {
    slidesPerView: 'auto',
    spaceBetween: 16,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    loop: true,
    pagination: {
      disabledClass: 'swiper-pagination-disabled',
    },
    breakpoints: {
      769: {
        spaceBetween: 16,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
      },
    },
  });
}
