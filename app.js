const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// In-memory storage for grocery items
const inventory = [];

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/add_item', (req, res) => {
    const data = req.body;

    if (!data.name || !data.quantity) {
        return res.status(400).json({ error: 'Name and quantity are required' });
    }

    const item = { name: data.name, quantity: data.quantity };
    inventory.push(item);

    res.status(201).json({ message: 'Item added successfully' });
});

app.get('/get_inventory', (req, res) => {
    res.json({ inventory });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
