/**
 * Decorates the block with the publish date and time.
 * @param {HTMLElement} block The block element
 */
export default function decorate(block) {
  // 1. Get the publish time from the window.hlx.metadata object
  //    'publishedTime' is the most specific.
  //    'lastModified' is a reliable fallback.
  const publishDateStr = window.hlx.metadata?.publishedTime || window.hlx.metadata?.lastModified;

  if (publishDateStr) {
    try {
      // 2. Convert the timestamp string into a readable format
      const date = new Date(publishDateStr);

      // 3. Format the date. You can customize this.
      //    Example: "November 12, 2025, 12:30 AM"
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

      // 4. Create a new element to display the date
      const dateElement = document.createElement('p');
      dateElement.classList.add('publish-date'); // Add a class for styling
      dateElement.textContent = `Published: ${formattedDate}`;

      // 5. Add the new date element to your block
      block.append(dateElement);
    } catch (e) {
      console.error('Could not format publish date:', e);
    }
  } else {
    console.warn('Publish date metadata not found.');
  }
}
