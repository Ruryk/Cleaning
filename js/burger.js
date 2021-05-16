/* Burger */

addBurger(document.querySelector('#elem-burger'));

function addBurger(elem, variation = 1) {
	let button = document.querySelector('#' + elem.id + ' .burger__btn');
	let links = document.querySelectorAll('#' + elem.id + ' .burger__link');
	let bgElem = document.querySelector('#' + elem.id + ' .burger__bg');
	let burgerClose;

	if (button && links && bgElem && elem) {
		if (variation === 1) {
			elem.classList.add('variation_1');
			burgerClose = document.querySelector('#' + elem.id + ' .burger__close-btn');
			burgerClose.addEventListener('click', function(e) {
				elem.classList.remove('active');
				burgBodyUnLock();
			});
		} else if (variation === 2) {
			elem.classList.add('variation_2');
		}

		elem.classList.remove('active');
		burgBodyUnLock();

		button.addEventListener('click', function(e) {
			let popupActive = document.querySelector('.popup.open');

			if (popupActive) {
				closePopup(popupActive, false);
			}

			if (elem.classList.contains('active') && variation === 2) {
				elem.classList.remove('active');
				burgBodyUnLock();
			} else {
				elem.classList.add('active');
				burgBodyLock();
			}
		});

		for(let i = 0, length = links.length; i < length; i++) {
			links[i].addEventListener('click', function(e) {
				elem.classList.remove('active');
				burgBodyUnLock();
			});
		}

		document.documentElement.addEventListener('click', function(e) {
			if ((!e.target.closest('.burger') && elem.classList.contains('active')) || (e.target.closest('.' + bgElem.classList) && elem.classList.contains('active'))) {
				elem.classList.remove('active');
				burgBodyUnLock();
			}
		});
	}
}

function burgBodyLock() {
	let paddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (fixedPadding.length > 0) {
		for(let i = 0, length = fixedPadding.length; i < length; i++) {
			fixedPadding[i].style.paddingRight = paddingValue;
		}
	}

	body.style.paddingRight = paddingValue;
	body.classList.add('lock');
}

function burgBodyUnLock() {
	setTimeout(helpFunction, 300);
	function helpFunction() {
		if (fixedPadding.length > 0) {
			for(let i = 0, length = fixedPadding.length; i < length; i++) {
				fixedPadding[i].style.paddingRight = '0px';
			}
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}
}