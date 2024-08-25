const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST Endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input format' });
        }

        // Separate numbers and alphabets
        const numbers = data.filter(item => !isNaN(item) && item.trim() !== '');
        const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));

        // Determine the highest lowercase alphabet
        const lowerCaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
        const highestLowercase = lowerCaseAlphabets.sort().pop() || '';

        const user_id = 'john_doe_17091999'; // Hardcoded for example
        const email = 'john@xyz.com'; // Hardcoded for example
        const roll_number = 'ABCD123'; // Hardcoded for example

        res.json({
            is_success: true,
            user_id,
            email,
            roll_number,
            numbers,
            alphabets,
            highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ is_success: false, message: 'Internal Server Error' });
    }
});

// GET Endpoint
app.get('/bfhl', (req, res) => {
    try {
        res.status(200).json({ operation_code: 1 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
