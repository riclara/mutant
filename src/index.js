const express = require('express');
const app = express();
const isMutant = require('./mutant.js');
const db = require('./db.js');


app.set('port', process.env.PORT || 3000);
app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200);
})

app.get('/stats', async (req, res) => {
    const resp = await db.stats()

    res.json(resp);
})

app.post('/mutant', (req, res) => {
    const dna = req.body.dna;

    const result = isMutant(dna)

    db.saveDna(dna.join(), result);

    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(403);
    }
})

const server = app.listen(app.get('port'), async () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

module.exports = { app, server };