const BASE_URL = 'http://localhost:3008/v1/meds/';
const url = new URL(window.location.href)

const showToScreen = (data) => {
    console.log(data)
    data.forEach(med => {
        const medsWrap = document.querySelector('#med-list-wrap')
        const logWrapInner = document.createElement('div')
        logWrapInner.setAttribute('class', 'med-item')

        const medName = document.createElement('h2')
        medName.setAttribute('id', 'med-name')
        medName.innerHTML = `<small> #${med.id} </small> ${med.name}  `;
        const medDescription = document.createElement('h4')
        medDescription.setAttribute('id', 'med-description')
        medDescription.innerHTML = ` ${med.description}`;

        medsWrap.append(logWrapInner)
        logWrapInner.append(medName, medDescription)
    });

}

const getMed = async () => {
    let response = await fetch(BASE_URL);
    try {
        if (response.ok) {
            const pet = await response.json();
            return pet;
        }

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const displayData = async () => {
    const med_data = await getMed();
    if (med_data) {
        const data = med_data.response;
        showToScreen(data)
    }

}

displayData()