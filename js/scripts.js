// global variables
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".gallery");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector("body");
const modalClose = document.querySelector(".modal-close-btn");


fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log('sorry an error just occurred',error))


function displayEmployees(employeeData) {
    employees = employeeData;
    // store the employee HTML as we create it
    let employeeHTML = '';
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let state = employee.location.state;
        let picture = employee.picture;
        // template literals make this so much cleaner!
        employeeHTML +=

            `<div class="card" data-index="${index}">
                <div class="card-img-container">
                    <img class="card-img" src="${picture.large}" alt="profile picture">
                    </div>
                    <div class="card-info-container">
                        <h3 id="name" class="card-name cap">${name.first} ${name.last} last</h3>
                        <p class="card-text">${email}</p>
                        <p class="card-text cap">${city},${state}</p>
                    </div>
                </div>`

    });
    gridContainer.insertAdjacentHTML('beforeend', employeeHTML);
}



function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML =

        `<div class="modal-container hidden">
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src="${picture.large}" alt="profile picture">
                        <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                        <p class="modal-text">${email}</p>
                        <p class="modal-text cap">${city}</p>
                        <hr>
                        <p class="modal-text">${phone}</p>
                        <p class="modal-text">${street.number} ${street.name}, ${state} ${postcode}</p>
                        <p class="modal-text">Birthday:${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
                    </div>
                </div>
                <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>`


     
    modalContainer.insertAdjacentHTML('beforeend',modalHTML);
}


gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
        // select the card element based on its proximity to actual element

        const card = e.target.closest(".card");
        let index = card.getAttribute("data-index");
        displayModal(index);
    }
});


