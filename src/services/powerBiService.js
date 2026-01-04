const DEFAULT_URL =
  'https://api.powerbi.com/beta/a63bb1a9-48c2-448b-8693-3317b00ca7fb/datasets/55eebeea-4763-471c-9f5c-dd21fd704876/rows?experience=power-bi&key=2uAKYbyf6%2FnL8fqwELZvBGM2ervoKtl2A1OM9H9%2BWlE%2BOw9B0khndby3Bi8%2B4SHsyfgpq2zfPtNn%2BnYNiOy%2FLw%3D%3D';
let powerBiUrl = localStorage.getItem('pbi_url') || DEFAULT_URL;

export const setPowerBiUrl = (url) => {
  powerBiUrl = url;
  localStorage.setItem('pbi_url', url);
};

export const getPowerBiUrl = () => powerBiUrl;

export const streamDataToPowerBI = async (data) => {
  if (!powerBiUrl) {
    console.warn("Power BI Stream: No URL configured.");
    return;
  }

  console.log("Power BI Stream: Sending data...", data);

  try {
    // Power Automate / Logic Apps usually expect a single object
    // Power BI Push API expects an array
    const isPowerAutomate = powerBiUrl.includes('logic.azure.com');
    const payload = isPowerAutomate ? data : [data];

    const response = await fetch(powerBiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Power BI Stream Error: ${response.status}`, errorText);
    } else {
      console.log("Power BI Stream: Success!");
    }
  } catch (error) {
    console.error("Power BI Stream Failed:", error);
  }
};
