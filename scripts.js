document.addEventListener('DOMContentLoaded', function() {
  const csvFilePath = "kaggle_poem_dataset.csv";
  let csvData = []; 

  fetch(csvFilePath)
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        complete: function(results) {
          
          csvData = results.data;
          document.getElementById("find-poem-click").addEventListener("click", function() {
            displayNotFoundMessage() 
            console.log('clicked!');
            const poemName = document.getElementById('poem-search-input').value.toLowerCase();
            const foundPoem = csvData.find(entry => entry['Title'].toLowerCase().includes(poemName));
            console.log(poemName);
            if (!foundPoem) {
              console.log('poem not found :(');
              displayNotFoundMessage();

            } else {
              displayPoem({
                console.log('poem should be displayed now');
                title: foundPoem['Title'],
                author: foundPoem['Author'],
                content: foundPoem['Content']
              });
            }
          });
        }
      });
    })
    .catch(error => console.error("Error loading CSV file:", error));
});

function displayNotFoundMessage() {
  const displayArea = document.getElementById('poem-display-area');
  displayArea.innerHTML = "<p>Poem not found. Try another search!</p>";
  displayArea.style.display = 'block'; 
}

function displayPoem(poem) {
  const displayArea = document.getElementById('poem-display-area');
  displayArea.innerHTML = `
      <h2>${poem.title}</h2>
      <p>${poem.author}</p>
      <pre>${poem.content}</pre>
      <button id="save-poem">Save Title</button>
  `;
  document.getElementById('save-poem').addEventListener('click', function() {
      savePoemTitle(poem.title);
  });
}


function closePoemDisplay() {
  var displayArea = document.getElementById('poem-display-area');
  displayArea.style.display = 'none'; 
}

function displaySavedPoemTitles() {
  const savedTitles = JSON.parse(localStorage.getItem('savedPoemTitles') || '[]');
  const displayArea = document.getElementById('saved-titles-display-area');
  if (savedTitles.length === 0) {
      displayArea.innerHTML = "No saved titles.";
      return;
  }
  const titlesList = savedTitles.map(title => `<li>${title}</li>`).join('');
  displayArea.innerHTML = `<ul>${titlesList}</ul>`;
}
function savePoemTitle(title) {
  let savedTitles = localStorage.getItem('savedPoemTitles');
  savedTitles = savedTitles ? JSON.parse(savedTitles) : [];
  savedTitles.push(title);
  localStorage.setItem('savedPoemTitles', JSON.stringify(savedTitles));
  alert("Poem title saved!");
}
