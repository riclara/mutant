const { MongoClient } = require('mongodb');


const dbPassword = process.env.DB_PASSWORD || 'mutant123';
const dbName = process.env.DB_NAME || 'mutants_dev';
const dbCollection = process.env.DB_COLLECTION || 'dnas_dev';
const uri = `mongodb+srv://mutant:${dbPassword}@cluster0.7d8dv.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

function isConnected() {
    return !!client && !!client.topology && client.topology.isConnected()
}

async function connect() {
    if (!isConnected()) {
        return client.connect()
    }
}

async function disconnect() {
    if (isConnected()) {
        return client.close()
    }
}


async function saveDna(dna, isMutant) {
    try {
        await connect()

        const database = client.db(dbName)
        const dnas = database.collection(dbCollection)

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
        await connect()

        const database = client.db(dbName)
        const dnas = database.collection(dbCollection)

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

        const humans = result.humans[0] ? result.humans[0].value : 0
        const mutants = result.mutants[0] ? result.mutants[0].value : 0
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
    stats,
    connect,
    disconnect,
}