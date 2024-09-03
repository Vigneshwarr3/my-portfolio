// Show the home section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection(new Event('load'), 'home');
});

let currentSectionId = 'home'; // Track the current visible section

function showSection(event, sectionId) {
    event.preventDefault();

    // Check if the event is defined and is a click event
    if (event && event.type === 'click') {
        // If the clicked section is already visible, do nothing
        if (sectionId === currentSectionId) {
            return;
        }
    }

    // Hide all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('hidden');
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.remove('hidden');

    // Apply line-by-line animation
    const elements = selectedSection.querySelectorAll('p, h1, h3, #about-img');
    elements.forEach(element => {
        element.classList.remove('show-line-visible'); // Reset the visibility class
        element.classList.add('show-line'); // Ensure the initial hidden state is applied
    });

    // Re-apply the visible class with a delay for animation
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('show-line-visible');
        }, index * 250); // Adjust the timing as needed
    });

    // Update the current section ID
    currentSectionId = sectionId;  
}


// JavaScript function to show the projects section and hide other sections
function showProjectsSection(event, sectionId) {
    event.preventDefault(); // Prevent default link behavior
    
    // Hide all sections except the projects section
    var sections = document.querySelectorAll('section');
    sections.forEach(function(section) {
        if (section.id === sectionId) {
            section.classList.remove('hidden'); // Show projects section
        } else {
            section.classList.add('hidden'); // Hide other sections
        }
    });

    // Add fade-in animation to project cards
    var projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card, index) {
        setTimeout(function() {
            card.classList.add('fade-in');
        }, index * 150); // Add a delay for each card to create a stagger effect
    });

    currentSectionId = sectionId;
}

// Show the home section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection(new Event('load'), 'home');
});

