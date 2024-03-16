let toastActive = false;
export function showToast(text) {
  if (toastActive) return;

  toastActive = true;

  // Create toast element and set the text
  const toast = document.createElement("div");
  toast.innerText = `${text}`;

  // Add CSS classes
  toast.classList.add("quick-toast", "shadow-container");

  // Append toast to the body
  document.body.appendChild(toast);

  // Animate toast message
  toast.animate([{ bottom: "-50px" }, { bottom: "30px" }], {
    duration: 300,
    easing: "ease-out",
    fill: "forwards",
  });

  // Remove the toast after 2 seconds
  setTimeout(() => {
    toast.remove();
    toastActive = false;
  }, 2000);
}