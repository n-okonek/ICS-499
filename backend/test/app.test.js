import { assert, expect } from 'chai';

import db from '../src/config/db.js';

describe('Sequelize Object', () => {
    it('should not be null', () => {
        expect(db).to.not.be.null
    });

    it('should authenticate to database', async() => {
        try {
            await db.authenticate()
        } catch (e) {
            assert.fail('DB object did not authenticate')
        }
    })
})