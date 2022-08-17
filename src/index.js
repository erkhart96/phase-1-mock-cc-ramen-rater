// write your code here

// Fetch Data
const fetchRamen = () => {
    return fetch('http://localhost:3000/ramens')
    .then((res) => res.json())
    .then((ramen) => renderRamens(ramen))
}

// Render ramen images
const renderRamens = (ramen) => {
    ramen.forEach(ramens => {
        const container = document.getElementById('ramen-menu')
        const ramenImage = document.createElement('img')
        ramenImage.src = ramens.image
        ramenImage.className = "ramen-images"
        console.log(ramens);
        container.appendChild(ramenImage)
    });
};

// Handle ramen image click event from #ramen-menu and display that inside of #ramen-detail
    document.addEventListener('click', (ramens) => {
        const ramenDetailDiv = document.getElementById('ramen-detail');
        const imageContainer = document.getElementsByClassName('ramen-images');
        const divImage = document.createElement('img');
        divImage.src = ramens.image;
        imageContainer.appendChild(divImage);
        ramenDetailDiv.appendChild(imageContainer);
});

// const ramenTarget = () => {
//     const ramenDetailDiv = document.getElementById('ramen-detail')
//     const imageContainer = document.getElementsByClassName('ramen-images')
//     const divImage = document.createElement('img')
//     divImage.src = ramens.image
//     imageContainer.appendChild(divImage)
//     ramenDetailDiv.appendChild(imageContainer)
// }


// Function invocations
fetchRamen();
renderRamens();