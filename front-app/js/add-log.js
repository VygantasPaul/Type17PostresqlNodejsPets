const ADD_URL = "http://localhost:3008/v1/add-log/";
const LOGS_URL = "http://localhost:3008/v1/logs/";

const responseWrap = document.querySelector('.response');
const form = document.getElementById('log-add');

const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};
const populateSelectBox = (pets) => {
    const selectBox = document.querySelector('#log-pet-id');
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
    const logtStatus = document.querySelector('#log-status').value;
    const logDescription = document.querySelector('#log-description').value;
    const logSelectbox = document.querySelector('#log-pet-id').value;

    const log = {
        pet_id: logSelectbox,
        status: logtStatus,
        description: logDescription,
    }

    return log

}
const insertValues = async (log) => {

    try {
        let response = await fetch(ADD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(log),
        });

        const logData = await response.json();

        return logData;

    } catch (error) {
        console.error('Error:', error);
    }

}
const onCheckPet = (logData) => {
    if (logData) {
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        const status = document.querySelector('#log-status').value;
        const description = document.querySelector('#log-description').value;
        responseWrap.innerHTML = '';
        if (!status || !description) {   // validation
            createResponseAlert('Please fill all fields');
            return false;
        } else {

            createResponseAlert('Log successfully Added');
            setTimeout(() => {
                window.location.replace("./pets.html");
            }, 3000)
            return true;
        }
    } else {
        return false
    }
}
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const log = getValues();

    if (onCheckPet(log)) {
        const insertedLog = await insertValues(log);
        if (!insertedLog) {
            return false
        }
    }

});

const fetchLogs = async () => {
    try {
        const response = await fetch(LOGS_URL);
        if (response.ok) {
            const data = await response.json();
            const pets = data.response;
            populateSelectBox(pets)

        } else {
            console.error('Network response was not ok', response.status, response.statusText);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchLogs()
