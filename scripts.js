function loadCSVFile() {
    const csvFilePath = "kaggle_poem_dataset.csv";

    Papa.parse(csvFilePath, {
        download: true,
        complete: function (parsedData) {
            console.log(parsedData.data);
        }
    });
}

loadCSVFile();

const poemName = document.getElementById('searchBar').value.toLowerCase();
const foundPoem = data.find(entry => entry[2] === poemName);

if (foundPoem) {
  const [id, author, title, number, content] = foundPoem;
  console.log(`Found poem with title "${title}" by ${author}:`);
  console.log(`Content: ${content}`);
} else {
  console.log(`Poem titled "${poemName}" not found in the array.`);
}
    


