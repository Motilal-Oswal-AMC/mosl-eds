/*    */
// add delayed functionality here

// (function () {
//     const script = document.createElement('script');
//     script.src = 'https://js.sentry-cdn.com/a5c41aadd72a74530a8f1c2e6a60af10.min.js';
//     script.crossOrigin = 'anonymous';

//     script.onload = function () {
//         if (typeof Sentry !== 'undefined') {
//             Sentry.onLoad(function () {
//                 Sentry.init({
//                     dsn: 'https://a5c41aadd72a74530a8f1c2e6a60af10@o4509128284176384.ingest.us.sentry.io/4509150965530624', // your actual DSN here
//                     tracesSampleRate: 1.0,
//                 });

//                 console.log("✅ Sentry initialized");

//                 // Example error
//                 try {
//                     myUndefinedFunction();
//                 } catch (err) {
//                     Sentry.captureException(err);
//                 }
//             });
//         }
//     };

//     document.head.appendChild(script);
// })();

export default async function delayed() {
  const script = document.createElement('script');
  script.src = 'https://js.sentry-cdn.com/a5c41aadd72a74530a8f1c2e6a60af10.min.js';
  script.crossOrigin = 'anonymous';

  script.onload = () => {

  };

  document.head.appendChild(script);
}
