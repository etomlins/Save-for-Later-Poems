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
            console.log('clicked!');
            const poemName = document.getElementById('poem-search-input').value.toLowerCase();
            const foundPoem = csvData.find(entry => entry['Title'].toLowerCase().includes(poemName));
            console.log(poemName);
            if (!foundPoem) {
              console.log('poem not found :(');
              displayNotFoundMessage();

            } else {
              console.log('poem should be displayed now');
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
  displayArea.style.display = 'block'; 
}



