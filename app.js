//Javascript for "Tatovert på Innsiden"

//Variables for the Main buttons that switch between each page. 
const mainButtons = document.querySelectorAll(".main-button");
const pages = document.querySelectorAll(".content");
const mainPage = document.querySelector(".main-site");

//Variables for slideshow
const slideshow = document.querySelector(".slideshow");
const slides = slideshow.querySelectorAll(".slideshow-slide");
const controls = slideshow.querySelectorAll(".slideshow__control-button");
const counter = slideshow.querySelector(".slideshow__counter");
const dots = slideshow.querySelectorAll(".slideshow__dot");
let index = 0;
const totalSlides = slides.length
const lastIndex = slides.length;

//Variables for the filterfunction that filters throught the chapters.
const filterButtons = document.querySelectorAll(".filter-button");
const headers = document.querySelectorAll(".header");
const headerContainer = document.querySelector(".headers");
let lastClickedFilterVia = null;
let lastClickedFilterValue = null;

//Variable for the Button in the footer that directs to the top
const toTheTopButton = document.querySelector(".tothetop");

//Variables for messages popping up after submitting form
const submitButton = document.querySelector(".submit-footer");
const popUpMessage = document.querySelector(".message");
const emailInput = document.querySelector(".inputcontainer-footer");




//Functions 


//Switch between pages
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


//Slideshow

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


//Filter for Chapters and Headers

const filterTheList = (event) => {
	const currentButton = event.currentTarget;

	let currentButtonFilterVia = currentButton.dataset.filterVia;

	let currentButtonFilterValue = currentButton.dataset.filter;

	if (currentButtonFilterValue === lastClickedFilterValue) {
		currentButtonFilterValue = "*"
	}

	lastClickedFilterVia = currentButtonFilterVia;
	lastClickedFilterValue = currentButtonFilterValue;



	const filteredHeaders = [...headers].filter(item => {
		if (lastClickedFilterValue === "*") {
			return true;
		} else {
			return item.dataset[currentButtonFilterVia] === currentButtonFilterValue;
		}
	});



	headerContainer.innerHTML = " ";

	filteredHeaders.forEach(item => {
		headerContainer.appendChild(item);
	});


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



//Button directing to the top of the page

toTheTopButton.addEventListener("click", () => {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: "smooth",

	});
})

//Pop up Message for Submit Button in Footer 
submitButton.addEventListener("click", () => {



	popUpMessage.classList.add("message--visible");

	setTimeout(() => {
		popUpMessage.classList.remove("message--visible");
	}, 1000);
});

function submitForm() => {

}
