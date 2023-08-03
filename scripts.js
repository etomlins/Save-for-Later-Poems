function loadCSVFile() {
  const csvFilePath = "kaggle_poem_dataset.csv";
  console.log("loading the file");
  
  return new Promise((resolve, reject) => {
    Papa.parse(csvFilePath, {
      download: true,
      complete: function (parsedData) {
        const data = parsedData.data;
        resolve(data);
        console.log(data);
        console.log("it worked!");

      },
      error: function (error) {
        reject(error);
        console.error("Error parsing CSV file:", error);
      },
    });
  });
}

loadCSVFile()
  .then((data) => {
    // Data is available here
    document.getElementById("find-poem-click").addEventListener("click", displayPoem);

    function displayPoem() {
      const poemName = document.getElementById('form1').value.toLowerCase();
      const foundPoem = data.find(entry => entry[2] === poemName);
      if (!foundPoem) {
        console.log('did not work :(');
      } else {
        const [id, author, title, number, content] = foundPoem;
        console.log(`Found poem with title "${title}" by ${author}:`);
        console.log(`Content: ${content}`);
      }
    }
  })
  .catch((error) => {
    console.error("Error loading CSV file:", error);
  });
