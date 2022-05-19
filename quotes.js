const url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
const quoteDiv = document.getElementById("quote");
const button = document.querySelector("#btnQuote");
var currentQuote = '';
//const tweet = document.querySelector("#tweet");


  
function generateQuote(data) {
    fetch(url)
        .then(resp => resp.json())
        .then(function (data) {
            quoteDiv.innerHTML = `"${data[0]}"`;
            currentQuote = `"${data[0]}"`;
            
        })
        .catch(function (error) {
            console.log(error)
        })
}

generateQuote();
button.onclick = generateQuote;
