// Function to capitalize the first letter of each word
function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Fetch the data from characters.json
fetch("/characters.json")
  .then((response) => response.json())
  .then((data) => {
    // Create a function to generate a new card
    function generateCard(character, eidolon, signature, teamName, planarPiece, relicPieceOne, relicPieceTwo) {
      // Capitalize the first letter of each word in the character's name, path, and element
      let characterName = capitalizeWords(character.character);
      let characterPath = capitalizeWords(character.path);
      let characterElement = capitalizeWords(character.element);

      // Replace spaces and dots with underscores in the character's name for the image file
      let characterImageName = character.character
        .replace(/[^a-z0-9]/gi, "_")
        .replace(/_+/g, "_");

      // Construct the paths for the path and element images
      let characterImageSrc = `/assets/character/${characterImageName}.webp`;
      let pathImageSrc = `/assets/path/path_${character.path}.webp`;
      let elementImageSrc = `/assets/element/ele_${character.element}.webp`;
      let planarImageSrc = `./assets/planar/${planarPiece}.webp`;
      let relicImageOneSrc = `./assets/relic/${relicPieceOne}.webp`;
      let relicImageTwoSrc = `./assets/relic/${relicPieceTwo}.webp`;

      // Create the new card HTML
      let newCardHTML = `
          <div class="card">
            <h3 data-character-name>${characterName}</h3>
            <div class="img-container ${character.stars}-star" data-image-container>
              <img data-character-image src="${characterImageSrc}" alt="${characterName}">
              <div class="eidolon" data-eidolon>${eidolon}</div>
              <div class="signature" data-signature>${signature}</div>
            </div>
            <div class="info-container ${character.element}" data-information>
              <div>
                <img data-path src="${pathImageSrc}" alt="${characterPath} path">
                <img data-element src="${elementImageSrc}" alt="${characterElement} element">
              </div>
              <div class="info" data-character-stats>
                <div data-first-stat>
                  <img src="" alt="">
                  <p>0</p>
                </div>
                <div data-second-stat>
                  <img src="" alt="">
                  <p>0</p>
                </div>
                <div data-third-stat>
                  <img src="" alt="">
                  <p>0</p>
                </div>
                <div data-fourth-stat>
                  <img src="" alt="">
                  <p>0</p>
                </div>
              </div>
            </div>
            <div class="relic-light-cone-container" data-items>
              <div data-relic-one>
                <img src="${relicImageOneSrc}" alt="${relicPieceOne}">
              </div>
              <div data-relic-two>
                <img src="${relicImageTwoSrc}" alt="${relicPieceTwo}">
              </div>
              <div data-light-cone>
                <img id="light-cone" src="" alt="">
              </div>
              <div data-planar>
                <img src="${planarImageSrc}" alt="${planarPiece}">
              </div>
            </div>
          </div>
      `;

      // Check if the cards-wrapper already exists
      let cardsWrapper = document.querySelector(
        ".cards-container .cards-wrapper"
      );
      if (!cardsWrapper) {
        // If the cards-wrapper doesn't exist, create it
        cardsWrapper = document.createElement("div");
        cardsWrapper.className = "cards-wrapper";
        document.querySelector(".cards-container").appendChild(cardsWrapper);
      }

      // Now you can use cardsWrapper to append team-container
      let teamContainer = document.querySelector(
        `.cards-wrapper .team-container[data-team-name="${teamName}"]`
      );
      if (!teamContainer) {
        // If the team container doesn't exist, create it
        teamContainer = document.createElement("div");
        teamContainer.className = "team-container";
        teamContainer.dataset.teamName = teamName;
        cardsWrapper.appendChild(teamContainer);
      }

      // Add the new card to the team container
      teamContainer.innerHTML += newCardHTML;

      saveCards();
    }

    // Populate the character selection input
    let characterSelect = document.getElementById("character-select");

    data.forEach((character) => {
      let characterName = capitalizeWords(character.character);
      characterSelect.options.add(
        new Option(characterName, character.character)
      );
    });

    // Get the form and add a submit event listener
    document
      .getElementById("card-generator-form")
      .addEventListener("submit", function (event) {
        // Prevent the form from submitting normally
        event.preventDefault();

        // Get the selected character data
        let selectedCharacter = data.find(
          (character) => character.character === characterSelect.value
        );

        // Get the selected eidolon, signature, and team name values
        let eidolonSelect = document.getElementById("eidolon-select");
        let signatureSelect = document.getElementById("signature-select");
        let teamNameInput = document.getElementById("team-name-input");
        let planarSelect = document.getElementById("planar-select");
        let relicSelectOne = document.getElementById("relic-select-one");
        let relicSelectTwo = document.getElementById("relic-select-two");
        let selectedEidolon = eidolonSelect.value;
        let selectedSignature = signatureSelect.value;
        let selectedTeamName = teamNameInput.value;
        let selectedPlanar = planarSelect.value;
        let selectedRelicOne = relicSelectOne.value;
        let selectedRelicTwo = relicSelectTwo.value;

        // Generate a card for the selected character
        if (selectedCharacter) {
          generateCard(
            selectedCharacter,
            selectedEidolon,
            selectedSignature,
            selectedTeamName,
            selectedPlanar,
            selectedRelicOne,
            selectedRelicTwo
          );
        }
      });
  })
  .catch((error) => console.error("Error:", error));

// Fetch the information for the planar pieces and relics
fetch("/relics.json")
  .then((response) => response.json())
  .then((relicData) => {
    let relicSelectOne = document.getElementById("relic-select-one");
    let relicSelectTwo = document.getElementById("relic-select-two");

    relicData.forEach((relic) => {
      let relicName = relic.name;
      let relicImg = relic.img;
      relicSelectOne.options.add(
        new Option(relicName, relicImg)
      );
      relicSelectTwo.options.add(
        new Option(relicName, relicImg)
      );
    });

    relicSelectOne.addEventListener("change", function () {
      relicSelectTwo.value = this.value;
    });
  })
  .catch((error) => console.error("Error:", error));

fetch("/planars.json")
  .then((response) => response.json())
  .then((planarData) => {
    let planarSelect = document.getElementById("planar-select");

    planarData.forEach((planar) => {
      let planarName = planar.name;
      let planarImg = planar.img;
      planarSelect.options.add(
        new Option(planarName, planarImg)
      );
    });
  })
  .catch((error) => console.error("Error:", error));


// Save the cards to localStorage whenever a new card is generated
function saveCards() {
  let cardsContainer = document.querySelector(".cards-container");
  if (cardsContainer) {
    localStorage.setItem("cards", cardsContainer.innerHTML);
  }
}

// Load the cards from localStorage when the page loads
function loadCards() {
  let cardsContainer = document.querySelector(".cards-container");
  let savedCards = localStorage.getItem("cards");
  if (cardsContainer && savedCards) {
    cardsContainer.innerHTML = savedCards;
  }
}

// Call loadCards when the page loads
window.onload = loadCards;
