let ramens = []

const ramenMenu = document.getElementById('ramen-menu');

fetch('http://localhost:3000/ramens')
    .then((res) => res.json())
    .then((data) => {
        ramens = data
        selectedRamenId = data[0].id
        resetMenu();
    });

const addRamenMenu = (ramen) => {
    const ramenMenuImg = document.createElement('img')
    ramenMenuImg.src = ramen.image
    ramenMenuImg.dataset.id = ramen.id
    ramenMenu.append(ramenMenuImg);
};

const detailImg = document.querySelector('#ramen-detail>.detail-image')
const detailName = document.querySelector('#ramen-detail>.name')
const detailRestaurant = document.querySelector('#ramen-detail>.restaurant')
const ratingDisplay = document.querySelector('#rating-display')
const commentDisplay = document.querySelector('#comment-display')

ramenMenu.addEventListener('click', (e) => {
    if((e.target.tagName) === 'IMG') {
        selectedRamenId = e.target.dataset.id
        setRamenDetailsById(selectedRamenId)
    };
});

const setRamenDetailsById = (id) => {
    const selected = ramens.find((r) => r.id === parseInt(id));
    detailImg.src = selected.image
    detailName.textContent = selected.name
    detailRestaurant.textContent = selected.restaurant
    ratingDisplay.textContent = selected.rating
    commentDisplay.textContent = selected.comment
};

const resetMenu = () => {
    ramens.forEach(ramen => {
        addRamenMenu(ramen)
    });
};

const newRamenForm = document.querySelector('#new-ramen');
const newRamenName = document.querySelector('#new-ramen>#new-name');
const newRamenRestaurant = document.querySelector('#new-ramen>#new-restaurant');
const newRamenImage = document.querySelector('#new-ramen>#new-image');
const newRamenRating = document.querySelector('#new-ramen>#new-rating');
const newRamenComment = document.querySelector('#new-ramen>#new-comment');


newRamenForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let newRamen = {
    name: newRamenName.value,
    restaurant: newRamenRestaurant.value,
    image: newRamenImage.value,
    rating: newRamenRating.value,
    comment: newRamenComment.value,
}
    postRamen(newRamen);
}
);


const postRamen = (data) => {
    fetch('http://localhost:3000/ramens', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    ramens.push(data);
    addRamenMenu(data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
} 