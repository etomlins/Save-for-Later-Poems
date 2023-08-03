

var results = Papa.parse("kaggle_poem_dataset.csv", {
    download: true,
    complete: function(results) {
      console.log(results);
    
  
console.log(results)

function findPoem() {
    const poemName = document.getElementById('searchBar').value;
    const poem = results.find(item => item.title.toLowerCase() === poemName.toLowerCase());

    const poemContentElement = document.getElementById('content');
    if (poem) {
        poemContentElement.textContent = poem.content;
    } else {
        poemContentElement.textContent = 'Poem not found.';
    }
}

}
});
