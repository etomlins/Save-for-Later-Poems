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
          document.getElementById("find-poem-click").addEventListener("click", function() {
            const poemName = document.getElementById('poem-search-input').value.toLowerCase();
            const foundPoem = csvData.find(entry => entry['Title'].toLowerCase() === poemName);
            if (!foundPoem) {
              displayNotFoundMessage();
            } else {
              displayPoem({
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
  displayArea.style.display = 'block'; // Make sure to show the display area if it was hidden
}

function displayPoem(poem) {
    const displayArea = document.getElementById('poem-display-area');
    displayArea.innerHTML = `<h2>${poem.title}</h2><p>${poem.author}</p><pre>${poem.content}</pre>`;
    displayArea.style.display = 'block'; // Show the poem content
}

function closePoemDisplay() {
  var displayArea = document.getElementById('poem-display-area');
  displayArea.style.display = 'none'; // Hide the pop-up
}
