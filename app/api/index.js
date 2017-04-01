import "whatwg-fetch";

// const cardsData

fetch('/public/cards.json')
.then(function(res) {
    return res.json();
})
.then(function(data) {
    cardsdata = data;
} //使用this先必须传递进去
.catch((error) => {
    console.log('Error fetching and parsing data', error)
})

console.log(cardsData);
export default cardsData;