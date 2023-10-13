document.addEventListener('DOMContentLoaded', () => {
    const animalList = document.getElementById('animal-list');
    const animalDetails = document.getElementById('animal-details');

    // Function to fetch and display the list of animals
    const displayAnimalList = async () => {
        try {
            const response = await fetch('http://localhost:3000/characters');
            const data = await response.json();
            
            // Clear the existing list
            animalList.innerHTML = '';
            
            // Create a list of animal names with links to their details
            data.forEach((animal) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<a href="#" data-id="${animal.id}">${animal.name}</a>`;
                animalList.appendChild(listItem);
            });
            
            // Add event listeners for animal name links
            animalList.querySelectorAll('a').forEach((link) => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const animalId = e.target.getAttribute('data-id');
                    displayAnimalDetails(animalId);
                });
            });
        } catch (error) {
            console.error('Error fetching animal list:', error);
        }
    };

    // Function to fetch and display animal details
    const displayAnimalDetails = async (animalId) => {
        try {
            const response = await fetch(`http://localhost:3000/characters/${animalId}`);
            const animal = await response.json();

            // Display the animal details
            animalDetails.innerHTML = `
                <h2>${animal.name}</h2>
                <img src="${animal.image}" alt="${animal.name}">
                <p>Votes: ${animal.votes}</p>
                <button id="vote-btn">Vote</button>
            `;

            // Add event listener for voting
            const voteButton = document.getElementById('vote-btn');
            voteButton.addEventListener('click', () => {
                // You can implement the logic to increase the votes here
                // For example: send a PATCH request to update votes
            });
        } catch (error) {
            console.error('Error fetching animal details:', error);
        }
    };

    // Initial display of animal list
    displayAnimalList();
});


voteButton.addEventListener('click', () => {
    // Get the animal ID from the currently displayed details
    const animalId = // Get the animal ID from your data (e.g., from the currently displayed animal details)

    // Make a POST request to update votes on the server
    fetch(`http://localhost:3000/characters/vote/${animalId}`, {
        method: 'POST',
    })
    .then((response) => {
        if (response.ok) {
            // If the vote was successfully submitted, update the UI
            const votesElement = document.querySelector('#animal-details p');
            // Extract the current vote count
            const currentVotes = parseInt(votesElement.innerText.split(' ')[1]);
            // Update the displayed vote count
            votesElement.innerText = `Votes: ${currentVotes + 1}`;
        } else {
            console.error('Failed to submit the vote.');
        }
    })
    .catch((error) => {
        console.error('Error while submitting the vote:', error);
    });
});

