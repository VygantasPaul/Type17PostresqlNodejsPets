const db = require("../db");

const ALL_LOGS = async (req, res) => {
    try {
        const logs = await db.query(`SELECT * from public.logs INNER JOIN pets ON logs.pet_ID = pets.id`);
        return res.status(201).json({ response: logs.rows, status: "Logs" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
const LOGS_BY_ID = async (req, res) => {
    try {
        const logs = await db.query(`SELECT * from public.logs INNER JOIN pets ON logs.pet_ID = pets.id WHERE pets.id = ${req.params.id}`);
        return res.status(201).json({ response: logs.rows, status: "Logs" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
const DELETE_BY_ID = async (req, res) => {
    try {
        const logs = await db.query(`DELETE from public.logs WHERE id = ${req.params.id}`);
        return res.status(201).json({ response: logs.rows, status: "Logs" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
const ADD_LOG = async (req, res) => {
    try {
        const log = await db.query(`INSERT INTO public.logs (pet_id, status, description) VALUES 
        ('${req.body.pet_id}','${req.body.status}','${req.body.description}')`);
        return res.status(201).json({ response: log.rows[0], status: "Added log" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
module.exports = { ALL_LOGS, ADD_LOG, LOGS_BY_ID, DELETE_BY_ID }