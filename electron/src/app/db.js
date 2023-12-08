const sqlite3 = require('sqlite3').verbose();
const { createFileAsync, loadConfiguration, initTempFolder } = require('./file-app');

const dbConf = loadConfiguration( 'db.json' );
let fileCreated = '';

const initDB = async () => {
  try {
    initTempFolder();
    fileCreated = await createFileAsync( dbConf.dbname );
    console.info('DB startet in:', fileCreated );
    const db = startCnx();
    db.serialize(() => {

      dbConf.v1.create_tables.forEach( script => {
        db.run(script, (err) => {
          if(err){ console.log( err ); return; }
        });
      });

      dbConf.v1.triggers.forEach( script => {
        db.run(script, (err) => {
          if(err){ console.log( err ); return; }
        });
      });

    });
    closeCnx( db );
  } catch (error) {
    console.error('Error al crear el archivo temporal:', error);
  }
}

const insert = (tableName, data) => {
  let db = startCnx();
  return new Promise((resolve, reject) => {
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const sql = `INSERT INTO ${tableName} (${Object.keys(data).join(', ')}) VALUES (${placeholders})`;
    db.run(sql, values, function (err) {
      if (err) {
        console.log( err.message );
        reject(0);
      } else {
        resolve(data.id);
      }
      closeCnx( db );
    });
  });
}

const insertBatch = (tableName, data) => {
  let db = startCnx();
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run('BEGIN TRANSACTION');
      data.forEach((item) => {
        const placeholders = Object.keys(item).map(() => '?').join(', ');
        const values = Object.values(item);
        const sql = `INSERT INTO ${tableName} (${Object.keys(item).join(', ')}) VALUES (${placeholders})`;
        db.run(sql, values, function (err) {
          if (err) {
            console.log(err.message);
            db.run('ROLLBACK');
            reject(0);
          }
        });
      });
      db.run('COMMIT', () => {
        resolve();
      });
      closeCnx(db);
    });
  });
};

const update = (tableName, data, whereClause) => {
  const db = startCnx();
  return new Promise((resolve, reject) => {
    const updateFields = Object.keys(data)
      .map((key) => `${key} = ?`)
      .join(', ');
    const values = Object.values(data);
    const sql = `UPDATE ${tableName} SET ${updateFields} WHERE ${whereClause}`;
    db.run(sql, values, function (err) {
      if (err) {
        console.log( err );
        reject(err.message);
        return;
      }
      resolve(this.changes);
    });
    closeCnx( db );
  });
}

const query = (tableName, selectFields = '*', whereClause = '', params = []) => {
  const db = startCnx();
  return new Promise((resolve, reject) => {
    const sql = `SELECT ${selectFields} FROM ${tableName} ${whereClause}`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
    closeCnx( db );
  });
}

const sql = (query, params = []) => {
  const db = startCnx();
  return new Promise((resolve, reject) => {
    const sql = `${query}`;
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
      closeCnx( db );
    });
  });
}

const startCnx = () => {
  return new sqlite3.Database(fileCreated, (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
  });
};

const closeCnx = ( db ) => {
  db.close();
}

module.exports = { initDB, insert, insertBatch, query, sql, update }
