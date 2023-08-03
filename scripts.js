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
