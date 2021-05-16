'use strict';
let activeFixedMenu = false;
let body = document.querySelector('body');
let nav = document.querySelector('#nav');
let fixedPadding = document.querySelectorAll('.fixed-padding');

/* IB */

function ib() {
	let ib = document.querySelectorAll(".ib");
	for (let i = 0; i < ib.length; i++) {
		if (ib[i].querySelector('.ib_use')) {
			ib[i].style.backgroundImage = 'url(' + ib[i].querySelector('.ib_use').getAttribute('src') + ')';
		}
	}
}

ib();

/* Slider */

const sliderPagText = document.querySelectorAll('.header__slider-pagtext p');
const headerSliderElem = document.querySelector('.header__slider');
const headerImages = document.querySelectorAll('.header__slider-images img');

const headerSlider = new Swiper('.header__slider', {
	loop: true,
	autoplay: true,
	pagination: {
		el: '.header__slider-pagination',
		clickable: true,
		renderBullet: function (index, className) {
			let text = 'Slide';
			if (sliderPagText.length >= (index + 1)) {
				text = sliderPagText[index].innerHTML;
			}
			return '<span class="' + className + '">' + '0' + (index + 1) + '. ' + text + '</span>';
		},
	},
});

headerSlider.on('slideChange', function () {
	headerSliderElem.style.backgroundImage = `url('${headerImages[headerSlider.realIndex].getAttribute('src')}')`;
});

/* Burger */

const burger = document.querySelector('.nav__burger');
const burgerBtn = document.querySelector('.nav__bottom-burger');
const burgerLinks = document.querySelectorAll('.nav__burger-menu > li');

for (let i = 0, length = burgerLinks.length; i < length; i++) {
	let subMenu = burgerLinks[i].querySelector('.nav__burger-submenu');

	burgerLinks[i].addEventListener('click', function (e) {
		subMenu.classList.toggle('active');
	});
}

burgerBtn.addEventListener('click', function (e) {
	burger.classList.toggle('active');
	burgerBtn.classList.toggle('active');
});


/*Menu*/
const menuTop = document.querySelector('.nav__top');
const menuBottom = document.querySelector('.nav__bottom');

document.addEventListener('scroll', (e) => {
	if (window.scrollY > 0) {
		menuTop.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
		menuBottom.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
	} else {
		menuTop.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
		menuBottom.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
	}
})

/*FAQ*/
function showHide() {
	const atr = this.getAttribute("data")
	const allQuestions = document.querySelectorAll(".collapsible")
	this.classList.toggle("active");

	if (this.nextElementSibling.style.maxHeight) {
		this.nextElementSibling.style.maxHeight = null;
		this.nextElementSibling.style.border = null;
		this.nextElementSibling.style.borderBottomLeftRadius = null;
		this.nextElementSibling.style.borderBottomRightRadius = null;
		return
	}

	allQuestions.forEach(q => {
		let content = q.nextElementSibling;

		if (q.getAttribute("data") !== atr) {
			content.style.maxHeight = null;
			content.style.border = null;
			content.style.borderBottomLeftRadius = null;
			content.style.borderBottomRightRadius = null;
			q.classList.remove("active");
		} else {
			content.style.maxHeight = content.scrollHeight + "px";
			content.style.border = "1px solid #90C73E";
			content.style.borderBottomLeftRadius = "4px";
			content.style.borderBottomRightRadius = "4px";
		}
	})
}

document.querySelectorAll(".collapsible").forEach(el => el.addEventListener("click", showHide))


/* Swooth scroll*/

// Select all links with hashes
$('a[href*="#"]')
	// Remove links that don't actually link to anything
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function (event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			let target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top - 200
				}, 1000, function () {
					// Callback after animation
					// Must change focus!
					let $target = $(target);
					$target.focus();
					if ($target.is(":focus")) { // Checking if the target was focused
						return false;
					} else {
						$target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
						$target.focus(); // Set focus again
					};
				});
			}
		}
	});


/* Form Order */

const formOrder = document.querySelector('#form__order');
formOrder.addEventListener('submit', sendOrderForm);

function sendOrderForm(e) {
	console.log("1")
	e.preventDefault();
	const name = formOrder[0].value;
	const phone = formOrder[1].value;
	const service = formOrder[2].value;
	const data = { name: name, phone: phone, service: service };
	fetch("service", {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	})
		.then(data => {
			return data.text();
		})
		.then(data => {
			console.log("ok");
		})
}


/* Popup order*/

const popup = document.querySelector('.popup__order');
const popupSelect = document.querySelector('.popup__order');

document.addEventListener('click', (e) => {
	if (e.target.classList.contains('popup__open')) {
		popup.classList.toggle("active__popup");
		document.body.style.overflow = 'hidden';
		setTimeout(showPopup, 10);
	}

	if (e.target.classList.contains('active__popup')) {
		document.body.style.overflow = 'visible';
		closePopup();
		setTimeout(() => popup.classList.toggle("active__popup"), 1000)
	}

	if (e.target.classList.contains('popup__open-set_service')) {
		popup.classList.toggle("active__popup");
		document.body.style.overflow = 'hidden';
		document.querySelector('#order__service').selectedIndex = e.target.dataset.id;
		setTimeout(showPopup, 10);
	}
})

function showPopup() {
	popup.style.opacity = 1;
}

function closePopup() {
	popup.style.opacity = 0;
}
