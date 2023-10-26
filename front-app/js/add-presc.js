const ADD_URL = "http://localhost:3008/v1/add-prescription/";
const prescriptions_URL = "http://localhost:3008/v1/prescriptions/";
const LOGS_URL = "http://localhost:3008/v1/logs/";
const responseWrap = document.querySelector('.response');
const button = document.getElementById('presc-add');

const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};
const populateSelectBoxPrescriptions = (prescriptions) => {
    const selectBox = document.querySelector('#presc-medication-id');

    selectBox.innerHTML = ''; // Clear existing options

    const existingIds = new Set();
    prescriptions.forEach((item) => {
        if (!existingIds.has(item.medication_id)) {
            console.log(item)
            const option = document.createElement('option');
            option.value = item.medication_id;
            option.text = "Medication ID:" + item.medication_id;
            selectBox.appendChild(option); // Append the option to the select box
            existingIds.add(item.medication_id)
        }
    });
};
const populateSelectBoxLogs = (pets) => {
    const selectBox = document.querySelector('#presc-pet-id');
    selectBox.innerHTML = ''; // Clear existing options

    const existingIds = new Set(); // Create a set to store existing IDs

    pets.forEach((item) => {
        if (!existingIds.has(item.pet_id)) {
            const option = document.createElement('option');
            option.value = item.pet_id;
            option.text = "Pet ID:" + item.pet_id;
            selectBox.appendChild(option); // Append the option to the select box
            existingIds.add(item.pet_id); // Add the ID to the set
        }
    });
};
const getValues = () => {
    const prescComment = document.querySelector('#presc-comment').value;
    const prescPetId = document.querySelector('#presc-pet-id').value;
    const prescMedId = document.querySelector('#presc-medication-id').value;

    const prescription = {
        comment: prescComment,
        pet_id: prescPetId,
        medication_id: prescMedId
    }

    return prescription

}
const insertValues = async (prescription) => {

    try {
        let response = await fetch(ADD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(prescription),
        });

        const prescriptionData = await response.json();

        return prescriptionData;

    } catch (error) {
        console.error('Error:', error);
    }

}
const onCheckPresc = (prescriptionData) => {
    if (prescriptionData) {
        const comment = document.querySelector('#presc-comment').value;
        const pet_id = document.querySelector('#presc-pet-id').value;
        const medication_id = document.querySelector('#presc-medication-id').value;
        responseWrap.innerHTML = '';
        if (!comment || !pet_id || !medication_id) {
            createResponseAlert('Please fill all fields');
            return false;
        } else {
            createResponseAlert('Prescriptions successfully Added');
            setTimeout(() => {
                window.location.replace("./pets.html");
            }, 3000)
            return true;
        }
    } else {
        return false
    }
}
button.addEventListener('submit', async (e) => {
    e.preventDefault();
    const presc = getValues();
    if (onCheckPresc(presc)) {
        const insertedPresc = await insertValues(presc);
        if (!insertedPresc) {
            return false
        }
    }
});


const fetchPrescriptions = async () => {
    try {
        const response = await fetch(prescriptions_URL);
        if (response.ok) {
            const data = await response.json();
            const prescriptions = data.response;
            populateSelectBoxPrescriptions(prescriptions)

        } else {
            console.error('Network response was not ok', response.status, response.statusText);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchPrescriptions()

const fetchPets = async () => {
    try {
        const response = await fetch(LOGS_URL);
        if (response.ok) {
            const data = await response.json();
            const pets = data.response;
            populateSelectBoxLogs(pets)

        } else {
            console.error('Network response was not ok', response.status, response.statusText);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchPets()
