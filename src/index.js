// State
let ramens = [];

const ramenMenu = document.getElementById('ramen-menu');

    fetch('http://localhost:3000/ramens')
    .then(res => res.json())
    .then(data => {
        ramens = data
        selectedRamenId = data[0].id
        resetMenu();
    });

const resetMenu = () => {
    ramens.forEach(ramen => {
        addRamenMenu(ramen)
    });
};

const addRamenMenu = (ramen) => {
    const ramenMenuImg = document.createElement('img')
    ramenMenuImg.src = ramen.image
    ramenMenuImg.dataset.id = ramen.id
    ramenMenu.append(ramenMenuImg)
};

const detailImg = document.querySelector('#ramen-detail img.detail-image');
const detailName = document.querySelector('#ramen-detail>.name');
const detailRestaurant = document.querySelector('#ramen-detail>.restaurant');
const ratingDisplay = document.querySelector('#rating-display');
const commentDisplay = document.querySelector('#comment-display');

ramenMenu.addEventListener('click', (e) => {
    if(e.target.tagName === 'IMG'){
        console.log(selectedRamenId)
        selectedRamenId = e.target.dataset.id
        setRamenDetailsById(selectedRamenId)
    }
});

const setRamenDetailsById = (id) => {
    const selected = ramens.find(r => r.id === parseInt(id));
    console.log(selected);

    detailImg.src = selected.image
    detailName.textContent = selected.name
    detailRestaurant.textContent = selected.restaurant
    ratingDisplay.textContent = selected.rating
    commentDisplay.textContent = selected.comment
}

// HTML Elements

const newRamenForm = document.querySelector('#new-ramen')
const newRamenNameInput = document.querySelector('#new-ramen>#new-name')
const newRamenRestaurantInput = document.querySelector('#new-ramen>#new-restaurant')
const newRamenImageInput = document.querySelector('#new-ramen>#new-image')
const newRamenRatingInput = document.querySelector('#new-ramen>#new-rating')
const newRamenCommentInput = document.querySelector('#new-ramen>#new-comment')


const listenNewRamenForm = () => {
    newRamenForm.addEventListener('submit', (e) => {
        e.preventDefault()
        let newRamen = {
            name: newRamenNameInput.value,
            restaurant: newRamenRestaurantInput.value,
            image: newRamenImageInput.value, 
            rating: newRamenRatingInput.value,
            comment: newRamenCommentInput.value,
        }
        postRamen(newRamen);
    })
}

listenNewRamenForm();

const postRamen = (ramenData) => {
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(ramenData),
    })
        .then((res) => res.json)
        .then((data) => {
            ramens.push(data);
            addRamenMenu(data);
        })
        .catch((error) => {
            console.error('Error:', error)
        });
};