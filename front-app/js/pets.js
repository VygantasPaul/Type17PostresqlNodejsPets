
const BASE_URL = 'http://localhost:3008/v1/pets';
const PET_URL = 'http://localhost:3008/v1/pet/';
const responseWrap = document.querySelector('.response');
const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};

const showData = (pets) => {
    if (pets.length === 0) {
        createResponseAlert('There are no pets');
    } else {
        pets.forEach(pet => {
            console.log(pet)
            const petWrap = document.querySelector('#pet-list-wrap');
            const petAnchorWrap = document.createElement('div');
            petAnchorWrap.setAttribute('class', 'pet-item');

            const petTitle = document.createElement('h2');
            petTitle.setAttribute('class', 'pet-name');
            petTitle.innerHTML = `<small> #${pet.id} </small> ${pet.name}  `;

            const date = new Date(pet.dob);
            const formattedDate = date.toLocaleDateString('lt-LT');

            const petDob = document.createElement('h4');
            petDob.setAttribute('class', 'pet-dob');
            petDob.innerHTML = formattedDate;

            const petEmail = document.createElement('h3');
            petDob.setAttribute('class', 'pet-email');
            petEmail.innerHTML = pet.client_email;

            const carDelete = document.createElement('a');
            carDelete.setAttribute('class', 'btn delete-btn');
            carDelete.textContent = "Delete";
            carDelete.setAttribute('data-pet-id', pet.id);

            const detailsLog = document.createElement('a');
            detailsLog.setAttribute('class', 'btn view-log');
            detailsLog.textContent = "View Log";
            detailsLog.setAttribute("href", "./log.html?petId=" + pet.id);


            const buttonsDiv = document.createElement('div');
            buttonsDiv.setAttribute('class', 'buttons')
            buttonsDiv.append(detailsLog, carDelete)

            petAnchorWrap.append(petTitle, petDob, petEmail, buttonsDiv);
            petWrap.append(petAnchorWrap)

        });

    }
}

const deletePet = async (petId) => {
    try {
        const response = await fetch(`${PET_URL}${petId}`, {
            method: "PUT",
            body: JSON.stringify({
                isarchived: true,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            alert('Pet successfuly deleted')
            setTimeout(() => {
                window.location.replace("./pets.html");
            }, 3000)
        } else {
            createResponseAlert('Pet was not deleted');
        }
    } catch (error) {
        console.log('Error', error)
    }
};

document.addEventListener('click', async (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const petId = e.target.dataset.petId;
        await deletePet(petId);
    }
});

const fetchData = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (response.ok) {
            const data = await response.json();
            const pets = data.response;
            showData(pets)
        } else {
            console.error('Network response was not ok', response.status, response.statusText);
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData()