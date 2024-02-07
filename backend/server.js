const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());


const imagesDirectory = path.join(__dirname, 'images');
if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
}

app.use('/images', express.static(imagesDirectory));

let history = [];
let cart = [];

app.get('/random-dog-image', async (req, res) => {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        const imageUrl = response.data.message;
        const imageName = `${Date.now()}.jpg`;
        const imagePath = path.join(imagesDirectory, imageName);

        const imageStream = fs.createWriteStream(imagePath);
        const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
        imageResponse.data.pipe(imageStream);

        imageStream.on('finish', () => {
            history.push(`https://eazr-backend.onrender.com/images/${imageName}`);
            res.json({ imageUrl: `https://eazr-backend.onrender.com/images/${imageName}` });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/history', (req, res) => {
    res.json({ history });
});

app.post('/add-to-cart', (req, res) => {
    const { imageUrl, price } = req.body;
    cart.push({ imageUrl, price });
    res.json({ message: 'Image added to cart successfully' });
});

app.get('/cart', (req, res) => {
    res.json({ cart });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
