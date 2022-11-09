/**
 * isFlexInsideCRMIframe
 *
 * Check if Flex is running inside an iFrame and the parent page matches the CRM base URL
 *
 * @param {crmUrl}  string  The custom CRM base url
 */
export const isFlexInsideCRMIframe = (crmUrl?: string) => {
  // The current url from where Flex is running
  const baseUrl =
    window.location.ancestorOrigins && window.location.ancestorOrigins[0];
  const isInsideIframe = window.self !== window.top;

  if (crmUrl) {
    return isInsideIframe && !!baseUrl && baseUrl.includes(crmUrl);
  }

  return isInsideIframe;
};
