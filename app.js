const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu')

menu.addEventListener('click', () => {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active')
})

//Model items

const model = document.getElementById('email-model');
const openBtn = document.querySelector('.main-btn ');
const btnName = document.querySelector('.btn-name')
const closeBtn = document.querySelector('.close-btn');

//click-events

openBtn.addEventListener('click', () => {
    model.style.display = 'block';
});
btnName.addEventListener('click', () => {
    model.style.display = 'block';
});
closeBtn.addEventListener('click', () => {
    model.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === model) {
        model.style.display = 'none';
    }
});

// //form validation
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');

function showError(input, message) {
    let formvalidation = input.parentElement;
    formvalidation.className = 'form-validation error ';
    let errorMessage = formvalidation.querySelector('p');
    errorMessage.innerHTML = message;

}

function showValid(input) {
    const formvalidation = input.parentElement;
    formvalidation.className = 'form-validation valid';
}

function checkRequired(inputarray) {
    inputarray.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is not valid`);
        } else {
            showValid(input)
        }

    })
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min}`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max}`);
    } else {
        showValid(input);
    }
}

function passwordMatch(input1, input2) {
    if (input1.value != input2.value) {
        showError(input2, `password Doesn't match`)
    }
}

function getFieldName(input) {
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    checkRequired([name, email, password, passwordConfirm]);
    checkLength(name, 3, 30);
    checkLength(password, 8, 25);
    checkLength(passwordConfirm, 8, 25);
    passwordMatch(password, passwordConfirm);

})


//popup Imgwindow

let galleryImages = document.querySelectorAll('.services-cell');
let getlatestOpenedImg;
let windowWidh = window.innerWidth;

galleryImages.forEach(function(image, index) {
    image.onclick = function() {
        getlatestOpenedImg = index + 1;
        const container = document.body;
        const newImageWindow = document.createElement('div');
        container.appendChild(newImageWindow);
        newImageWindow.setAttribute('class', 'img-window');
        newImageWindow.setAttribute('onclick', 'closeImg()');

        let newImg = image.firstElementChild.cloneNode();
        newImageWindow.appendChild(newImg);
        newImg.classList.remove('services-cell-img');
        newImg.setAttribute('class', 'popup-img');
        newImg.setAttribute('id', 'current-img');

        newImg.onload = function() {
            let newNextBtn = document.createElement('a');
            newNextBtn.innerHTML = '<i class="fas fa-angle-right"></i>';
            container.appendChild(newNextBtn);
            newNextBtn.setAttribute('class', 'img-btn-next');
            newNextBtn.setAttribute('onclick', 'changeImg(1)');

            let newPrevBtn = document.createElement('a');
            newPrevBtn.innerHTML = '<i class="fas fa-angle-left"></i>';
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute('class', 'img-btn-prev');
            newPrevBtn.setAttribute('onclick', 'changeImg(0)');
        }


    }
})

function closeImg() {
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();
}

function changeImg(change) {
    document.querySelector('#current-img').remove();

    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if (change === 1) {
        calcNewImg = getlatestOpenedImg + 1;
        if (calcNewImg > galleryImages.length) {
            calcNewImg = 1
        }
    } else if (change === 0) {
        calcNewImg = getlatestOpenedImg - 1;
        if (calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute('src', '/Gallery/img-' + calcNewImg + '.jpg');
    newImg.setAttribute('class', 'popup-img');
    newImg.setAttribute('id', 'current-img');
    console.log(galleryImages.length);

    getlatestOpenedImg = calcNewImg;

}