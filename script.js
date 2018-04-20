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
		eventDisplay.value = event.clientY;
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
	//const userValue = document.getElementById('userValue');

	// Z wykorzystaniem obiektu klasy
	function Stoper(display) {

		this.display = display;
		this.basicValue; 
		this.setTimeoutReference;
		this.clearReference;

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
			display.innerHTML = this.basicValue--;
			const self = this;
			this.setTimeoutReference = setTimeout(function() {
				self.start();
			}, 1000);
		};
		this.stop = function() {
			this.clearReference = clearTimeout(this.setTimeoutReference);
		};
		this.continue = function() {
			this.start();	
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
		
		console.log(length.length);
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
	// 

}; //end of widdow.onload



	


	









