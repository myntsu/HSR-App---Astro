// Function to update the card template based on user inputs
function updateCard() {
    const starRating = document.getElementById('star-rating').value;
    const eidolonLevel = document.getElementById('eidolon-level').value;
    const signatureLevel = document.getElementById('signature-level').value;
    // Update the card template with the user inputs
    document.getElementById('name').textContent = `Character Name (${starRating} stars)`;
    document.getElementById('eidolon').textContent = `E${eidolonLevel}`;
    document.getElementById('signature').textContent = `S${signatureLevel}`;
    // Update other elements of the card template as needed
  }
  
  // Event listener for changes in user inputs
  document.getElementById('star-rating').addEventListener('change', updateCard);
  document.getElementById('eidolon-level').addEventListener('change', updateCard);
  document.getElementById('signature-level').addEventListener('change', updateCard);
  
  // Function to save the card to local storage
  function saveCard() {
    // Create an object with the card details
    const card = {
      starRating: document.getElementById('star-rating').value,
      eidolonLevel: document.getElementById('eidolon-level').value,
      signatureLevel: document.getElementById('signature-level').value,
      // Add more properties for relics, light cone, element, and path if needed
    };
    // Store the card object in local storage
    localStorage.setItem('card', JSON.stringify(card));
    alert('Card saved successfully!');
  }
  
  // Event listener for save button click
  document.getElementById('save-button').addEventListener('click', saveCard);
  