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
    const elements = selectedSection.querySelectorAll('p, h1, h2, h3, #about-img, .project-card');
    elements.forEach(element => {
        element.classList.remove('show-line-visible'); // Reset the visibility class
        element.classList.add('show-line'); // Ensure the initial hidden state is applied
    });

    // Re-apply the visible class with a delay for animation
    elements.forEach((element, index) => {

        if (element.classList.contains("project-card")) {
            setTimeout(() => {
                element.classList.add('show-line-visible');
            }, index * 100); // Adjust the timing as needed
        }

        setTimeout(() => {
            element.classList.add('show-line-visible');
        }, index * 250); // Adjust the timing as needed    
    });

    // Update the current section ID
    currentSectionId = sectionId;  
}


// Show the home section on page load
document.addEventListener('DOMContentLoaded', () => {
    showSection(new Event('load'), 'home');
});

