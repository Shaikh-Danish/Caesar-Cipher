let inputText = document.querySelector(".plain-text");
let outputText = document.querySelector(".enc-text");
let shiftVal = document.querySelector("#num");
let plusBtn = document.querySelector(".shift-up");
let minusBtn = document.querySelector(".shift-down");
let encodeBtn = document.querySelector(".encode");
let decodeBtn = document.querySelector(".decode");
let textLabel = document.querySelector(".text-label");
let caesarLabel = document.querySelector(".cipher-label");
let includeChars = document.querySelector(".char-include");
let ignoreChars = document.querySelector(".char-ignore");
let exgEncrypt = document.querySelector(".show-encrypt");
let caseType = document.querySelector(".case-type");
let alphaTitle = document.querySelector(".alpha-box .control-title");

let letterKeys = {
				"a": 1, "b": 2, "c": 3, "d": 4, "e": 5, 				"f": 6, "g": 7, "h": 8, "i": 9, "j": 10, 				"k": 11, "l": 12, "m": 13, "n": 14, 
				"o": 15, "p": 16, "q": 17, "r": 18, 
				"s": 19, "t": 20, "u": 21, "v": 22, 
				"w": 23, "x": 24, "y": 25, "z": 26,
};
let toEncrypt = true;

inputText.oninput = () => {
				updateText();
}

plusBtn.onclick = () => {
				shiftVal.value = Number(shiftVal.value) + 1;
				updateText();
}

minusBtn.onclick = () => {
				shiftVal.value = Number(shiftVal.value) - 1;
				updateText();
}

/* when encode button is clicked */
encodeBtn.onclick = () => {

				toEncrypt = true;
			
				encodeBtn.classList.add("active");
				decodeBtn.classList.remove("active");
				
				
				textLabel.textContent = "Plain Text";
				caesarLabel.textContent = "Cipher Text";
				
				inputText.classList.add("plain-text");
				inputText.classList.remove("enc-text");
				
				outputText.classList.add("enc-text");
			outputText.classList.remove("plain-text");
}

/* when decode button is clicked */
decodeBtn.onclick = () => {

				toEncrypt = false;
				
				decodeBtn.classList.add("active");
				encodeBtn.classList.remove("active");
				
				textLabel.textContent = "Cipher Text";
				caesarLabel.textContent = "Plain Text";	
				
				inputText.classList.add("enc-text");
				inputText.classList.remove("plain-text");
				
				outputText.classList.add("plain-text");
				outputText.classList.remove("enc-text");
}

shiftVal.oninput =  (event) => {
				updateText();
}

includeChars.onclick =  () => {
				includeChars.style.color = "#000";
				ignoreChars.style.color = "#A1A8AB";
}

ignoreChars.onclick = () => {
				includeChars.style.color = "#A1A8AB";
				ignoreChars.style.color = "#000";
}

exgEncrypt.onclick = () => {
				shiftVal.focus();
}

caseType.oninput = () => {
				updateText();
}


includeChars.onclick = () => {
				includeChars.style.color = "#000";
				ignoreChars.style.color = "#A1A8AB";
				
				updateText();
}

ignoreChars.onclick = () => {

				includeChars.style.color = "#A1A8AB";
				ignoreChars.style.color = "#000";
				
				let text = "";
				
				if (toEncrypt) {								
								text = encrypt(inputText.value, shiftVal.value).match(/[a-zA-z]/g);
								
								if (text !== null) {
												outputText.value = text.join();
								}
				}
				else {
								text = decrypt(inputText.value, shiftVal.value).match(/[a-zA-z]/g).join("");
								
								if (text !== null) {
												outputText.value = text;
								}
				}
}

function updateText() {
				let text = inputText.value;
				
				if (caseType.value === "ignore") 
								text = text.toLowerCase();
								
				if (toEncrypt) {
								outputText.value = encrypt(text, shiftVal.value);
				}
				else {
								outputText.value = decrypt(text, shiftVal.value);
				}
				exgEncrypt.innerHTML = `a <img src="img/right-arrow.png" alt=""> ${encrypt("a", shiftVal.value)}`;
				
}

function getKey(obj, value) {
				return Object.keys(obj).find(key => obj[key] === value);
}

function encrypt(text, shift) {
				let res = "";
				let num = 0;
				
				for (i in text) {
								if (shift < 0) {
												num = 26-Math.abs((letterKeys[text[i].toLowerCase()] - Math.abs(Number(shift)))%26);
								}
								else {
												num = (letterKeys[text[i].toLowerCase()] + Number(shift))%26;
								}
								
								if (num===0) num = 26;
								res += getEncrypt_Decrypt(text[i], num);
				}				
				return res;
}

function decrypt(text, shift) {
				let res = "";
				let num = 0;
			
				for (i in text) {
								if (shift == 0) {
												num = 1;
							 }
							 else {
											 num = 26-Math.abs((letterKeys[text[i].toLowerCase()] - Math.abs(Number(shift)))%26);
							 }
							 
								if (num===0) num = 26;
							 res += getEncrypt_Decrypt(text[i], num);
				}				
				return res;
}

function isAlpha(letter) {
				return letter.match(/[a-zA-Z]/);
}

function getEncrypt_Decrypt(letter, shiftNum) {
				let key = "";
				
				if (isAlpha(letter)) {
								if (letter === letter.toLowerCase()) 
								{
												key = getKey(letterKeys, shiftNum);
								}
								else {
												key = getKey(letterKeys, shiftNum);
												if (key !== undefined) key = key.toUpperCase();
								}
				}				
				else {
								key = getKey(letterKeys, shiftNum);
				}
				
				if (key === undefined) return letter;
				else return key;
}
