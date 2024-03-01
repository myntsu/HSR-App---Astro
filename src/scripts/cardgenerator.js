// Function to capitalize the first letter of each word
function capitalizeWords(str) {
  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Fetch the data from characters.json
fetch('/characters/characters.json')
  .then(response => response.json())
  .then(data => {
    // Create a function to generate a new card
    function generateCard(character) {
      // Capitalize the first letter of each word in the character's name, path, and element
      let characterName = capitalizeWords(character.character);
      let characterPath = capitalizeWords(character.path);
      let characterElement = capitalizeWords(character.element);

      // Construct the paths for the path and element images
      let characterImageSrc = `./src/assets/character/${character.character}.webp`;
      let pathImageSrc = `./src/assets/path/path_${character.path}.webp`;
      let elementImageSrc = `./src/assets/element/ele_${character.element}.webp`;

      // Create the new card HTML
      let newCardHTML = `
        <div class="cards-wrapper">
          <h3 data-character-name>${characterName}</h3>
          <div class="card">
            <div class="img-container ${character.stars}" data-image-container>
              <img data-character-image src="${characterImageSrc}" alt="${characterName}">
              <div class="eidolon" data-eidolon>E0</div>
              <div class="signature" data-signature>S1</div>
            </div>
            <div class="info-container ${character.element}" data-information>
              <div>
                <img data-path src="${pathImageSrc}" alt="${characterPath} path">
                <img data-element src="${elementImageSrc}" alt="${characterElement} element">
              </div>
              <div class="info" data-character-stats>
                <div>
                  <img src="https://www.prydwen.gg/static/ec87ab1e704b5764f83cd05d8442c8b0/dbb7e/stat_hp.webp" alt="">
                  <p>0</p>
                </div>
                <div>
                  <img src="https://www.prydwen.gg/static/dec7daebd67d260a6cca41705c4615fd/dbb7e/stat_atk.webp" alt="">
                  <p>0</p>
                </div>
                <div>
                  <img src="https://www.prydwen.gg/static/8a35e542007321efb5401e62acff95be/dbb7e/stat_effecthit.webp" alt="">
                  <p>0</p>
                </div>
                <div>
                  <img src="https://www.prydwen.gg/static/430a8e7c292cef8e2f572b147a171ddd/dbb7e/stat_speed.webp" alt="">
                  <p>0</p>
                </div>
              </div>
            </div>
            <div class="relic-light-cone-container" data-items>
              <div data-relic-one>
                <img src="https://www.prydwen.gg/static/9ebad5536a051059f9545793489a8376/d8057/prison.webp" alt="">
              </div>
              <div data-relic-two>
                <img src="https://www.prydwen.gg/static/9ebad5536a051059f9545793489a8376/d8057/prison.webp" alt="">
              </div>
              <div data-light-cone>
                <img id="light-cone" src="https://www.prydwen.gg/static/49e01383ee891e54e310cab9f266ae97/6766a/15_sm.webp" alt="">
              </div>
              <div data-planar>
                <img src="https://www.prydwen.gg/static/22c63c0e24d04a2e4a7a1bbdf28cafd6/d8057/firm.webp" alt="">
              </div>
            </div>
          </div>
        </div>
      `;

      // Add the new card to the cards-container
      let cardsContainer = document.querySelector('.cards-container');
      if (cardsContainer) {
        cardsContainer.innerHTML += newCardHTML;
      } else {
        console.error('Element with class "cards-container" not found');
      }
    }

    // Populate the character selection input
    let characterSelect = document.getElementById('character-select');

    data.forEach(character => {
      let characterName = capitalizeWords(character.character);
      characterSelect.options.add(new Option(characterName, character.character));
    });

    // Get the form and add a submit event listener
    document.getElementById('card-generator-form').addEventListener('submit', function(event) {
      // Prevent the form from submitting normally
      event.preventDefault();

      // Get the selected character data
      let selectedCharacter = data.find(character => character.character === characterSelect.value);

      // Generate a card for the selected character
      if (selectedCharacter) {
        generateCard(selectedCharacter);
      }
    });
  })
  .catch(error => console.error('Error:', error));