const BASE_URL = 'http://localhost:3008/v1/prescription/';
const url = new URL(window.location.href);
const petId = url.searchParams.get("petId");

const responseWrap = document.querySelector('.response');
const createResponseAlert = (message) => {
    const responseAlert = document.createElement('div');
    responseAlert.setAttribute('class', 'response-alert');
    responseAlert.innerHTML = message;
    responseWrap.appendChild(responseAlert);
};

const showLogsButton = document.querySelector('.show_logs');
const showPrescriptionsButton = document.querySelector('.show_prescriptions');
const prescriptionsWrapOuter = document.querySelector('#prescriptions-wrap-outer');
const logsWrapOuter = document.querySelector('#logs-wrap-outer');

showLogsButton.addEventListener('click', async () => {
    showLogsButton.classList.toggle('active')
    logsWrapOuter.classList.toggle('d-none')
});
showPrescriptionsButton.addEventListener('click', async () => {
    showPrescriptionsButton.classList.toggle('active')
    prescriptionsWrapOuter.classList.toggle('d-none')
});

const showToScreenLogs = (data) => {
    const petName = document.querySelector('#heading-name');
    if (data.length > 0 && data[0].pet_name) {
        petName.innerHTML = `<strong>${data[0].pet_name}: Records</strong> `;
    } else {
        petName.innerHTML = "<strong>No records</strong>";
    }

    const logsDetails = document.querySelector('#pet-logs-wrap');

    const innerLogDiv = document.createElement('div');
    innerLogDiv.setAttribute('class', 'logs-wrap')

    const logsInnerTop = document.querySelector('#logs-wrap-outer');
    logsDetails.appendChild(logsInnerTop);
    logsInnerTop.append(innerLogDiv)

    if (data.length === 0) {
        createResponseAlert('Pet does not have logs');
    } else {
        data.forEach(log => {
            const logsDetailsInner = document.createElement('div');
            logsDetailsInner.classList.add('log-item-inner');

            const petStatus = document.createElement('h2');
            petStatus.innerHTML = `<strong>Status: </strong> ${log.log_status}`;

            const date = new Date(log.pet_dob);
            const formattedDate = date.toLocaleDateString('lt-LT');

            const petDob = document.createElement('h3');
            petDob.innerHTML = `<strong>Date of Birth: </strong> ${formattedDate}`;

            const petDesc = document.createElement('h4');
            petDesc.innerHTML = log.log_description ? `Description: ${log.log_description}` : 'No description';

            logsDetailsInner.appendChild(petStatus);
            logsDetailsInner.appendChild(petDob);
            logsDetailsInner.appendChild(petDesc);
            innerLogDiv.appendChild(logsDetailsInner);
        });
    }
};

const showToScreenPresc = (data) => {
    console.log(data);
    const petName = document.querySelector('#heading-name');
    if (data.length > 0 && data[0].pet_name) {
        petName.innerHTML = `<strong>${data[0].pet_name}: Records</strong> `;
    } else {
        petName.innerHTML = "<strong>No records</strong>";
    }

    const logsDetails = document.querySelector('#pet-logs-wrap');

    const innerPrescDiv = document.createElement('div');
    innerPrescDiv.setAttribute('class', 'prescriptions-wrap')

    const prescriptionsInnerTop = document.querySelector('#prescriptions-wrap-outer');
    logsDetails.appendChild(prescriptionsInnerTop);
    prescriptionsInnerTop.append(innerPrescDiv)

    if (data.length === 0) {
        createResponseAlert('Pet does not have prescriptions');
    } else {
        data.forEach(presc => {
            const logsDetailsInner = document.createElement('div');
            logsDetailsInner.classList.add('presc-item-inner');

            const petStatus = document.createElement('h2');
            petStatus.innerHTML = `<strong>Status: </strong> ${presc.prescriptions_comment}`;

            const date = new Date(presc.prescriptions_timestamp);
            const formattedDate = date.toLocaleDateString('lt-LT');

            const petDob = document.createElement('h3');
            petDob.innerHTML = `<strong>Date of Birth: </strong> ${formattedDate}`;

            logsDetailsInner.appendChild(petStatus);
            logsDetailsInner.appendChild(petDob);
            innerPrescDiv.appendChild(logsDetailsInner);
        });
    }
};

const getLogPresc = async () => {
    let response = await fetch(BASE_URL + petId);
    try {
        if (response.ok) {
            const pet = await response.json();
            return pet;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const displayDataLogs = async () => {
    const log = await getLogPresc();
    if (log) {
        const data = log.response;
        showToScreenLogs(data);
    }
};

const displayDataPresc = async () => {
    const presc = await getLogPresc();
    if (presc) {
        const data = presc.response;
        showToScreenPresc(data);
    }
};
displayDataLogs();
displayDataPresc()


