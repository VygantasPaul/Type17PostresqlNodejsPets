const db = require("../db");

const ALL_MEDICATIONS = async (req, res) => {
    try {
        const medications = await db.query("SELECT * from public.medications");
        return res.status(201).json({ response: medications.rows, status: "Medications" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
const ADD_MEDICATION = async (req, res) => {
    try {
        const pet = await db.query(`INSERT INTO public.medications (name,description) VALUES ('${req.body.name}','${req.body.description}')`);
        return res.status(201).json({ response: pet.rows[0], status: "Added medication" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}

module.exports = { ALL_MEDICATIONS, ADD_MEDICATION }