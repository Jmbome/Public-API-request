// global variables
let employees = [];
const urlAPI = 'https://randomuser.me/api/?results=12&nat=us';
const gridContainer = document.querySelector(".gallery");
const modal = document.querySelector("modal");


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

    //Append employeeHTML to gallery
    gridContainer.insertAdjacentHTML('beforeend', employeeHTML);
}



function displayModal(index) {
    // use object destructuring make our template literal cleaner
    let { email, location, name, phone, picture, dob, nat } = employees[index];
  let month = new Date(dob.date).getMonth();
  let day = new Date(dob.date).getDay();
  let year = new Date(dob.date).getFullYear();

  // Create the modal window
  const modalHTML = `
      <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src=${picture.large} alt="profile picture">
                <h3 id="name" class="modal-name cap">${name.first} ${name.last}</h3>
                <p class="modal-text">${email}</p>
                <p class="modal-text cap">${location.city}</p>
                <hr>
                <p class="modal-text">${phone}</p>
                <p class="modal-text">${location.street.number} ${location.street.name}, ${location.city}, ${nat},  ${location.postcode}</p>
                <p class="modal-text">Birthday: ${day}/${month}/${year}</p>
            </div>
            <div class="modal-btn-container">
                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
                </div>
            </div>
        </div>
      `;
     // appends modalHtml to gallery 
      gridContainer.insertAdjacentHTML('afterend',modalHTML);
   
              
  
       // target elements in the modal window
  const closeBtn = document.getElementById('modal-close-btn');
  const nextBtn = document.getElementById('modal-next');
  const prevBtn = document.getElementById('modal-prev');
  const modalWindow = document.querySelector('.modal-container');
 

  //   Handler close button
  closeBtn.addEventListener('click', () => {
    modalWindow.remove();
  });

  // Handler Next button
  nextBtn.addEventListener('click', () => {
    modalWindow.remove();

    if (index >= employees.length - 1) {
      index = 0;
      displayModal(index);
    } else {
      index++;
      displayModal(index);
    }
  });

  // Handler Prev button
  prevBtn.addEventListener('click', () => {
    modalWindow.remove();

    if (index === 0) {
      prevBtn.style.display='none';
      displayModal(index);
    } else {
      index--;
      displayModal(index);
    }
  });
  


  
            
}
  //select appended cards in gallery
const cards = document.querySelectorAll('#gallery .card');

  gridContainer.addEventListener('click', e => {
    // make sure the click is not on the gridContainer itself
    if (e.target !== gridContainer) {
        // select the card element based on its proximity to actual element

        const card = e.target.closest(".card");
        let index = card.getAttribute("data-index");
        displayModal(index);
    }
});


//*********************SEARCH AREA***************************** */

// Filter Handler
function searchEmployee(input) {
    const filteredEmployees = [];
  
    employees.forEach((employee) => {
      //   join the first and the last name
      const fullName = employee.name.first + employee.name.last;
      // Checks for input match
      if (fullName.toUpperCase().includes(input.toUpperCase())) {
        filteredEmployees.push(employee);
      }
    });
    //  empty the gallery
    gridContainer.innerHTML = '';
  
    //   Generate a new gallery
    displayEmployees(filteredEmployees);
  }

  
  // Handler search
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('search-input');
    searchEmployee(input.value);

  });

