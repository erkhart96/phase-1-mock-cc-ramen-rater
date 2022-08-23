// write your code here
// See all ramen images in the `div` with the id of `ramen-menu`. When the page
//   loads, request the data from the server to get all the ramen objects. Then,
//   display the image for each of the ramen using an `img` tag inside the
//   `#ramen-menu` div.

// Click on an image from the `#ramen-menu` div and see all the info about that
// ramen displayed inside the `#ramen-detail` div and where it says
// `insert comment here` and `insert rating here`.

let ramens = [];

const ramenMenu = document.querySelector('#ramen-menu');


fetch('http://localhost:3000/ramens')
.then((res) => res.json())
.then((data) => {
    console.log(data)
    ramens = data
    selectedRamenId = data[0].id
    ramenArray()
});

function ramenArray () {
    ramens.forEach ((ramen) => {
     renderMenu(ramen)
     imageClick()
    })
}

function renderMenu (ramen) {
        const ramenImg = document.createElement('img')
        ramenImg.src = ramen.image
        ramenMenu.append(ramenImg);
        ramenImg.dataset.id = ramen.id
        console.log(ramen);
    }



function imageClick () {
    const detailImage = document.querySelector('.detail-image')
    const ramenDetail = document.querySelector('#ramen-detail')
    ramenMenu.addEventListener('click', (e)=> {
        selectedRamenId = e.target.dataset.id
        ramenDetail.append(detailImage)
        displayDetailById(selectedRamenId)
    })
};

function displayDetailById (id) {
    const selected = ramens.find(oneRamen => oneRamen.id === parseInt(id))
    const image = document.querySelector('.detail-image')
    const name = document.querySelector('.name')
    const restaurant = document.querySelector('.restaurant')
    restaurant.textContent = selected.restaurant
    name.textContent = selected.name
    image.src = selected.image
    console.log(selected.name)
};



imageClick();