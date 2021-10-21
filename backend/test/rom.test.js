import { expect } from 'chai';
import request from 'supertest';

import { app } from '../src/app.js';
import db from '../src/config/db.js';
import rom from '../src/models/rom.js';

describe('GET /rom', () => {
    it('responds with json', done => {
        request(app)
            .get('/rom')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err)
                done()
            })
    })
});

describe('POST /rom', () => {
    let post = null;
    beforeEach(async() => {
        // truncate tables before posts
        await db.truncate({ cascade: true })
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