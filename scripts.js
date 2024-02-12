document.addEventListener('DOMContentLoaded', function() {
  const csvFilePath = "kaggle_poem_dataset.csv";
  let csvData = []; // To store the CSV data

  // Use Papa.parse with fetch to load and parse the CSV file
  fetch(csvFilePath)
    .then(response => response.text())
    .then(csvText => {
      Papa.parse(csvText, {
        header: true, // Ensure your CSV has headers
        complete: function(results) {
          csvData = results.data;
          console.log("Finished loading and parsing:", csvData);
          // Setup the event listener here to ensure data is loaded
          document.getElementById("find-poem-click").addEventListener("click", displayPoem);
        }
      });
    })
    .catch(error => console.error("Error loading CSV file:", error));

  function displayPoem() {
    const poemName = document.getElementById('form1').value.toLowerCase();
    // Adjust the keys according to your CSV file headers
    const foundPoem = csvData.find(entry => entry['Poem Title'].toLowerCase() === poemName); // Correct keys according to your CSV structure
    if (!foundPoem) {
      console.log('Poem not found :(');
    } else {
      console.log(`Found poem with title "${foundPoem['Poem Title']}" by ${foundPoem['Author Name']}:`);
      console.log(`Content: ${foundPoem['Poem Content']}`); // Ensure these match your CSV headers
    }
  }
});
