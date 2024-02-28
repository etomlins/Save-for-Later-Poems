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

    document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'save-poem') {
      const poem = {
        title: document.querySelector('#poem-display-area h2').textContent,
        author: document.querySelector('#poem-display-area p').textContent,
        content: document.querySelector('#poem-display-area pre').textContent,
      };
      savePoem(poem);
      displaySavedPoems();
    } else if (e.target && e.target.id === 'close-poem') {
      document.getElementById('poem-display-area').style.display = 'none';
    }
  });
  document.getElementById("clear-saved-poems").addEventListener("click", function() {
    localStorage.removeItem("savedPoems"); 
    displaySavedPoems(); 
  });


  displaySavedPoems();
});

function displayNotFoundMessage() {
  const displayArea = document.getElementById('poem-display-area');
  displayArea.innerHTML = "<p>Poem not found. Try another search!</p>";
  displayArea.style.display = 'block'; 
}

function displayPoem(poem) {
  const displayArea = document.getElementById('poem-display-area');
  displayArea.innerHTML = `
      <button id="close-poem" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 24px; cursor: pointer;">&times;</button>
      <h2>${poem.title}</h2>
      <p>${poem.author}</p>
      <pre>${poem.content}</pre>
      <button id="save-poem">Save Title</button>
  `;
  displayArea.style.display = 'block'; 
}

function savePoem(poem) {
  let savedPoems = JSON.parse(localStorage.getItem("savedPoems")) || [];
  savedPoems.push(poem);
  localStorage.setItem("savedPoems", JSON.stringify(savedPoems));
}

function displaySavedPoems() {
  const savedPoems = JSON.parse(localStorage.getItem("savedPoems")) || [];
  const listElement = document.getElementById("saved-poems");
  listElement.innerHTML = "";
  savedPoems.forEach(poem => {
    const listItem = document.createElement("li");
    listItem.textContent = `${poem.title} by ${poem.author}`;
    listElement.appendChild(listItem);
  });
}




