window.addEventListener("load", function () {
  // Function to update the title attribute of h3 elements
  function updateTitles() {
    const h3Elements = document.querySelectorAll("h3");
    h3Elements.forEach((h3Element) => {
      const h3Text = h3Element.innerText;
      h3Element.setAttribute("title", h3Text);
    });
  }

  // Update titles initially
  updateTitles();

  // Create a MutationObserver instance
  const observer = new MutationObserver(updateTitles);

  // Start observing the document with the configured parameters
  observer.observe(document.body, { childList: true, subtree: true });
});
