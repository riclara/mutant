
const supertest = require('supertest')
const { app, server } = require('../src/index.js')
const request = supertest(app)

const { disconnect } = require('../src/db.js')

describe('API test', () => {
    afterAll(async () => {
        setTimeout(async () => {
            await disconnect()
            await server.close()
        }, 3000);

    });

    describe('GET /', () => {
        it('default path should response status 200', async () => {
            const res = await request.get('/');

            expect(res.status).toBe(200);
        });
    });

    describe('GET /stats', () => {
        it('stats path should response status 200', async () => {
            const res = await request.get('/stats');

            expect(res.status).toBe(200);
        });

        it('stats body response should have count_mutant_dna attribute', async () => {
            const res = await request.get('/stats');

            expect(res.body.count_mutant_dna).not.toBeNull()
        });

        it('stats body response should have count_human_dna attribute', async () => {
            const res = await request.get('/stats');

            expect(res.body.ratio).not.toBeNull()
        });

        it('stats body response should have ratio attribute', async () => {
            const res = await request.get('/stats');

            expect(res.body.ratio).not.toBeNull()
        });
    });

    describe('POST /mutant', () => {
        it('diagonal desc match should response status 200', async () => {
            const res = await request.post('/mutant')
                .send({
                    dna: ['ATGCGA', 'CAGTAC', 'TTATGC', 'AGAAGG', 'CCCATA', 'TCACTG']
                });

            expect(res.status).toBe(200);
        });

        it('diagonal asc matc should response status 200', async () => {
            const res = await request.post('/mutant')
                .send({
                    dna: ['GTGAGA', 'CAATAC', 'TAATGC', 'AGAAGG', 'CCCATA', 'TCACTG']
                });

            expect(res.status).toBe(200);
        });

        it('vertical match should response status 200', async () => {
            const res = await request.post('/mutant')
                .send({
                    dna: ['TTGCGA', 'CAGTGC', 'TTATGC', 'AGAAGG', 'CCCATA', 'TCACTG']
                });

            expect(res.status).toBe(200);
        });

        it('horizontal match should response status 200', async () => {
            const res = await request.post('/mutant')
                .send({
                    dna: ['TTGCGA', 'CAGTAC', 'TTATGC', 'AGAAGG', 'CCCCTA', 'TCACTG']
                });

            expect(res.status).toBe(200);
        });

        it('whitout match should response status 403', async () => {
            const res = await request.post('/mutant')
                .send({
                    dna: ['TTGCGA', 'CAGTAC', 'TTATGC', 'AGAAGG', 'CCCTTA', 'TCACTG']
                });

            expect(res.status).toBe(403);
        });
    });
});