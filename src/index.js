const express = require('express');
const app = express();
const isMutant = require('./mutant.js');


app.set('port', process.env.PORT || 3000);
app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.post('/mutant', (req, res) => {
    const body = req.body;

    const result = isMutant(body.dna)

    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
})

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});
