/* adds the laptop cards to display the picture of the laptops and specs in the left bar*/
    fetch('./data.json')
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
            element.addEventListener("click", () => appendToURL(laptop.href));
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

    const height = element.offsetHeight; // Includes padding + border (but not margin)
    return height;
    }

    // adding padding to the top of the container
    const leftAndMainContainer = document.querySelector("#leftAndMain");
    leftAndMainContainer.style.paddingTop = getElementHeight("#navigationBar") + "px";

/* function to render the laptop specs in the individual laptop page */
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementsByClassName("laptopPage")[0];
        const laptopSpecsDiv = document.getElementsByClassName("laptopSpecs")[0];
        data.forEach(laptop => {

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
        });
    })
    .catch(error => {
        console.error('Failed to load JSON:', error);
    });

/* function to append to the current url */

    function appendToURL(suffix) {
        const currentURL = window.location.href;
        const newURL = currentURL + suffix;

        history.pushState(null, '', newURL);
    }

/* upon clicking on a laptop card, change the url */

