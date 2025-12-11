export const sendMaintenanceAlert = async (efficiency, expectedEfficiency) => {
  const SERVICE_ID = 'service_9vjrs7a';
  const TEMPLATE_ID = 'template_am8x50i';
  const PUBLIC_KEY = 'tgntyj8oj8EUAcnvc';

  const templateParams = {
    current_efficiency: efficiency.toFixed(2),
    expected_efficiency: expectedEfficiency.toFixed(2),
    timestamp: new Date().toLocaleString(),
    message: `The excavator is operating at ${efficiency.toFixed(
      2
    )} m³/hr, which is below the expected ${expectedEfficiency} m³/hr. Immediate maintenance is recommended.`,
  };

  try {
    if (!window.emailjs) {
      await loadEmailJS();
    }

    const response = await window.emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );

    return { success: true, response };
  } catch (error) {
    return { success: false, error };
  }
};

const loadEmailJS = () => {
  return new Promise((resolve, reject) => {
    if (window.emailjs) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src =
      'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      console.log('EmailJS SDK loaded');
      resolve();
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};
