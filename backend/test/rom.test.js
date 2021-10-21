import fetch from 'node-fetch';
import { expect } from 'chai';
import request from 'supertest';
import { refreshDB } from './helper.js';

import { app } from '../src/app.js';
import db from '../src/config/db.js';
import rom from '../src/models/rom.js';

describe('GET /rom', () => {
    before(async() => {
        await refreshDB();
    })

    it('should respond with json', () => {
        request(app)
            .get('/rom')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end((err, res) => {
                if (err) console.log(err);
            });
    })
});

describe('GET /rom/:romid', () => {
    let romid = null;
    let get = null;

    before(async() => {
        await refreshDB();
    })

    beforeEach(async() => {
        // delete records from rom
        await db.query('DELETE FROM rom;');
        const response = await fetch('http://localhost:9001/rom', {
            method: 'POST',
            body: JSON.stringify({
                name: 'test',
                romdata: 'another one'
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await response.json();
        romid = json.romid;

        get = request(app)
            .get(`/rom/${romid}`)
            .set('Accept', 'application/json')
            .expect(200)
    })

    it('should return 200 status code', () => {
        get.expect(200)
    })

    it('should return a response containing rom fields', () => {
        const REQUIRED_FIELDS = Object.keys(rom.rawAttributes);

        get.end((err, res) => {
            expect(res).to.have.property('body');
            const { body } = res;
            console.log('body');
            console.log(body);
            const responseFields = Object.keys(body);
            // Ensure that length of required fields equals length of response fields
            expect(responseFields.length).to.equal(REQUIRED_FIELDS.length);
            // Go through each field in required fields and check that it exists in response
            let sameFields = true;
            REQUIRED_FIELDS.forEach(field => {
                if (!responseFields.includes(field)) {
                    sameFields = false;
                }
            })
            expect(sameFields).to.be.true;
        });
    })

    it('should contain non-null fields in body', () => {
        get.end((err, res) => {
            const { body } = res;
            const fields = Object.keys(body);
            fields.forEach(field => {
                expect(body[field], `field ${field} is null`).to.not.be.null;
            });
        });
    })
})

describe('POST /rom', () => {
    let post = null;

    before(async() => {
        await refreshDB();
    })

    beforeEach(async() => {
        // delete records from rom
        await db.query('DELETE FROM rom;');
        post = request(app)
            .post('/rom')
            .send({
                name: "A random ROM",
                romdata: "a rom's blob here"
            })
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
    })

    it('should return 200 status code', () => {
        post.expect(200);
    });

    it('should return body with fields', () => {
        post.end((err, res) => {
            expect(res.body).to.not.be.null;
        })
    });

    it('should have fields in the body that match the ROM model', () => {
        // romhash is not returned in post response because it is computed after insert (trigger)
        const REQUIRED_FIELDS = Object.keys(rom.rawAttributes).filter(field => field !== 'romhash');
        post.end((err, res) => {
            const { body } = res;
            const responseFields = Object.keys(body);
            // Ensure that length of required fields equals length of response fields
            expect(responseFields.length).to.equal(REQUIRED_FIELDS.length);
            // Go through each field in required fields and check that it exists in response
            let sameFields = true;
            REQUIRED_FIELDS.forEach(field => {
                if (!responseFields.includes(field)) {
                    sameFields = false;
                }
            })
            expect(sameFields).to.be.true;
        })
    })

})