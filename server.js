const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');


connectDB();

// Definte Routes


const app = express();
app.use(express.json({extended: false}));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));


app.use(cors());

app.get('/', (req, res) => {
    res.json({message: 'Hello World'})
})

app.listen(PORT, () => {
    console.log('Server started on PORT: ', PORT);
})

