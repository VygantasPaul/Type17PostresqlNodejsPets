const db = require("../db");

const ALL_PETS = async (req, res) => {
    try {
        const pets = await db.query("SELECT * from public.pets");
        return res.status(201).json({ response: pets.rows, status: "Pets" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
const GET_PETS_NO_ARCHIVVED = async (req, res) => {
    try {
        const pet = await db.query(`SELECT * FROM Pets WHERE isArchived = false;`);
        return res.status(201).json({ response: pet.rows, status: "Pets is unarchved" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: "something went wrong" });
    }

}
const GET_PET_BY_ID = async (req, res) => {
    try {
        const petId = await db.query(`SELECT * FROM Pets WHERE isArchived = false AND id = ${req.params.id};`);
        return res.status(201).json({ response: petId.rows[0], status: "Pet by id" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ response: "something went wrong" });
    }

}
const ADD_PET = async (req, res) => {
    try {
        const pet = await db.query(`INSERT INTO public.pets (name, dob, client_email, isArchived) 
            VALUES ('${req.body.name}', '${req.body.dob}', '${req.body.client_email}', false)`);
        return res.status(201).json({ response: pet.rows[0], status: "Added Pet" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }
}

const DELETE_PET = async (req, res) => {
    try {
        const petID = req.params.id;
        const pet = await db.query(`UPDATE pets SET isarchived = true WHERE id=${petID}`);
        return res.status(201).json({ response: pet.rows, status: "Pet deleted" })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ response: "something went wrong" });
    }

}
module.exports = { ALL_PETS, ADD_PET, GET_PETS_NO_ARCHIVVED, DELETE_PET, GET_PET_BY_ID } 