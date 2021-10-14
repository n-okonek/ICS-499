import db from './db.js';

export const createRomHashTrigger = () => {
    db.query(`
    DROP TRIGGER IF EXISTS blobhash;
    `)
    db.query(`
    CREATE trigger blobhash before insert on rom
    for each row 
    begin
	set new.romhash = md5(new.romdata);
    end;
    `);
}