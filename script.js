const btn = document.getElementById("btn");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = new Audio();

btn.addEventListener("click", () => {
  let inpWord = document.getElementById("inp-word").value;

  fetch(`${url}${inpWord}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const word = data[0].word;
      const pos = data[0].meanings[0].partOfSpeech;
      const pronunciation = data[0].phonetics[0].text;
      const meaning = data[0].meanings[0].definitions[0].definition;
      const example = data[0].meanings[0].definitions[0].example;

      result.innerHTML = `
        <div class="word">
          <h3>${word}</h3>
          <button onclick="playSound()">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
        <div class="details">
          <p>${pos}</p>
          <p>${pronunciation}</p>
        </div>
        <p class="word-meaning">${meaning}</p>
        <p class="word-example">${example}</p>
      `;
      sound.setAttribute("src", data[0].phonetics[0].audio);
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "<p>No results found.</p>";
    });
});

function playSound() {
  sound.play();
}