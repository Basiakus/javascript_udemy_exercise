window.onload = function() {

//zadanie 1
	const test = document.getElementById('test');
	const textSize = document.getElementById('textSize');
	const textSizeButtons = document.getElementById('textSizeButtons');
	const pxDisplay = document.createElement('input');
	const buttonPlus = document.createElement('button');
	const buttonMinus = document.createElement('button');
	let fontSize = 14;

	textSizeButtons.appendChild(pxDisplay);
	textSizeButtons.appendChild(buttonPlus);
	textSizeButtons.appendChild(buttonMinus);

	buttonPlus.innerHTML = "+";
	buttonMinus.innerHTML = "-";

	function answer() {
		alert('Ejjj!!!!')
	}
	function changeColor() {
		if (this.style.background == 'none') {
			this.style.background = 'black';
			this.style.color = 'white';
		} else {
			this.style.color = 'black';
			this.style.background = 'none';
		}
	}
	function fontSizePlus() {
		if (fontSize < 52) {
			fontSize += 1;
			pxDisplay.value = fontSize + 'px';
			textSize.style.fontSize = fontSize + 'px';
		} else {
			return;
		}
	}
	function fontSizeMinus() {
			if (fontSize > 0) {
			fontSize -= 1;
			pxDisplay.value = fontSize + 'px';
			textSize.style.fontSize = fontSize + 'px';
		} else {
			return;
		} 
	}
	textSize.onclick = answer;
	textSize.onmouseover = changeColor;
	buttonPlus.addEventListener('click', fontSizePlus);
	buttonMinus.addEventListener('click', fontSizeMinus);

//zadanie 2
	const clientXid = document.getElementById('clientXid');
	const shiftKeyId = document.getElementById('shiftKeyId');
	const mouseButtonsId = document.getElementById('mouseButtonsId');
	const eTarget = document.getElementById('eTarget');
	const eventList = document.querySelectorAll('ul');

	function eventClientX(event) {
		eventDisplay.value = event.clientX;
	}
	function eventShiftKey(event) {
		eventDisplay.value = event.shiftKey;
		if(event.shiftKey) {
			eventDisplay.value = 'SHIFT: active';
		} else {
			eventDisplay.value = 'SHIFT: passive';
		}
	}
	function eventButtonMouse(event) {
		eventDisplay.value = event.button;
		mouseButtonsId.oncontextmenu = function(e) {
				e.preventDefault();
			}
		if(event.button === 0) {
			eventDisplay.value = 'Left mouse button';
		} else if (event.button === 2) {
			eventDisplay.value = 'Right mouse button';
		} else {
			eventDisplay.value = 'Middle mouse button';
		}
	}
	function eventTarget() {
		eventDisplay.value = event.target.tagName;
	}
	function pointerList() {
		this.style.cursor = 'pointer';
	}

	clientXid.onmousemove = eventClientX;
	shiftKeyId.addEventListener('mousemove', eventShiftKey);
	mouseButtonsId.addEventListener('mousedown', eventButtonMouse);
	eTarget.addEventListener('click', eventTarget);
	eventList[0].addEventListener('mouseover', pointerList);

//Zadanie 3	
	const addText = document.getElementById('addText');
	const addButton = document.querySelector("#formExercise3 input[type='submit']");
	const addedTextList = document.getElementById('addedTextList');
	const exercise3 = document.getElementById('exercise3');
	const deleteInfo = document.createElement('p');
	const LiElements = document.getElementsByClassName('newLi');

	deleteInfo.innerHTML = '* kliknij aby usunąć';

	function remove() {
		this.parentNode.removeChild(this);
	}
	function addLiElement(event) {
		event.preventDefault();
		const newLi = document.createElement('li');
		addedTextList.appendChild(newLi);
		newLi.innerText = '*' + addText.value;
		if(addText.value == '') {
			newLi.innerText = '* brak nazwy';
		}
		newLi.setAttribute('style', 'cursor: pointer');
		newLi.style.width = '10%';
		newLi.onclick = remove;
		addText.value = '';
	}

	addButton.addEventListener('click', addLiElement);
	exercise3.appendChild(deleteInfo);

//Zadanie 4
	const buttonToTop = document.getElementById('buttonToTop');
	const span = document.getElementById('yAxisDisplay');

	function scrollToTop() {
		return window.scrollBy(0, -1 * window.pageYOffset);
	}
	window.onscroll = function() {
		const Yoffset = window.pageYOffset;
		span.innerHTML = 'Yaxis:' + parseInt(Yoffset);
		if(Yoffset > 600 && Yoffset < 880) {
			buttonToTop.style.display = 'block'; 
		} else {
			buttonToTop.style.display = 'none';
		}
	}
	buttonToTop.addEventListener('click', scrollToTop);

//zadanie 5
	const exercise5 = document.getElementById('exercise5');
	const movingElement = document.getElementById('movingElement');

	movingElement.onmousedown = function() {
			
		movingElement.onmousemove = function(e) {
			this.style.left = e.clientX - this.width / 2 + 'px';
			this.style.top = e.clientY - this.height / 2 + window.pageYOffset + 'px';
			this.style.width = '110px';
			this.style.height = '80px';
			this.style.filter = 'blur(3px)';
		};
	};	
	movingElement.onmouseup = function() {
		this.onmousemove = null;
		this.style.width = '100px';
		this.style.height = '100px';
		this.style.filter = 'none';

	};
	movingElement.ondragstart = function(e) {
		e.preventDefault();
	};

//Zadanie 6
	const startStoperButton = document.getElementById('startStoperButton');
	const stopStoperButton = document.getElementById('stopStoperButton');
	const continueStoperButton = document.getElementById('continueStoperButton');
	const saveStoperButton = document.getElementById('saveStoperButton');
	const displayStoper = document.getElementById('displayStoper');
	const stoperList = document.getElementById('stoperList');
	const statusDisplay = document.getElementById('statusDisplay');
	//const userValue = document.getElementById('userValue');

	// Z wykorzystaniem obiektu klasy
	function Stoper(display) {

		this.display = display;
		this.basicValue; 
		this.setTimeoutReference;
		this.status;

		this.setBasicValue = function(basicValue) {
			if(this.setTimeoutReference) {
				this.stop();
			};

			this.basicValue = basicValue;
			this.start(this.basicValue);
		};

		this.start = function() {
			if(this.basicValue < 0) {
				return;
			};
			this.status = true;
			statusDisplay.innerHTML = '&#9654'//this.status;
			display.innerHTML = this.basicValue--;
			const self = this;
			this.setTimeoutReference = setTimeout(function() {
				self.start();
			}, 1000);
			return this.status;
		};
		this.stop = function() {
			this.status = false;
			statusDisplay.innerHTML = '&#9646&#9646';//this.status;
			clearTimeout(this.setTimeoutReference);
			return this.status;
		};
		this.continue = function() {
			if(!this.status) {
				this.start(); 
			} else {
				return;
			};
		};
	};

	const stoper = new Stoper(displayStoper);

	startStoperButton.onclick = function() {
		const userValue = document.getElementById('userValue');
		stoper.setBasicValue(userValue.value);
	};

	stopStoperButton.onclick = function() {
		stoper.stop();
	};
		
	continueStoperButton.onclick = function() {
		stoper.continue();
	};
	saveStoperButton.onclick = function() {
		const newRecord = document.createElement('li');
		const length = document.querySelectorAll('#stoperList li');
		stoperList.appendChild(newRecord);
		for (let i = 0; i <= length.length; ++i) {
			newRecord.innerHTML = i + "# " + displayStoper.innerHTML;
		};
		newRecord.onclick = function() {
			this.parentNode.removeChild(this);
		};
	};
	/* Z WYKORZYSTANIEM setInterval
	let innerInterval;
	
	function interval(display, number) {
	   let innerInterval = setInterval(function() {
	      if(number.value < 0) {
	         clearInterval(innerInterval);
	         return;
	      }
	      display.innerHTML = number.value--;         
	   },1000);
	   return innerInterval;
	};
	
	startStoperButton.onclick = function() {
	   const userValue = document.getElementById('userValue');
	   displayStoper.innerHTML = userValue.value;
	   innerInterval = interval(displayStoper, userValue);
	};

	stopStoperButton.onclick = function() {
	   clearInterval(innerInterval);
	};
	*/

//Zadanie 7
	const exercise7numbers = document.getElementById('exercise7Form').numbers;
	const exercise7Letters = document.getElementById('exercise7Form').letters;
	const exercise7FullName = document.getElementById('exercise7Form').fullName;
	const exercise7Send = document.getElementById('exercise7Form').send;
	
	function isNumber(valueToCheck) {
		return !isNaN(valueToCheck);
	};
	exercise7numbers.onkeyup = function() {
		if(isNumber(this.value)) {
			this.style.backgroundColor = 'green';
		} else {
			this.style.backgroundColor = 'red';
		};
	};
	exercise7Letters.onkeydown = function(e) {
		const which = e.which;
		if(isNumber(String.fromCharCode(which))) {
			e.preventDefault();
		} else {
			this.style.backgroundColor = 'green';
		};
	};
	exercise7Send.onclick = function(e) {
		const checkName = exercise7FullName.value;
		if(checkName.indexOf(' ') < 0) {
			e.preventDefault();
			exercise7FullName.value = '!!!Podaj_imię_i_nazwisko!!!';
		} else {
			e.preventDefault();
			exercise7FullName.value = 'Brawo poszło!:D';
		};
	};

//ZADANIE 8
	const exercise8FormProducts = document.getElementById('exercise8Form').product;
	const exercise8SubmitButton = document.getElementById('exercise8Form').submitButton;
	const exercise8Declarations = document.getElementById('exercise8Form').condicion;
	const exercise8Content = document.getElementById('exercise8Content');
	const exercise8clear = document.createElement('button');

	exercise8SubmitButton.value = 'akceptuję i kupuję';

	function exercise8ClearProducts() {
		exercise8Content.innerHTML = '';
	};

	for(let i = 0; i < exercise8Declarations.length; i++) {
		//console.log(exercise8Declarations[i].value)
		exercise8Declarations[i].onclick = function() {
			exercise8SubmitButton.disabled = this.value === 'true';
		};
	};

	exercise8SubmitButton.onclick = function(e) {
		e.preventDefault();
		let checkedProducts = '';
		for (let i = 0; i < exercise8FormProducts.length; i++) {
			if(exercise8FormProducts[i].checked) {
				checkedProducts += exercise8FormProducts[i].value + '<br>';
			};
			
		};
		exercise8Content.innerHTML = checkedProducts;
		exercise8Content.appendChild(exercise8clear);
		exercise8clear.innerHTML = 'clear';
		exercise8clear.onclick = exercise8ClearProducts;
	};

//ZADANIE 9
	
	const exercise9Form = document.getElementById('exercise9Form');
	const exercise9Content = document.getElementById('exercise9Content');

	exercise9Form.sex.onchange = function() {
		if(this.value ==='women') {
			exercise9Content.innerHTML ='<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Aiga_toiletsq_women_inv.svg/220px-Aiga_toiletsq_women_inv.svg.png" height="100" width="100">'
		} else if (this.value === 'men') {
			exercise9Content.innerHTML = '<img src="https://cdn0.iconfinder.com/data/icons/cosmo-navigation/40/human-256.png" height="100" width="100">';
		};
	};

//ZADANIE 10
	
	const userPassword = document.getElementById('exer10Form').password;
	const checkPasswordButton = document.getElementById('exer10Form').checkPasswordButton;
	const exer10Content = document.getElementById('exer10Content');
	const formula = /^[A-Z]{1}[a-z]{3,5}\*\d{2,4}$/;

	checkPasswordButton.onclick = function(e) {
		e.preventDefault();
		if (formula.test(userPassword.value)) {

			exer10Content.innerHTML = 'Hasło: ' + '"' + userPassword.value + '"' + 'jest poprawne!';

		} else {

			exer10Content.innerHTML = 'Hasło: ' + '"' + userPassword.value + '"' + 'jest błędne!';

		};
		//exer10Content.innerHTML = formula.test(userPassword.value);
	};

//ZADANIE 11
 	const exercise11Content = document.getElementById('exercise11Content');
 	const exercise11Clock = document.getElementById('exercise11Clock');
 	const today = new Date();
 	const birthDate = new Date('09/04/1987');

 	Date.prototype.getPolishDays = function() {
 		const days = ['Niedziela', 
					  'Poniedziałek', 
					  'Wtorek', 
					  'Środa', 
				      'Czwartek', 
					  'Piątek',
					  'Sobota'
		];
		return days[this.getDay()];
 	};
 	Date.prototype.getPolishMonth = function() {
 		const months = [
 						'Styczeń',
 						'Luty',
 						'Marzec',
 						'Kwiecień',
 						'Maj',
 						'Czerwiec',
 						'Lipiec',
 						'Sierpień',
 						'Wrzesień',
 						'Październik',
 						'Listopad',
 						'Grudzień'
 		];
 		return months[this.getMonth()];
 	};
 	function lifeTime(from, now) {
 		return parseInt((now - from)/1000/60/60/24); //dni
 	};

 	function Clock(handler) {
 		this.handler = handler;
 		this.actualDate = new Date();
 		this.clockRunning = function() {
 			this.actualDate = new Date();
 		};
 		this.refreshDisplayClock = function() {
 			this.handler.innerHTML = 'aktualny czas: ' + this.formattedTime();
 		};
 		this.start = function() {
 			this.refreshDisplayClock();
 			const self = this;
 			setInterval(function() {
 				self.refreshDisplayClock();
 				self.clockRunning();
 			}, 1000);
 		};
 	};

 	Clock.prototype.formattedTime = function() {
 		let dayTime = '';	
 		let hours = this.actualDate.getHours();
 		let minutes = this.actualDate.getMinutes();
 		let seconds = this.actualDate.getSeconds();
 		if(hours < 12) {
 				dayTime = ' AM';
 			} else {
 				hours -= 12;
 				dayTime = ' PM';
 		};
 		if(hours < 10) {
 			hours = '0' + hours;
 		};
 		if(minutes < 10) {
 			minutes = '0' + minutes;
 		};
 		if(seconds < 10) {
 			seconds = '0' + seconds;
 		};
 		return hours + ':' + minutes + ':' + seconds + dayTime;
 	};

 	const clock = new Clock(exercise11Clock);
 	clock.start();
 	
 	exercise11Content.innerHTML =
 								'dzień tygodnia: ' + today.getPolishDays() + '<br>' +
 								'miesiąc: ' + today.getPolishMonth() + '<br>' +
 								'rok: ' + today.getFullYear() + '<br>' +
 								'od moich narodzin upłyneło: ' + lifeTime(birthDate, today) + ' dni';


// ZADANIE 12
	
	const exercise12CookieCreate = document.getElementById('exercise12CookieCreate');
	const exercise12CookieDelete = document.getElementById('exercise12CookieDelete');
	const exercise12CookieShow = document.getElementById('exercise12CookieShow');
	const exercise12CookieList = document.getElementById('exercise12CookieList');
	/*
	exercise12CookieCreate.addEventListener('click', function() {
		document.cookie = "ciasteczko=pyszne; max-age=60; path=/";
		document.cookie = "czas_konsumpcji=minuta; max-age=60; path=/";
		alert('ciasteczko zostało stworzone :)');
	});
	*/
	function createCookie(name, value, time) {
		document.cookie = name + '=' + value + '; max-age=' + time + '; path=/';
	};
	function deleteCookie(name) {
		const expiresDate = new Date();
		expiresDate.setDate(expiresDate.getDate()-1);
		document.cookie = name+'=;expires='+expiresDate.toUTCString()+';path=/';
	};
	exercise12CookieCreate.addEventListener('click', function(e) {
		e.preventDefault();
		let exercise12CookieName = document.getElementById('exercise12CookieName').value;
		let exercise12CookieValue = document.getElementById('exercise12CookieValue').value;
		let exercise12CookieLife = document.getElementById('exercise12CookieLife').value;
		createCookie(exercise12CookieName, exercise12CookieValue, exercise12CookieLife);
		alert("nazwa: " + exercise12CookieName + " , wartość: " + exercise12CookieValue + ", czas: " + exercise12CookieLife + ' s.');
		exercise12CookieName = ''; 
		exercise12CookieValue = '';
		exercise12CookieLife = '';
	});
	exercise12CookieDelete.addEventListener('click', function(e) {
		e.preventDefault();
		const exercise12CookieName = document.getElementById('exercise12CookieName').value;
		deleteCookie(exercise12CookieName);
		alert('ciasteczko o danej nazwie zostało usunięte');
	});
	exercise12CookieShow.addEventListener('click', function() {
		const cookies = document.cookie.split('; ');
		exercise12CookieList.innerHTML = ' ';

			if(document.cookie == '') {
				exercise12CookieList.innerHTML = 'List of cookies is empty';
			} else {
				for (let i = 0; i < cookies.length; i++) {
					exercise12CookieList.innerHTML += i + 1 + '. ' + cookies[i] + '<br>';
				};
			}
	});

// Zadanie 13

	const exercise13 = document.getElementById('exercise13');
	const divsInExercise13 = exercise13.getElementsByTagName('div');
	const exercise13Start = document.getElementById('exercise13Start');
	const exercise13Stop = document.getElementById('exercise13Stop');

	/*for (let i = 0; i < divsInExercise13.length; i++) {
		console.log(divsInExercise13[i]);
	};

	console.log(divsInExercise13.length);
	*/
	
	let i = 0;
		exercise13Start.onclick = function() {
			divsInExercise13[0].setAttribute('class', 'change');
			const exercise13Interval = setInterval(function() {
			divsInExercise13[i % divsInExercise13.length].setAttribute('class', '');
			divsInExercise13[(i + 1) % divsInExercise13.length].setAttribute('class', 'change');
			i++;
		}, 1500);
			exercise13Stop.onclick = function() {
				clearInterval(exercise13Interval);
			};
		};
		//console.dir(divsInExercise13);
	// Zadanie 14 

	const exercise14MainImg = document.getElementById('exercise14MainImg');
	const exercise14Miniatures = document.getElementsByClassName('miniature');
	const exercise14NewImage = new Image();
	let exercise14currentMiniature = exercise14Miniatures[3];

	exercise14MainImg.appendChild(exercise14NewImage);

	exercise14currentMiniature.className += ' selected';
	exercise14NewImage.src = exercise14currentMiniature.getAttribute('src');  

	for (i = 0; i < exercise14Miniatures.length; i++) {
	   exercise14Miniatures[i].addEventListener('mouseover', function() {
	      exercise14currentMiniature.className = exercise14currentMiniature.className.replace('selected', '');
	      exercise14currentMiniature = this;
	      exercise14currentMiniature.className += ' selected';
	      exercise14NewImage.src = this.getAttribute('src');  
	      
	   });
	};
	function createTooltipInExercise14() {
		const tooltipObjects = document.getElementsByClassName('tooltip');
		const tooltipContainer = document.createElement('div');
		tooltipContainer.id = 'tooltipContainer';
		document.body.appendChild(tooltipContainer);

		const tmpTitles = [];

		for (i = 0; i < tooltipObjects.length; i++) {

			tmpTitles[i] = tooltipObjects[i].title;

			tooltipObjects[i].tmp_id = i;

			tooltipObjects[i].addEventListener('mouseover', function(e) {
				tooltipContainer.style.opacity = '1';
				tooltipContainer.innerHTML = this.title;
				this.title = "";
				tooltipContainer.style.left = e.clientX + document.documentElement.scrollLeft + 15 + 'px';
				tooltipContainer.style.top = e.clientY + document.documentElement.scrollTop - 25 +'px';
			});

			tooltipObjects[i].addEventListener('mouseout', function(e) {
				this.title = tmpTitles[this.tmp_id];
				tooltipContainer.style.opacity = '0';
			});
		};
	};
	createTooltipInExercise14();
	

}; // end of widdow.onload



	

	









