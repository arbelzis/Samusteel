'use strict';

document.querySelector('.banner__video').playbackRate = '0.8';
document.querySelector('.banner__video').play();

const header = document.querySelector('.header');
const hamburger = document.querySelector('.header__hamburger');
const hamburgerLines = document.querySelectorAll('.header__hamburger-line');
const circleMenu = document.querySelector('.circle-menu');
const hiddenNav = document.querySelector('.hidden-nav');
const hiddenNavList = document.querySelector('.hidden-nav__list');

const progressBar = document.querySelector('.progressBar');
const scrollUp = document.querySelector('.scroll-up');

const mouseCursor = document.querySelector('.cursor');
const navUL = document.querySelector('.header__list');
const navLinks = document.querySelectorAll('.header__link'); // LIST OF <a>
const buttons = document.querySelectorAll('button');

window.addEventListener('scroll', () => {
    progressBar.style.width = `${(window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100}vw`
})


// SECTION SELECTORS
// ABOUT
const aboutSection = document.querySelector('.about');
const aboutsectionName = document.querySelector('.about__section-name');
const aboutBigHeader = document.querySelector('.about__big-header');
const aboutParagraph = document.querySelector('.about__paragraph');
const aboutOffers = document.querySelectorAll('.offers__container');

// SERIES
const seriesSection = document.querySelector('.series');
const seriesCards = document.querySelectorAll('.series__card');
const seriesCardFront = document.querySelectorAll('.series__card--front');
const seriesCardBack = document.querySelectorAll('.series__card--back');
const seriesReadMore = document.querySelectorAll('.series__card--more');
const seriesReadLess = document.querySelectorAll('.series__card--less');

// GALLERY
const gallerySection = document.querySelector('.gallery');
const galleryContainer = document.querySelector('.gallery__container');
const galleryImgs = document.querySelectorAll('.gallery__cell');
const overlayContainer = document.querySelector('.overlay__container');
const overlayCloseIcon = document.querySelector('.overlay__icon');
const overlay = document.querySelector('.overlay');

// CONTACT US
const contactSection = document.querySelector('.contact');
const contactContainer = document.querySelector('.container');
const currentInput = document.querySelector('.container__current-input');
const contactInputs = document.querySelectorAll('.container__input');
const sendButton = document.querySelector('.container__button');






const showContactText = (s) => {
    currentInput.classList.remove('container__current-input--active');

    setTimeout(() => {
        currentInput.classList.add('container__current-input--active');
    }, 1);

    setTimeout(() => {
        currentInput.innerText = s;
    }, 100);
}

contactInputs.forEach(el => {
    const textToShow = el.getAttribute('placeholder').replace(/[^a-zA-Z\s]/, '').split(' ').map(el => el[0].toUpperCase() + el.slice(1)).join(' ');

    el.addEventListener('focus', () => {
        const currentFocues = document.activeElement;
        if (currentFocues.classList.contains('container__input')) {
            if (textToShow != currentInput.innerText) {
                showContactText(textToShow);
            }
        }
    })
})

window.addEventListener('click', (e) => {
    if (!e.target.classList.contains('container__input') && currentInput.innerText != 'Get in touch with us') {
        showContactText('Get in touch with us');
    }
})

sendButton.addEventListener('focus', () => {
    if (currentInput.innerText != 'Get in touch with us') showContactText('Get in touch with us');
})



/////////////////////////////////////////
// HAMBURGER MENU OPENS & CLOSE

const closeMenu = () => {
    document.querySelector('body').classList.remove('stop-scrolling'); // ENABLE SCROLLING

    hamburgerLines[1].style.width = '100%';
    hamburgerLines[2].style.width = '100%';
    hamburgerOpen = false;
    hiddenNav.style.visibility = 'hidden';
    hiddenNav.style.opacity = '0';
    hamburger.classList.remove('sticky-ham');
    window.scrollTo(0, 0);


    circleMenu.classList.remove('circle-menu-active');
}

const openMenu = () => {
    document.querySelector('body').classList.add('stop-scrolling'); // STOP SCROLLING

    hamburgerLines[1].style.width = '66%';
    hamburgerLines[2].style.width = '33%';
    hamburgerOpen = true;
    hiddenNav.style.visibility = 'visible';
    hiddenNav.style.opacity = '1';
    hamburger.classList.add('sticky-ham');

    circleMenu.classList.add('circle-menu-active');
}

let hamburgerOpen = false;
hamburger.addEventListener('click', (e) => {
    if (!hamburgerOpen) {
        openMenu();
    } else {
        closeMenu();
    }
})

window.addEventListener('resize', () => {
    if (window.innerWidth > 950 && hamburgerOpen) {
        closeMenu();
    }
})








//////////////////////////////////////////
// MOUSE CURSOR

window.addEventListener('mousemove', (e) => {
    mouseCursor.style.cssText = `top: ${e.pageY - (mouseCursor.getClientRects()[0].height / 2)}px; left: ${e.pageX - (mouseCursor.getClientRects()[0].width / 2)}px;`
})

navLinks.forEach(link => {
    link.addEventListener('mouseover', () => {
        mouseCursor.classList.add('link-grow');
    })
    link.addEventListener('mouseout', () => {
        mouseCursor.classList.remove('link-grow');
    })
})

buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => {
        mouseCursor.classList.add('link-grow');
    });
    btn.addEventListener('mouseout', () => {
        mouseCursor.classList.remove('link-grow');
    });
})

galleryImgs.forEach(pic => {
    pic.addEventListener('mouseover', () => {
        mouseCursor.classList.add('link-grow');
    })
    pic.addEventListener('mouseout', () => {
        mouseCursor.classList.remove('link-grow');
    })
})

scrollUp.addEventListener('mouseover', () => {
    mouseCursor.classList.add('link-grow');
});
scrollUp.addEventListener('mouseout', () => {
    mouseCursor.classList.remove('link-grow');
})










///////////////////////////////////////
// SCROLLING INTO VIEW

const scrollToView = (text) => {
    if (text === 'ABOUT US') aboutSection.scrollIntoView({ behavior: "smooth" });
    if (text === 'OUR SERIES') seriesSection.scrollIntoView({ behavior: "smooth" });
    if (text === 'GALLERY') gallerySection.scrollIntoView({ behavior: "smooth" });
    if (text === 'CONTACT US') contactContainer.scrollIntoView({ behavior: "smooth" });
}

navUL.addEventListener('click', (e) => {
    if (e.target.classList.contains('header__link')) {
        e.preventDefault();
        scrollToView(e.target.innerText);
    }
});

hiddenNavList.addEventListener('click', (e) => {
    if (e.target.classList.contains('hidden-nav__link')) {
        e.preventDefault();
        closeMenu();
        setTimeout(() => {
            scrollToView(e.target.innerText);
        }, 400);
    }
})

scrollUp.addEventListener('click', () => {
    closeOverlay();
    setTimeout(() => {
        header.scrollIntoView({ behavior: "smooth" });
    }, 175);
})








/////////////////////////////////////////////////////////
// OBSERVERS

// SCROLL UP VISIBLITY

const scrollUpObserver = new IntersectionObserver(function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) {
        scrollUp.classList.add('scroll-up-active');
    } else {
        scrollUp.classList.remove('scroll-up-active');
    }
}, {
    root: null,
    threshold: 0,
    rootMargin: '0px 0px 0px 0px'
})
scrollUpObserver.observe(document.querySelector('.banner'));

// ABOUT SECTION REVEILING ELEMENTS

let delayTime = 0.5;
aboutOffers.forEach(offer => {
    offer.style.transition = `opacity 1s ${delayTime}s ease`;
    delayTime += 0.3;
})

const aboutBigObs = new IntersectionObserver(function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        aboutBigHeader.style.opacity = '1';
        aboutParagraph.style.opacity = '1';
        observer.disconnect();
    }
}, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
})

aboutBigObs.observe(aboutBigHeader);



const aboutOffersObs = new IntersectionObserver(function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        aboutOffers.forEach(el => {
            el.style.opacity = '1';
        })
        observer.disconnect();
    }
}, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
})

aboutOffersObs.observe(aboutOffers[0]);




/////////////////////////////////////////////////////////
// SERIES SECTION REVEILING ELEMENTS

delayTime = .4;
seriesCards.forEach(card => {
    card.style.transition = `opacity 1s ${delayTime}s ease`;
    delayTime += 0.4;
});

const seriesObs = new IntersectionObserver(function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        seriesCards.forEach(el => {
            el.style.opacity = '1';
        })
        observer.disconnect();
    }
}, {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px 0px 0px'
});

seriesObs.observe(seriesCards[0]);




/////////////////////////////////////////////////////////
// CTA SERIES BUTTONS

const resetCardSides = () => {
    seriesCardFront.forEach((el, i) => {
        el.style.transform = 'rotateY(0deg)';
        seriesCardBack[i].style.transform = 'rotateY(180deg)';
    })
}

seriesReadMore.forEach(el => {
    el.addEventListener('click', (e) => {
        resetCardSides();
        const currentFront = el.closest('.series__card--front');
        const currentBack = currentFront.nextElementSibling;
        currentFront.style.cssText = 'transform: rotateY(180deg)';
        currentBack.style.cssText = 'transform: rotateY(360deg)';
    })
})

seriesReadLess.forEach(el => {
    el.addEventListener('click', () => {
        const currentBack = el.closest('.series__card--back');
        const currentFront = currentBack.previousElementSibling;
        currentBack.style.transform = 'rotateY(180deg)';
        currentFront.style.transform = 'rotateY(0deg)';
    })
})








/////////////////////////////////////////////////////////
// SELECTING AND DESPLAYING LARGE IMAGE

const closeOverlay = () => {
    progressBar.classList.add('progressBar__active');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
    }, 200);
}

let heightPortait = 90;
let widthPoratrait = 30;
let heightLandscape = 80;
let widthLandscape = 70;

galleryContainer.addEventListener('click', (e) => {
    if (window.innerWidth > 1200) {
        heightPortait = 90;
        widthPoratrait = 30;
        heightLandscape = 80;
        widthLandscape = 70;
    }
    if (window.innerWidth <= 1200) {
        heightPortait = 90;
        widthPoratrait = 40;
        heightLandscape = 70;
        widthLandscape = 70;
    }
    if (window.innerWidth <= 1000) {
        heightPortait = 80;
        widthPoratrait = 40;
        heightLandscape = 60;
        widthLandscape = 70;
    }
    if (window.innerWidth <= 800) {
        heightPortait = 80;
        widthPoratrait = 50;
        heightLandscape = 50;
        widthLandscape = 75;
    }
    if (window.innerWidth <= 750) {
        heightLandscape = 45;
    }

    if (window.innerWidth > 550) {
        progressBar.classList.remove('progressBar__active');
        const numberOfImage = e.target.classList[1].slice(-1);  // Image number in folder

        if (numberOfImage === '1') overlayContainer.style.cssText = `height: ${heightPortait}vh; width: ${widthPoratrait}%`;
        if (numberOfImage === '2') overlayContainer.style.cssText = `height: ${heightPortait}vh; width: ${widthPoratrait}%`;
        if (numberOfImage === '3') overlayContainer.style.cssText = `height: ${heightLandscape}vh; width: ${widthLandscape}%`;
        if (numberOfImage === '4') overlayContainer.style.cssText = `height: ${heightLandscape}vh; width: ${widthLandscape}%`;
        if (numberOfImage === '5') overlayContainer.style.cssText = `height: ${heightPortait}vh; width: ${widthPoratrait}%`;
        if (numberOfImage === '6') overlayContainer.style.cssText = `height: ${heightPortait}vh; width: ${widthPoratrait}%`;
        if (numberOfImage === '7') overlayContainer.style.cssText = `height: ${heightLandscape}vh; width: ${widthLandscape}%`;
        if (numberOfImage === '8') overlayContainer.style.cssText = `height: ${heightPortait}vh; width: ${widthPoratrait}%`;

        overlay.style.visibility = 'visible';
        overlay.style.opacity = '1';

        const imageToDisplay = `./img/grid/gallery-${numberOfImage}-large.jpg`;
        overlayContainer.style.backgroundImage = `url(${imageToDisplay})`;
    }

})

overlayCloseIcon.addEventListener('click', closeOverlay)

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeOverlay();
})

overlay.addEventListener('click', (e) => {
    if (e.target.classList.contains('overlay')) closeOverlay();
})

window.addEventListener('resize', () => {
    if (window.innerWidth <= 550) closeOverlay();
})

