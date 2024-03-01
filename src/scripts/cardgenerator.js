// Fetch the data from characters.json
fetch('/characters/characters.json')
  .then(response => response.json())
  .then(data => {
    // Create a function to generate a new card
    function generateCard(character) {
      // Capitalize the first letter of each word in the character's name
      let characterName = character.character.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

      // Construct the paths for the path and element images
      let pathImageSrc = `../assets/path/path_${character.path}.webp`;
      let elementImageSrc = `../assets/element/ele_${character.element}.webp`;

      // Create the new card HTML
      let newCardHTML = `
        <div class="cards-wrapper">
          <h3 data-character-name>${characterName}</h3>
          <div class="card">
            <div class="img-container ${character.stars}" data-image-container>
              <img data-character-image src="" alt="">
              <div class="eidolon" data-eidolon>E0</div>
              <div class="signature" data-signature>S1</div>
            </div>
            <div class="info-container ${character.element}" data-information>
              <div>
                <img data-path src="${pathImageSrc}" alt="${character.path} path">
                <img data-element src="${elementImageSrc}" alt="${character.element} element">
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
              <!-- Items go here -->
            </div>
          </div>
        </div>
      `;

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
      characterSelect.options.add(new Option(character.character, character.character));
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
