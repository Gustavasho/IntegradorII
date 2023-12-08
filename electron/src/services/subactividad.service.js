const assert = require('assert');
const db = require('../app/db');
const uuidv4 = require('../app/uuid').uuidv4;
const PARAM_STATUS = require('../app/constants').PARAM_STATUS;

const table_name = "subactividad";
const fields_selected = "id, actividad_code, name, fecha_inicio, fecha_fin, fecha_registro, estado, cant_ocurrencias, registed_by, status";
const where_status = 'where status=?';

const save = async (formdata) => {
    formdata.id = uuidv4();
    formdata.status = PARAM_STATUS.ACTIVE;
    return db.insert(table_name, formdata);
}

const listAll = async () => {
    return db.query(table_name, fields_selected, where_status, [PARAM_STATUS.ACTIVE]);
}

const update = (id, objeto) => {
    return new Promise(async (res, rej) => {
        try {
            const idobjeto = await db.update(table_name, objeto, `id='${id}'`);
            res(idobjeto);
        } catch (e) {
            rej(e.message);
        }
    });
}

const remove = (id) => {
    return new Promise(async (res, rej) => {
        try {
            const idobjeto = await db.update(table_name, { status: PARAM_STATUS.INACTIVE }, `id='${id}'`);
            res(idobjeto);
        } catch (e) {
            rej(e.message);
        }
    });
}

module.exports = {
    save,
    listAll,
    update,
    remove
}