const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://mutant:mutant123@cluster0.7d8dv.mongodb.net/mutants?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function saveDna(dna, isMutant) {
    try {
        await client.connect();
        const database = client.db("mutants");
        const dnas = database.collection("dnas");

        const resp = await dnas.updateOne(
            { dna },
            {
                $set: { dna, isMutant }
            },
            { upsert: true }
        )

        return resp.upsertedCount
    } catch (e) {
        console.log(e)
    }
}

async function stats() {
    try {
        await client.connect();
        const database = client.db("mutants");
        const dnas = database.collection("dnas");

        const aggCursor = await dnas.aggregate(
            [{
                $facet: {
                    humans: [{
                        $match: {
                            isMutant: false
                        }
                    }, { $count: 'value' }],
                    mutants: [{
                        $match: {
                            isMutant: true
                        }
                    }, { $count: 'value' }]
                }
            }]
        )

        const result = await aggCursor.next()

        const humans = result.humans[0].value
        const mutants = result.mutants[0].value
        const ratio = mutants == 0 ? 1 : humans / mutants

        return {
            count_mutant_dna: mutants,
            count_human_dna: humans,
            ratio
        }
    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    saveDna,
    stats
}