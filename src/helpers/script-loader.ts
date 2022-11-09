export const loadScript = (url: string) =>
  new Promise((resolve, reject) => {
    const scriptRef = document.createElement("script");
    const tag = document.getElementsByTagName("script")[0];

    scriptRef.src = url;
    scriptRef.type = "text/javascript";
    scriptRef.async = true;
    scriptRef.onerror = reject;
    scriptRef.onload = (res: any) =>
      (!res.readyState || res.readyState === "complete") && resolve(res);

    if (tag.parentNode) {
      tag.parentNode.insertBefore(scriptRef, tag);
    }
  });
