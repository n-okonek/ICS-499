import got from 'got';
import axios from 'axios';
import crypto from 'crypto';
import { expect } from 'chai';
import { step } from 'mocha-steps';
import request from 'supertest';
import { refreshDB } from './helper.js';

import { app } from '../src/app.js';
import db from '../src/config/db.js';

const PORT = 9001;
const REQUIRED_FIELDS = Object.keys(db.rom.rawAttributes);

const create_rom = async (romdata) => {
    const rom = await axios.post(`http://localhost:${PORT}/rom`, romdata);
    const json = rom.data
    return {
        status: rom.status,
        json: json
    };
}
const update_rom = async (romid, newdata) => {
    try {
        const rom = await axios.put(`http://localhost:${PORT}/rom/${romid}`, newdata);
        const json = rom.data
        return {
            status: rom.status,
            json: json
        };
    } catch (err) {
        return {
            status: err.response.status,
            json: err.response.data
        }
    }
}

const get_rom = async (romid) => {
    const rom = await axios.get(`http://localhost:${PORT}/rom/${romid}`);
    const json = rom.data;
    return {
        status: rom.status,
        json: json
    }
}

describe('GET /rom', () => {
    beforeEach(async() => {
        await refreshDB();
    })

    step('should respond with json', () => {
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
    const dummyData = {
        name: 'test',
        romdata: 'test data'
    };
    beforeEach(async() => {
        // delete records from rom
        await refreshDB();
    })

    step('should return 200 status code', async () => {
        const rom = await create_rom(dummyData);
        const { romid } = rom.json;
        const fetched = await get_rom(romid);
        expect(fetched.status).to.be.equal(200);
    })

    step('should return a response containing rom fields', async () => {
        const rom = await create_rom(dummyData);
        const { romid } = rom.json;
        const fetched = await get_rom(romid);
        const body = fetched.json;
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

    step('should contain non-null fields in body', async () => {
        const rom = await create_rom(dummyData);
        const { romid } = rom.json;
        const fetched = await get_rom(romid);
        const body = fetched.json;
        const fields = Object.keys(body);
        fields.forEach(field => {
            expect(body[field], `field ${field} is null`).to.not.be.null;
        });
    });
})

describe('POST /rom', () => {
    let dummyData = {
        name: "A random ROM",
        romdata: "a rom's blob here"
    }

    beforeEach(async() => {
        // delete records from rom
        await refreshDB();
    })

    step('should return 200 status code', async () => {
        const rom = await create_rom(dummyData);
        expect(rom.status).to.be.equal(200);
    });

    step('should return body with fields', async () => {
        const rom = await create_rom(dummyData);
        expect(rom.json).to.not.be.null;
    });

    step('should have fields in the body that match the ROM model', async () => {
        const rom = await create_rom(dummyData);
        const body = rom.json;
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

    step('should create a rom entity with fields that match the request body', async() => {
        const rom = await create_rom(dummyData);
        const body = rom.json;
        expect(body.name, 'name in response is not equal to post data').to.be.equal(dummyData.name);
        expect(body.romdata, 'data in response is not equal to post data').to.be.equal(dummyData.romdata);
    });

    step('should create a rom entity with a romhash equal to SHA1(romdata)', async () => {
        const rom = await create_rom(dummyData);
        const body = rom.json;
        const sha = crypto.createHash('sha1');
        sha.update(dummyData.romdata);
        const dummyHash = sha.digest('hex');
        expect(body.romhash).to.be.equal(dummyHash);
    });

    step('should create a rom entity which can be fetched by id', async () => {
        const rom = await create_rom(dummyData);
        const body = rom.json;
        const { romid } = body;
        const fetched_rom = await get_rom(romid);
        const json = fetched_rom.json;
        expect(romid).to.be.equal(json.romid);
        expect(json.name).to.be.equal(dummyData.name);
    });

})

describe('DELETE /rom/:romid', () => {
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
    })

    step('should return 200 when id exists', async() => {
        const rom_data = await create_rom(dummyBody);
        const id = rom_data.json.romid;
        const fetched = await get_rom(id);
        expect(fetched.status).to.be.equal(200);
    })

    step('should return 404 when id doesn\'t exist', async() => {
        // IDs are numeric, so a string id is automatically invalid
    })

    step('should return the data of the deleted ROM', async() => {
        const { romid } = await create_rom(dummyBody);
    })
})

describe('PUT /rom/:romid', () => {
    let dummyData = {
        name: "first title",
        romdata: "rom data"
    }

    beforeEach(async() => {
        await refreshDB();
    })

    step('should return 200 status if romid is valid and no response body', async () => {
        const created = await create_rom(dummyData);
        const romid = created.json.romid;
        const updated = await update_rom(romid, {});
        expect(updated.status).to.be.equal(200);
    })

    step('should return 404 status if romid is not valid', async () => {
        const created = await create_rom(dummyData);
        const romid = created.json.romid;
        const updated = await update_rom(123, {});
        expect(updated.status).to.be.equal(404);
    })
    
    step('updated data should be present in response', async () => {
        const created = await create_rom(dummyData);
        const romid = created.json.romid;
        const new_name = dummyData.name + "1";
        const new_romdata = dummyData.romdata + "1";
        const updated = await update_rom(romid, {
            name: new_name,
            romdata: new_romdata
        });
        
        const fetched = await get_rom(romid);
        const data = fetched.json;

        let sha = crypto.createHash('sha1');
        sha.update(new_romdata);
        const newHash = sha.digest('hex');
        
        expect(data.romhash).to.be.equal(newHash);
        expect(data.name).to.be.equal(new_name);
        
    })
});