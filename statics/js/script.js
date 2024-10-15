
let pages = Array.from(document.querySelectorAll('.book-page'));
let currentZIndex = 10;

// Update pages array on initialization
function updatePagesArray() {
    pages = Array.from(document.querySelectorAll('.book-page'));
}

pages.forEach((page, index) => {
    page.addEventListener('click', () => flipPage(index));
});

function flipPage(index) {
    const page = pages[index];
    const innerContent = page.querySelector('.book-inner-c'); 

    console.log(`Flipping page: ${page.id || 'Page ' + (index + 1)}`);

    if (page.style.transform !== 'rotateY(-150deg)') {
        page.style.transform = 'rotateY(-150deg)';
        page.style.zIndex = currentZIndex++;
        
        setTimeout(() => {
            innerContent.style.opacity = '0';
        }, 100);

        console.log(`Page ${index + 1} z-index: ${page.style.zIndex}`);
    } else {
        page.style.transform = 'rotateY(0deg)';
        page.style.zIndex = currentZIndex++;
        
        setTimeout(() => {
            innerContent.style.opacity = '1';
        }, 100);

        console.log(`Resetting page: ${page.id || 'Page ' + (index + 1)}`);
        console.log(`Page ${index + 1} z-index: ${page.style.zIndex}`);
    }
}

// Handle page addition
const addPageButton = document.getElementById('add-pen');
const pagesContainer = document.getElementById('book-inside');

// Keep track of the page number
let pageCount = pagesContainer.getElementsByClassName('book-page').length;

addPageButton.addEventListener('click', () => {
    //addPageButton.style.display = 'none';
    
    pageCount++;

    // Create a new page element
    const newPage = document.createElement('div');
    newPage.classList.add('book-page');
    newPage.innerHTML = `
    <div class="book-inner-c">
        <div class="page-footer">
            <span class="page-number">${pageCount - 1}</span>
            <input type="date" class="page-date" value="2027-04-16">
            <input type="text" class="page-author" value="mm Doe">
            <div class="nextpage"></div>
        </div>
        <div class="page-content">
            <div class="userprofile">
                <img src="./statics/files/806533.png" alt="User Profile">
                <p>
                    <input type="text" name="username" value="John Doe"><br>
                    <input type="text" value="sc201/3031/2023"><br>
                    Student
                </p>
            </div>
            <textarea class="pg-info-header" placeholder="Content title e.g. The Great Adventure!">The Great Adventure</textarea>
            <textarea class="pg-info" placeholder="content e.g. Welcome to The Great Adventure!">Welcome to The Great Adventure!</textarea>
        </div>
    </div>
`;


    pagesContainer.append(newPage);

    // Update the pages array
    updatePagesArray();
    let updated_pages = Array.from(document.querySelectorAll('.book-page'))//fetching all the new pages
    newPage.addEventListener('click', () => flipPage(updated_pages.length - 1));

});


//handle 3d rotation
const sphere = document.getElementById('book-container');
let isDragging = false;
let previousX, previousY;
let rotationX = 0, rotationY = 0;
const maxRotation = 10; // Maximum rotation limit (in degrees)

sphere.addEventListener('mousedown', (e) => {
    isDragging = true;
    previousX = e.clientX;
    previousY = e.clientY;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const deltaX = e.clientX - previousX;
        const deltaY = e.clientY - previousY;

        // Update rotation values based on mouse movement
        rotationX = Math.max(-maxRotation, Math.min(maxRotation, rotationX - deltaY * 0.1));
        rotationY = Math.max(-maxRotation, Math.min(maxRotation, rotationY + deltaX * 0.1));

        // Apply the constrained rotation to the sphere
        sphere.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

        // Update previous mouse position
        previousX = e.clientX;
        previousY = e.clientY;
    }
});

