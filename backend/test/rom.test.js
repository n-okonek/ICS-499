import got from 'got';
import crypto from 'crypto';
import { expect } from 'chai';
import request from 'supertest';
import { refreshDB } from './helper.js';

import { app } from '../src/app.js';
import db from '../src/config/db.js';

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
        const json = await got.post('http://localhost:9001/rom', {
            json: {
                name: 'test',
                romdata: 'another one'
            }
        }).json();
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
        const REQUIRED_FIELDS = Object.keys(db.rom.rawAttributes);

        get.end((err, res) => {
            expect(res).to.have.property('body');
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
    });
})

describe('POST /rom', () => {
    let post = null;
    let dummyBody = {
        name: "A random ROM",
        romdata: "a rom's blob here"
    }

    before(async() => {
        await refreshDB();
    })

    beforeEach(async() => {
        // delete records from rom
        await db.sequelize.query('DELETE FROM rom;');
        post = request(app)
            .post('/rom')
            .send(dummyBody)
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
        const REQUIRED_FIELDS = Object.keys(db.rom.rawAttributes);
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
    });

    it('should create a rom entity with fields that match the request body', async() => {
        post.end((err, res) => {
            const { body } = res;
            expect(body.name, 'name in response is not equal to post data').to.be.equal(dummyBody.name);
            expect(body.romdata, 'data in response is not equal to post data').to.be.equal(dummyBody.romdata);
        })
    });

    it('should create a rom entity with a romhash equal to SHA1(romdata)', () => {
        post.end((err, res) => {
            const { body } = res;
            const sha = crypto.createHash('sha1');
            sha.update(dummyBody.romdata);
            const dummyHash = sha.digest('hex');
            expect(body.romhash).to.be.equal(dummyHash);
        })
    });

    it('should create a rom entity which can be fetched by id', async() => {
        post.end(async(err, res) => {
            const { body } = res;
            const { romid } = body;

            const json = await got.get(`http://localhost:${process.env.PORT}/rom/${romid}`).json();
            expect(romid).to.be.equal(json.romid);
            expect(json.name).to.be.equal(dummyBody.name);
        })
    });

})