document.addEventListener('DOMContentLoaded', function() {
  const csvFilePath = "kaggle_poem_dataset.csv";
  let csvData = []; // To store the CSV data

  // Use Papa.parse with fetch to load and parse the CSV file
  fetch(csvFilePath)
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true,
        complete: function(results) {
          csvData = results.data;
          // Setup the event listener here to ensure data is loaded
          document.getElementById("find-poem-click").addEventListener("click", function() {
            const poemName = document.getElementById('poem-search-input').value.toLowerCase();
            const foundPoem = csvData.find(entry => entry['Poem Title'].toLowerCase() === poemName);
            if (!foundPoem) {
              displayNotFoundMessage();
            } else {
              displayPoem({
                title: foundPoem['Poem Title'],
                author: foundPoem['Author Name'],
                content: foundPoem['Poem Content']
              });
            }
          });
        }
      });
    })
    .catch(error => console.error("Error loading CSV file:", error));
});



function displayNotFoundMessage() {
  var displayArea = document.getElementById('poem-display-area');
  displayArea.innerHTML = "<p>Poem not found. Try another search!</p>";
}
function displayPoem(poem) {
  var displayArea = document.getElementById('poem-display-area');
  displayArea.innerHTML = `<h2>${poem.title}</h2><p>${poem.author}</p><pre>${poem.content}</pre><button onclick="closePoemDisplay()">Close</button>`;
  displayArea.style.display = 'block'; // Show the pop-up
}

function closePoemDisplay() {
  var displayArea = document.getElementById('poem-display-area');
  displayArea.style.display = 'none'; // Hide the pop-up
}
