function loadCSVFile() {
    const csvFilePath = "kaggle_poem_dataset.csv";

  Papa.parse(csvFilePath, {
    download: true,
    complete: function (parsedData) {
      const data = parsedData.data;
      console.log(data); 
        }
    });
}

loadCSVFile();

const poemName = document.getElementById('form1').value.toLowerCase();
const foundPoem = data.find(entry => entry[2] === poemName);

if (foundPoem) {
  const [id, author, title, number, content] = foundPoem;
  console.log(`Found poem with title "${title}" by ${author}:`);
  console.log(`Content: ${content}`);
} else {
  console.log(`Poem titled "${poemName}" not found in the array.`);
}
    


