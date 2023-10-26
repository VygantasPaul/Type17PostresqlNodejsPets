const db = require("../db");

const ALL_RESCRIPTIONS = async (req, res) => {
    try {
        const prescriptions = await db.query(`SELECT * from public.prescriptions`);
        return res.status(201).json({ response: prescriptions.rows, status: "Prescriptions" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}

const GET_PRESCRIPTION_BY_ID = async (req, res) => {
    try {
        const prescriptions = await db.query(`SELECT 
        pets.name AS pet_name, 
        medications.name AS medication_name, 
        medications.description AS medication_description, 
        prescriptions.comment AS prescriptions_comment, 
        prescriptions.timestamp AS prescriptions_timestamp,
        logs.description AS log_description,
        logs.status AS log_status,
        pets.dob AS pet_dob
        FROM 
        public.prescriptions 
        INNER JOIN pets ON prescriptions.pet_id = pets.id 
        INNER JOIN medications ON prescriptions.medication_id = medications.id
        INNER JOIN logs ON pets.id = logs.pet_id
         WHERE pets.id = ${req.params.id}`);
        return res.status(201).json({ response: prescriptions.rows, status: "Prescription ID" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}


const ADD_PRESCRIPTION = async (req, res) => {
    try {
        if (!req.body.comment || !req.body.medication_id || !req.body.pet_id) {
            return res.status(400).json({ response: "All fields are required" });
        }
        const pet = await db.query(`INSERT INTO public.prescriptions (comment,timestamp, medication_id, pet_id) VALUES ('${req.body.comment}',CURRENT_TIMESTAMP, '${req.body.medication_id}','${req.body.pet_id}')`);
        return res.status(201).json({ response: pet.rows[0], status: "Added medication" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
module.exports = { GET_PRESCRIPTION_BY_ID, ADD_PRESCRIPTION, ALL_RESCRIPTIONS } 