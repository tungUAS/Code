var fs = require('fs');

const obj = {
    "title": "Northanger Abbey",
    "author":"Austen, Jane",
    "year_written": 1814,
    "edition": "Penguin",
    "price": 18.2,
    "quantity": 1000,
    "stock": "A"
    }
const data = [];
for(let i=0;i<20000;i++){        
    data.push(obj);
}

fs.writeFile('20000books.json', JSON.stringify(data),function(err){
    if (err) throw err;
    console.log('complete');
});