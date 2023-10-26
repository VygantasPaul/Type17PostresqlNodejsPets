const ADD_URL = "http://localhost:3008/v1/add-pet/";
const responseWrap = document.querySelector('.response');
const button = document.getElementById('pet-add');

const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};
const getValues = () => {
    const petName = document.querySelector('#pet-name').value;
    const petDob = document.querySelector('#pet-dob').value;
    const petEmail = document.querySelector('#pet-client-email').value;

    const pet = {
        name: petName,
        dob: petDob,
        client_email: petEmail,
    }

    return pet

}
const insertValues = async (pet) => {
    console.log(pet)
    try {
        let response = await fetch(ADD_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pet),
        });

        const petData = await response.json();

        return petData;

    } catch (error) {
        console.error('Error:', error);
    }

}
const onCheckPet = (petData) => {
    if (petData) {
        const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
        const name = document.querySelector('#pet-name').value;
        const dob = document.querySelector('#pet-dob').value;
        const email = document.querySelector('#pet-client-email').value;
        responseWrap.innerHTML = '';
        if (!name || !dob || !email) {   // validation
            createResponseAlert('Please fill all fields');
            return false;
        } else if (!dobRegex.test(dob)) {
            createResponseAlert('Date format not right');
            return false;
        } else {

            createResponseAlert('Pet successfully Added');
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
    const pet = getValues();
    if (onCheckPet(pet)) {
        const insertedPet = await insertValues(pet);
        if (!insertedPet) {
            return false
        }
    }
});
