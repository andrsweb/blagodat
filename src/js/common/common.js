import {disableBodyScroll, enableBodyScroll} from "body-scroll-lock";

document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	scrollDown( 'about')
	toggleMenu()
})

const scrollDown = (targetId) => {
	const button = document.querySelector('.scroll-down')
	const target = document.getElementById(targetId)

	if (button && target) {
		button.addEventListener('click', () => {
			target.scrollIntoView({ behavior: 'smooth' })
		})
	}
}

const toggleMenu = () => {
	const header = document.querySelector('.header');
	const burgerButton = header?.querySelector('.burger-button');
	const burgerMenu = document.querySelector('#burger-menu');

	if (!header || !burgerButton || !burgerMenu) return;

	const closeMenu = () => {
		burgerMenu.classList.remove('is-active');
		burgerMenu.classList.add('is-hiding');
		header.classList.remove('is-active');
		burgerButton.classList.remove('is-open');
		burgerButton.classList.add('is-closed');

		setTimeout(() => {
			burgerMenu.classList.remove('is-hiding');
			burgerMenu.classList.add('is-hidden');
			enableBodyScroll(burgerMenu);
		}, 300);
	};

	const openMenu = () => {
		burgerMenu.classList.remove('is-hidden', 'is-hiding');
		burgerMenu.classList.add('is-active');
		header.classList.add('is-active');
		burgerButton.classList.remove('is-closed');
		burgerButton.classList.add('is-open');
		disableBodyScroll(burgerMenu);
	};

	burgerMenu.classList.add('is-hidden');
	burgerButton.classList.add('is-closed');

	burgerButton.addEventListener('click', () => {
		if (burgerMenu.classList.contains('is-active')) {
			closeMenu();
			return;
		}

		openMenu();
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && burgerMenu.classList.contains('is-active')) {
			closeMenu();
		}
	});
};