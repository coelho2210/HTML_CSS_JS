function loadNote(e) {
	document.getElementById("noteName").innerHTML = e.target.innerHTML;
	var noteContent = localStorage.getItem(document.getElementById("noteName").innerHTML);
	document.getElementById("notes").value = noteContent;
	if (document.getElementById("notes").value == "") {
		hotsnackbar(false, "No Notes Saved");
	}
	else {
		hotsnackbar(false, "Loaded Note");
	}
}

function saveNote(e) {
	localStorage.setItem(document.getElementById("noteName").innerHTML, document.getElementById("notes").value);
	hotsnackbar(false, "Saved Note");
}

window.addEventListener('load', function() {
		for(var i = 0; i < document.getElementsByClassName("dailyReading").length; i++) {
			document.getElementsByClassName("dailyReading")[i].addEventListener("click", loadNote);
	}
});

window.addEventListener('load', function() {
	document.getElementById("saveNote").addEventListener("click", saveNote);
});

function copyText() {
	var copyText = document.getElementById("notes");

	copyText.select();

	document.execCommand("copy");

	hotsnackbar(false, "Note Copied to Clipboard");
};

/////////////////////SNACKBAR//////////////////////////
		var prev_id = 0;
		var timouthsdiv = 0;
		var hstimout =2000;
		var signtext = {
			hsdone: '✔',
			hswarning: '❗',
			hserror: '✖',
			hsheart: '❤',
			hssad: '☹'
		};

		function removehs(random_idx, prev_idx, signx, textx) {

			clearTimeout(timouthsdiv);
			document.getElementById(prev_idx).className += " hsdivhide";
			
			prev_id = 0;
			makehs(random_idx, signx, textx);

		}

		function makehs(random_idx, signx, textx) {

			var hsdiv = document.createElement('div');

			var signdiv = document.createElement('span');
			if (signx) {
				// alert(sign);
				signdiv.className = signx;
				signdiv.innerHTML = signtext[signx];
			}
			hsdiv.appendChild(signdiv);

			var hstext = document.createElement('span');
			hstext.className = 'hstext';
			hstext.innerHTML = textx;
			hsdiv.appendChild(hstext);

			hsdiv.id = random_idx;
			hsdiv.className = 'hsdivinit';


			document.getElementsByTagName('body')[0].appendChild(hsdiv);
			var currenths = document.getElementById(random_idx);
			currenths.className += " hsdivshow";
			prev_id = random_idx;
			timouthsdiv = setTimeout(function () {
				currenths.className += " hsdivhide";
				prev_id = 0;
			}, hstimout);

		}


		function hotsnackbar(sign, text) {

			random_id = Math.random();

			if (prev_id) {

				removehs(random_id, prev_id, sign, text);

			} else {

				makehs(random_id, sign, text);
			}
		}
