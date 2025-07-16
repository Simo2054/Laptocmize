const topLeftAndMainPadding = 10;
/* adds the laptop cards to display the picture of the laptops and specs in the left bar*/
    fetch('/site_laptopuri/data-ar.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('containerLaptopuri');

        // Clear existing content
        container.innerHTML = '';

        data.forEach(laptop => {
            const laptopDiv = document.createElement('div');
            laptopDiv.classList.add('leftSideLaptop');

            laptopDiv.innerHTML = `
                <a href="${laptop.href}" target="_blank">
                    <img src="${laptop.src}" alt="${laptop.numeLaptop}">
                    ${laptop.numeLaptop}
                </a>
                
                
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

