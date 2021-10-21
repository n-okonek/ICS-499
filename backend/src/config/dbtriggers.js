import db from './db.js';

export const createRomHashTrigger = () => {
    db.query(`
    DROP TRIGGER IF EXISTS blobhash;
    `);

    db.query(`
    CREATE TRIGGER blobhash BEFORE INSERT ON rom
    FOR EACH ROW
    BEGIN
    SET new.romhash = SHA1(new.romdata);
    END;
    `)
}