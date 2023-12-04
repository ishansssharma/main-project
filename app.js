const mainButtons = document.querySelectorAll(".main-button");
const pages = document.querySelectorAll(".content");
const mainPage = document.querySelector(".main-site");

mainButtons.forEach(button => {
	button.addEventListener("click", showPage)
})

function showPage(event) {
	const button = event.currentTarget;
	const pageToDisplay = button.dataset.button;

	pages.forEach(page => {
		page.classList.remove("content--visible");

		if (page.dataset.name === pageToDisplay) {
			page.classList.add("content--visible");
		}
	})

	mainButtons.forEach(button => {
		button.classList.remove("main-button__active");

		if (button.dataset.button === pageToDisplay) {
			button.classList.add("main-button__active")
		}

	})



}

const slideshow = document.querySelector(".slideshow");
const slides = slideshow.querySelectorAll(".slideshow-slide");
const controls = slideshow.querySelectorAll(".slideshow__control-button");
const counter = slideshow.querySelector(".slideshow__counter");
const dots = slideshow.querySelectorAll(".slideshow__dot");

let index = 0;

const totalSlides = slides.length
const lastIndex = slides.length;

console.log(totalSlides);
const setIndex = (newIndex) => {
	index = newIndex;
}

const decreaseIndex = () => {
	if (index > 0) {
		index = index - 1;
	} else {
		index = lastIndex;
	}
};

const increaseIndex = () => {
	if (index < lastIndex) {
		index = index + 1;
	} else {
		index = 1;
	}
}

const renderSlideClass = () => {
	slides.forEach(slide => {
		slide.classList.remove("slideshow-slide--visible");
	});
	slides[index].classList.add("slideshow-slide--visible");
}

const renderCounter = () => {
	counter.textContent = `${index} of ${totalSlides}`;
}

const switchSlide = (event) => {
	const button = event.currentTarget;

	if (button.dataset.direction === "previous") {
		decreaseIndex();
	}

	if (button.dataset.direction === "next") {
		increaseIndex();
	}

	if (button.dataset.index) {
		setIndex(parseInt(button.dataset.index));
	}
	renderSlideClass();
	renderCounter();
}

controls.forEach(button => {
	button.addEventListener("click", switchSlide);
});

dots.forEach(button => {
	button.addEventListener("click", () => {
		const dotIndex = Array.from(dots).indexOf(button);
		setIndex(dotIndex);
		renderSlideClass();
		renderCounter();
	});
});

const filterButtons = document.querySelectorAll(".filter-button");
const headers = document.querySelectorAll(".header");
const headerContainer = document.querySelector(".header");

let lastClickedFilterVia = null;
let lastClickedFilterValue = null;

const filterTheList = (event) => {
	const currentButton = event.currentTarget;

	let currentButtonFilterVia = currentButton.dataset.filterVia;

	let currentButtonFilterValue = currentButton.dataset.filter;

	if (currentButtonFilterValue === lastClickedFilterValue) {
		currentButtonFilterValue = "*"
	}

	lastClickedFilterValue = currentButtonFilterVia;
	lastClickedFilterValue = currentButtonFilterValue;

	const filteredItems = [...headers].filter(item => {
		if (lastClickedFilterValue === "*") {
			return true;
		} else {
			return item.dataset[currentButtonFilterVia] === currentButtonFilterValue;
		}
	});

	headerContainer.innerHTML = " ";

	filterButtons.forEach(button => {
		button.classList.remove("filter-button--active");
	})

	if (currentButtonFilterValue !== "*") {
		currentButton.classList.add("filter-button--active");
	}

}

filterButtons.forEach(filterButton => {
	filterButton.addEventListener("click", filterTheList)
});



const toTheTopButton = document.querySelector(".tothetop");

toTheTopButton.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",

	});
})