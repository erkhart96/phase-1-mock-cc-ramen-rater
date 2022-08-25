fetch('http://localhost:3000/ramens')
.then ((res) => res.json())
.then ((data) => data.forEach((ramen) => {
    renderRamen(ramen)
}));

const renderRamen = (ramenObj) => {
    const ramenMenu = document.querySelector('#ramen-menu');
    let ramenImage = document.createElement('img');
    ramenImage.src = ramenObj.image;
    ramenMenu.append(ramenImage);
    handleClick(ramenImage, ramenObj);
};

const handleClick = (image, ramen) => {
    image.addEventListener('click', () => {
        const detailImage = document.querySelector('.detail-image')
        const detailName = document.querySelector('.name')
        const detailRestaurant = document.querySelector('.restaurant')
        const detailRating = document.querySelector('#rating-display')
        const detailComment = document.querySelector('#comment-display')
        detailImage.src = ramen.image
        detailName.textContent = ramen.name
        detailRestaurant.textContent = ramen.restaurant
        detailRating.textContent = ramen.rating
        detailComment.textContent = ramen.comment
    });
};

const handleForm = () => {
    const submitForm = document.querySelector('#new-ramen');
    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let newName = e.target['name'].value;
        let newRes = e.target['restaurant'].value;
        let newImg = e.target['image'].value;
        let newRating = e.target['rating'].value;
        let newComment = e.target['new-comment'].value;
        const newRamenObj = {
            name: newName,
            restaurant: newRes,
            image: newImg,
            rating: newRating,
            comment: newComment
        };
        fetch('http://localhost:3000/ramens', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRamenObj)
        })
        .then((res) => res.json())
        .then((data) => renderRamen(data))
    });
};


handleForm();