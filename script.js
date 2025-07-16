const topLeftAndMainPadding = 10;

// Fetches laptop data from a local JSON file and dynamically generates HTML cards
// to display each laptop's image, name, and specifications in the left sidebar.
    fetch('/site_laptopuri/data-ar.json') // fetch the JSON file that contains information about laptops
    .then(response => response.json()) // parse the response as JSON
    .then(data => {
        // get the parent container element where laptop cards will be displayed
        const container = document.getElementById('containerLaptopuri');

        // Clear existing content inside the container
        container.innerHTML = '';

        // iterate over each laptop entry in the JSON file
        data.forEach(laptop => {
            // create a div element for the laptop card
            const laptopDiv = document.createElement('div');
            laptopDiv.classList.add('leftSideLaptop'); // add a class to the div for CSS styling

            // populate the inner HTML of the laptop card with relevant information:
            // photo, name, a few specs
            laptopDiv.innerHTML = `
                <a href="${laptop.href}" target="_blank"> <!-- Link to the detailed laptop page -->
                    <img src="${laptop.src}" alt="${laptop.numeLaptop}"> <!-- Laptop image -->
                    ${laptop.numeLaptop} <!-- Laptop's name -->
                </a>
                
                <!-- Laptop specs (unordered) list -->
                <ul>
                    <li><strong>CPU:</strong> ${laptop.specificatii.cpu}</li>
                    <li><strong>GPU:</strong> ${laptop.specificatii.gpu}</li>
                    <li><strong>RAM:</strong> ${laptop.specificatii.ramCapacity}</li>
                    <li><strong>Storage:</strong> ${laptop.specificatii.romCapacity} ${laptop.specificatii.storageType}</li>
                    <li><strong>Display:</strong> ${laptop.specificatii.display}</li>
                    <li><strong>OS:</strong> ${laptop.specificatii.OS}</li>
                </ul>
            `;

            container.appendChild(laptopDiv);

            const element = laptopDiv.querySelector("a");
            element.addEventListener("click", (e) => {
                e.preventDefault();
                appendToMain(laptop.href);
            });
        });
    })
    .catch(error => {
        console.error('Failed to load JSON:', error);
    });


    // function to calculate the height of a HTML element
    function getElementHeight(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn('Element not found');
        return null;
        }

    const height = element.offsetHeight + topLeftAndMainPadding; // Includes padding + border (but not margin)
    return height;
    }

    function getElementWidth(selector) {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn('Element not found');
            return null;
            }
        
        const width = element.offsetWidth;
        console.log("width of that: " + width);
        return width;
    } 

    // adding padding to the top of the container
    const leftAndMainContainer = document.querySelector("#leftAndMain");
    leftAndMainContainer.style.paddingTop = getElementHeight("#navigationBar") + "px";

    const specsPage = document.querySelector("#laptopSpecsPage");
    specsPage.style.left = getElementWidth("#containerLaptopuri") + "px";

/* function to render the laptop specs in the individual laptop page */

function displayLaptopSpecs(href) {
    fetch('/site_laptopuri/data-ar.json')
    .then(response => response.json())
    .then(data => {
        const laptop = data.find(item => item.href === href);
        if (!laptop) return;

        const laptopSpecsDiv = document.getElementsByClassName("laptopSpecs")[0];

            console.log("laptop:" + laptop);
            
            const specs = laptop.specificatii;

            const ceva = "<"
            for (const key in specs)
            {
                const value = specs[key];
                {
                    console.log("spefificatie: " + key);
                }
            }
    
            laptopSpecsDiv.innerHTML = `
                <ul>
                    <li><strong>Nume Laptop:</strong> ${laptop.numeLaptop}</li>
                    <li><strong>CPU:</strong> ${laptop.specificatii.cpu}</li>
                    <li><strong>GPU:</strong> ${laptop.specificatii.gpu}</li>
                    <li><strong>RAM:</strong> ${laptop.specificatii.ramCapacity}</li>
                    <li><strong>Storage:</strong> ${laptop.specificatii.romCapacity} ${laptop.specificatii.storageType}</li>
                    <li><strong>Display:</strong> ${laptop.specificatii.display}</li>
                    <li><strong>OS:</strong> ${laptop.specificatii.OS}</li>
                </ul>
            `;

    })
    .catch(error => {
        console.error('Failed to load JSON:', error);
    });
}

/* function to append to the current url */

    function appendToMain(suffix) {
        displayLaptopSpecs(suffix);

        const baseURL = "http://127.0.0.1:5500/site_laptopuri/demo.html";
        const newURL = baseURL + suffix;

        console.log("base URL: " + baseURL);
        console.log("new url: " + newURL);

        history.pushState(null, '', newURL);
    }


/* upon clicking on a laptop card, change the url */

