import { useEffect } from "react";

export default function useWorker() {
  // In _app.js or a custom hook used on the client side:
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log("ServiceWorker registration successful:", registration);
        })
        .catch((error) => {
          console.log("ServiceWorker registration failed:", error);
        });
    });
  }, []);
}
