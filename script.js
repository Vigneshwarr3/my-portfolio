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
    const elements = selectedSection.querySelectorAll('p, h1, h2, h3, #about-img, .project-card, .tag-buttons');
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


// Populate the tag buttons dynamically


// Keep track of selected tags
const selectedTags = new Set();

window.onload = function () {
    const tags = new Set();
    document.querySelectorAll('.project-card .tags .tag span:last-child').forEach(tagElement => {
        tags.add(tagElement.textContent.trim());
    });

    const tagButtonsContainer = document.getElementById('tag-buttons');

    // Add "All" button
    const allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.className = 'tag-button active'; // Mark "All" as active by default
    allButton.setAttribute('data-tag', 'all');
    allButton.onclick = () => {
        selectedTags.clear(); // Clear all selected tags
        filterProjects(); // Show all projects
        updateActiveTags();
    };
    tagButtonsContainer.appendChild(allButton);

    // Add individual tag buttons
    tags.forEach(tag => {
        const button = document.createElement('button');
        button.textContent = tag;
        button.className = 'tag-button';
        button.setAttribute('data-tag', tag);
        button.onclick = () => {
            if (selectedTags.has(tag)) {
                selectedTags.delete(tag); // Remove tag if it's already selected
            } else {
                selectedTags.add(tag); // Add tag if it's not already selected
            }
            filterProjects();
            updateActiveTags();
        };
        tagButtonsContainer.appendChild(button);
    });

    // Show all projects by default on page load
    filterProjects();
};

// Filter projects based on selected tags
function filterProjects() {
    const projects = document.querySelectorAll('.project-card');

    projects.forEach(project => {
        const projectTags = Array.from(project.querySelectorAll('.tags .tag span:last-child')).map(tag => tag.textContent.trim());

        if (selectedTags.size === 0 || [...selectedTags].some(tag => projectTags.includes(tag))) {
            project.style.display = 'block'; // Show project
        } else {
            project.style.display = 'none'; // Hide project
        }
    });
}

// Update the active state of the tag buttons
function updateActiveTags() {
    document.querySelectorAll('#tag-buttons .tag-button').forEach(button => {
        const tag = button.getAttribute('data-tag');
        if (tag === 'all') {
            button.classList.toggle('active', selectedTags.size === 0); // Highlight "All" if no tags are selected
        } else {
            button.classList.toggle('active', selectedTags.has(tag)); // Highlight individual tags if they are selected
        }
    });
}