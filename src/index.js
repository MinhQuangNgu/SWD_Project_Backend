const express = require('express'); 
const dotenv = require('dotenv');
const cors = require('cors');
const router = require('./router');
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

router(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log("listening on port",PORT);
});