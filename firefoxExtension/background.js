// background.js
console.log("hitttt!!!");
browser.webRequest.onBeforeRequest.addListener(
    function (details) {
        console.log(details);
        if (details.type === "media") {
            // Log the request details
            console.log("Request Details:", details);

            // Add a listener for the *response*
            const listener = (responseDetails) => {
                if (responseDetails.requestId === details.requestId) {
                    // Match the request
                    console.log("Response Details:", responseDetails);

                    browser.downloads.download({
                        url: details.url,
                        filename: `${details.documentId}.mp3`,
                    });

                    // Remove the listener to avoid multiple logs
                    browser.webRequest.onCompleted.removeListener(listener);
                }
            };

            browser.webRequest.onCompleted.addListener(listener, {
                urls: [details.url],
            });
        }
    },
    { urls: ["https://www.jiosaavn.com/*", "https://aac.saavncdn.com/*"] }, // Or more specific URL patterns
    [] // No blocking needed for just logging
);
