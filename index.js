const express = require("express");
const cors = require("cors");
require("dotenv").config();
const petsRouter = require("./routes/pets");
const logsRouter = require("./routes/logs");
const medicationsRouter = require("./routes/medications");
const prescriptionsRouter = require("./routes/prescriptions");
const app = express();
app.use(express.json());
app.use(cors());

app.use(petsRouter);
app.use(logsRouter);
app.use(medicationsRouter);
app.use(prescriptionsRouter);
app.use((req, res) => {
    return res.status(404).json({ response: "Endpoint not exist" });
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`App started on port ${process.env.PORT}`);
});