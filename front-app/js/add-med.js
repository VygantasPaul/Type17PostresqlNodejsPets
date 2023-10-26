const ADD_URL = "http://localhost:3008/v1/add-med/";

const responseWrap = document.querySelector('.response');
const button = document.getElementById('med-add');

const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};
const getValues = () => {
    const medName = document.querySelector('#med-name').value;
    const medDescription = document.querySelector('#med-description').value;

    const med = {
        name: medName,
        description: medDescription,
    }

    return med

}
const insertValues = async (med) => {

    try {
        let response = await fetch(ADD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(med),
        });

        const medData = await response.json();

        return medData;

    } catch (error) {
        console.error('Error:', error);
    }

}
const onCheckMed = (medData) => {
    if (medData) {
        const name = document.querySelector('#med-name').value;
        const description = document.querySelector('#med-description').value;
        responseWrap.innerHTML = '';
        if (!name || !description) {
            createResponseAlert('Please fill all fields');
            return false;
        } else {
            createResponseAlert('Medification successfully Added');
            setTimeout(() => {
                window.location.replace("./meds.html");
            }, 3000)
            return true;
        }
    } else {
        return false
    }
}
button.addEventListener('submit', async (e) => {
    e.preventDefault();
    const med = getValues();
    if (onCheckMed(med)) {
        const insertedMed = await insertValues(med);
        if (!insertedMed) {
            return false
        }
    }
});
