const pets = [ 
    { "name": "Buddy", "type": "Dog", "age": 3, "img": "images/dogs/dog01.jpg" }, 
    { "name": "Kylo", "type": "Dog", "age": 4, "img": "images/dogs/dog02.jpg" }, 
    { "name": "Max", "type": "Dog", "age": 2, "img": "images/dogs/dog03.jpg" }, 
    { "name": "Whiskers", "type": "Cat", "age": 2, "img": "images/cats/cat01.jpg" }, 
    { "name": "Mittens", "type": "Cat", "age": 3, "img": "images/cats/cat02.jpg" },
    { "name": "Luna", "type": "Cat", "age": 1, "img": "images/cats/cat03.jpg" }, 
    { "name": "Sunny", "type": "Bird", "age": 1, "img": "images/birds/bird01.jpg" }, 
    { "name": "Sky", "type": "Bird", "age": 2, "img": "images/birds/bird02.jpg" }, 
    { "name": "Choco", "type": "Capybara", "age": 5, "img": "images/capybaras/capybara01.jpg" },
    { "name": "Bara", "type": "Capybara", "age": 3, "img": "images/capybaras/capybara02.jpg" }
];
function loadPets(){
    // Get the container
    const petList = document.getElementById('pet-list');

    // Loop through pets and add to the page
    for (let i = 0; i < pets.length; i++) {
        const pet = pets[i];
        petList.innerHTML += `
            <div class="pet">
                <img src="${pet.img}" alt="Cute ${pet.type}">
                <h3>${pet.name}</h3>
                <p>Age: ${pet.age} years</p>
                <p>${pet.type}</p>
                <button onclick="adoptPet()">Adopt Now</button>
            </div>
        `;
    }
}

function loadFeaturedPets() {
    const featuredPets = document.getElementById('featured-pets');
    // Find first dog
    const dog = pets.find(pet => pet.type === "Dog");
    // Find first cat
    const cat = pets.find(pet => pet.type === "Cat");
    const featuredArray = [ dog, cat ];

    featuredArray.forEach(pet => {
        featuredPets.innerHTML += `
            <div class="pet">
                <img src="${pet.img}" alt="Cute ${pet.type}">
                <h3>${pet.name}</h3>
                <p>Age: ${pet.age} years</p>
                <p>${pet.type}</p>
                <button onclick="adoptPet()">Adopt Now</button>
            </div>
        `;
    });
}

function filterPets() {
    const types = Array.from(document.querySelectorAll('input[name="pet-type"]:checked'))
        .map(cb => cb.value);

    const filteredPets = pets.filter(pet => types.includes(pet.type));

    const petList = document.getElementById("pet-list");
    petList.innerHTML = "";

    filteredPets.forEach(pet => {
        const petItem = document.createElement("div");
        petItem.className = "pet";
        petItem.innerHTML = `
            <img src="${pet.img}" alt="Cute ${pet.type}">
            <h3>${pet.name}</h3>
            <p>Type: ${pet.type}</p>
            <p>Age: ${pet.age} years</p>
            <button class="adopt-btn">Adopt Now</button>
        `;
        petList.appendChild(petItem);
    });
}

function adoptPet() {
    alert("Thank you for your interest in adopting! Our team will contact you soon.");
}

// Only call loadPets if pet-list exists
if (document.getElementById('pet-list')) {
    loadPets();
}

// Only call loadFeaturedPets if featured-pets exists
if (document.getElementById('featured-pets')) {
    loadFeaturedPets();
}

document.addEventListener("DOMContentLoaded", function() {
    // Attach event listeners to checkboxes
    document.querySelectorAll('input[name="pet-type"]').forEach(cb => {
        cb.addEventListener("change", filterPets);
    });
    filterPets(); // Show all on load
});