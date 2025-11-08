document.addEventListener('DOMContentLoaded', () => {
	'use strict'

	scrollDown( 'about')
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