
const express = require('express');
const app = express();

// part 1
app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}!`);
});

// part 2
app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);

    if (isNaN(number)) {
        res.send("You must specify a number.");
    } else {
        const rolled = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${rolled}.`);
    }
});

// part 3
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index);

    if (isNaN(index) || index < 0 || index >= collectibles.length) {
        res.send("This item is not yet in stock. Check back soon!");
    } else {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
});

// part 4 
const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filtered = shoes;

    const minPrice = parseFloat(req.query['min-price']);
    const maxPrice = parseFloat(req.query['max-price']);
    const type = req.query.type;

    if (!isNaN(minPrice)) {
        filtered = filtered.filter(shoe => shoe.price >= minPrice);
    }

    if (!isNaN(maxPrice)) {
        filtered = filtered.filter(shoe => shoe.price <= maxPrice);
    }

    if (type) {
        filtered = filtered.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
    }

    res.send(filtered);
});


// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
