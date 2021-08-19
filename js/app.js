var ua = window.navigator.userAgent;
var msie = ua.indexOf("MSIE ");
var isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
function isIE() {
	ua = navigator.userAgent;
	var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
	return is_ie;
}
if (isIE()) {
	document.querySelector('body').classList.add('ie');
}
if (isMobile.any()) {
	document.querySelector('body').classList.add('_touch');
}
//=================
//testWebP
function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
//=================
function ibg() {
	if (isIE()) {
		let ibg = document.querySelectorAll("._ibg");
		for (var i = 0; i < ibg.length; i++) {
			if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
				ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
			}
		}
	}
}
ibg();
if (document.querySelector('.wrapper')) {
	document.querySelector('.wrapper').classList.add('_loaded');
}
let unlock = true;
//=================
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
	let menuBody = document.querySelector(".menu__body");
	iconMenu.addEventListener("click", function (e) {
		if (unlock) {
			iconMenu.classList.toggle("_active");
			menuBody.classList.toggle("_active");
		}
	});
};
function menu_close() {
	let iconMenu = document.querySelector(".icon-menu");
	let menuBody = document.querySelector(".menu__body");
	iconMenu.classList.remove("_active");
	menuBody.classList.remove("_active");
}

let headerSearch = document.querySelectorAll('.header');
for (let i = 0; i < headerSearch.length; i++) {
	const header = headerSearch[i];
	const topOffset = header.offsetHeight;

	const yakors = header.querySelectorAll(".menu__link");
	for (let i = 0; i < yakors.length; i++) {
		const yakor = yakors[i];

		yakor.addEventListener("click", function (e) {
			// _interplayClasses(yakors, yakor,'_active')
			const dataSaersh = yakor.dataset.scroll.substring(1);
			const scrollTarget = document.getElementById(dataSaersh);

			const elementPosition = scrollTarget.getBoundingClientRect().top;
			const offsetPosition = elementPosition - topOffset;
			window.scrollBy({
				top: offsetPosition,
				behavior: 'smooth'
			})
			e.preventDefault();
		});

		window.addEventListener('scroll', function () {
			const elementId = yakor.dataset.scroll;
			const idPosition = document.querySelector(elementId).offsetTop;
			const idHeight = document.querySelector(elementId).offsetHeight;

			const scroll = document.documentElement.scrollTop;
			(scroll > idPosition - topOffset * 1.1 && scroll < (idPosition + idHeight - topOffset * 1.1)) ? addClass(i) : removeClass(i);

			function addClass(k) {
				yakor.classList.remove('_active');
				yakors[k].classList.add('_active');
			}
			function removeClass(k) {
				yakors[k].classList.remove('_active');
			}
		});
	}
}
//=================

let btnArrows = document.querySelectorAll('.arrow');
for (let i = 0; i < btnArrows.length; i++) {
	let btnArrow = btnArrows[i];
	btnArrow.addEventListener('click', function (e) {
		e.preventDefault();

		const href = this.getAttribute('href').substring(1);
		const scrollTarget = document.getElementById(href);

		const topOffset = document.querySelector('.header').offsetHeight;

		const elementPosition = scrollTarget.getBoundingClientRect().top;
		const offsetPosition = elementPosition - topOffset;

		window.scrollBy({
			top: offsetPosition,
			behavior: 'smooth'
		})
	});
	const main = document.querySelector("#main");
	window.addEventListener('scroll', function () {
		let scrollTop = document.documentElement.scrollTop;

		if (scrollTop >= (main.offsetHeight - btnArrow.offsetHeight *5)) {
			btnArrow.classList.add("_active");
		} else {
			btnArrow.classList.remove("_active");
		}
	});
}

//=================
const tabsBtn = document.querySelectorAll("._tabs-item");
const tabsItems = document.querySelectorAll("._tabs-block");

tabsBtn.forEach(onTabClick);

function onTabClick(item) {
	item.addEventListener("click", function () {
		let currentBtn = item;
		let tabId = currentBtn.getAttribute("data-tab");
		let currentTub = document.querySelector(tabId);

			if (currentBtn.classList.contains('_active')) {
				currentBtn.classList.remove('_active');
				currentTub.classList.remove('_active');
			} else if (!currentBtn.classList.contains('_active')) {
				tabsBtn.forEach(function (item) {
					item.classList.remove('_active');
				});

				tabsItems.forEach(function (item) {
					item.classList.remove('_active');
				});

				currentBtn.classList.add('_active');
				currentTub.classList.add('_active');
			}

	});
}
//=================
let popup_link = document.querySelectorAll('._popup-link');
let popups = document.querySelectorAll('.popup');
for (let i = 0; i < popup_link.length; i++) {
	const el = popup_link[i];
	el.addEventListener('click', function (e) {
		if (unlock) {
			let item = el.getAttribute('href').replace('#', '');

			let video = el.getAttribute('data-video');
			//=================
			// popup_open(item, video);
			//=================
			for (let i = 0; i < popups.length; i++) {
				let searchPopup = popups[i];
				if (searchPopup.classList.contains('.popup-login')) {
					popup_open_login(item);
				} else {
					popup_open(item, video);
				}
			}
		}
		e.preventDefault();
	})
}
for (let i = 0; i < popups.length; i++) {
	const popup = popups[i];
	popup.addEventListener("click", function (e) {
		if (!e.target.closest('.popup__body')) {
			popup_close(e.target.closest('.popup'));
		}
	});
}

function popup_open(item, video = '') {

	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('.popup');

	if (curent_popup && unlock) {
		if (video != '' && video != null) {
			let popup_video = document.querySelector('.popup_video');
			popup_video.querySelector('.popup__video').innerHTML = '<iframe src="https://www.youtube.com/embed/' + video + '?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>';
		}
		if (!document.querySelector('.menu__body._active')) {
			// body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_open_login(item) {
	let activePopup = document.querySelectorAll('.popup._active');
	if (activePopup.length > 0) {
		popup_close('', false);
	}
	let curent_popup = document.querySelector('#popup-login');
	let textForm = document.querySelector('.popup__form-login').innerHTML = item;

	if (curent_popup && unlock) {

		if (!document.querySelector('.menu__body._active')) {
			// body_lock_add(500);
		}
		curent_popup.classList.add('_active');
		history.pushState('', '', '#' + item);
	}
}
function popup_close(item, bodyUnlock = true) {
	if (unlock) {
		if (!item) {
			for (let i = 0; i < popups.length; i++) {
				const popup = popups[i];
				let video = popup.querySelector('.popup__video');
				if (video) {
					video.innerHTML = '';
				}
				popup.classList.remove('_active');
			}
		} else {
			let video = item.querySelector('.popup__video');
			if (video) {
				video.innerHTML = '';
			}
			item.classList.remove('_active');
		}
		if (!document.querySelector('.menu__body._active') && bodyUnlock) {
			// body_lock_remove(500);
		}
		history.pushState('', '', window.location.href.split('#')[0]);
	}
}
let popup_close_icon = document.querySelectorAll('.popup__close,._popup-close');
if (popup_close_icon) {
	for (let index = 0; index < popup_close_icon.length; index++) {
		const el = popup_close_icon[index];
		el.addEventListener('click', function () {
			popup_close(el.closest('.popup'));
		})
	}
}
document.addEventListener('keydown', function (e) {
	if (e.which == 27) {
		popup_close();
	}
});

(function () {
	if (!Element.prototype.closest) {
		Element.prototype.closest = function (css) {
			var node = this;
			while (node) {
				if (node.matches(css)) return node;
				else node = node.parentElement;
			}
			return null;
		};
	}
})();
(function () {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
			Element.prototype.webkitMatchesSelector ||
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector;
	}
})();
//BildSlider
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper);
			slider.classList.add('swiper-bild');

			let sliderPaggination = document.createElement('div');
			sliderPaggination.classList.add('slider__pagination');
			sliderPaggination.classList.add('swiper-pagination');
			let sliderButtonsContainer = document.createElement('div');
			sliderButtonsContainer.classList.add('slider__buttons');
			sliderButtonsContainer.append(sliderButtonPrev, sliderButtongNext);
			let sliderButtonPrev = document.createElement('div');
			let sliderButtongNext = document.createElement('div');
			sliderButtonPrev.classList.add('swiper-button-prev');
			sliderButtongNext.classList.add('swiper-button-next');
			slider_wrapper.after(sliderPaggination);
			slider_wrapper.after(sliderButtonsContainer);
		}
		if (slider.classList.contains('_gallery')) {
			//slider.data('lightGallery').destroy(true);
		}
	}
	sliders_bild_callback();
}

function sliders_bild_callback(params) { }

let slider_main = new Swiper('.main-screen', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 0,
	autoHeight: true,
	speed: 800,
	// Dotts
	pagination: {
		el: '.main-screen__dott',
		clickable: true,
	},
	// Arrows
	navigation: {
		nextEl: '.main-screen__button-next',
		prevEl: '.main-screen__button-prev',
	},
});
let slider_scope = new Swiper('.scope__content', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 30,
	autoHeight: true,
	speed: 800,
	// Dotts
	pagination: {
		el: '.scope__dott',
		clickable: true,
	},
	// Arrows
	navigation: {
		nextEl: '.scope__button-next',
		prevEl: '.scope__button-prev',
	},
});
let slider_result = new Swiper('.result', {
	loop: true,
	slidesPerView: 1,
	spaceBetween: 30,
	autoHeight: true,
	speed: 800,
	// Dotts
	pagination: {
		el: '.result__dott',
		clickable: true,
	},
	// Arrows
	navigation: {
		nextEl: '.result__button-next',
		prevEl: '.result__button-prev',
	},
});
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		//customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());
