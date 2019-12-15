$(document).ready(function() {
	$('.inputButton').click(function() {

		var lhs = 0;
		var op = "";
		var rhs = 0;

		var total = 0;

		if (this.id == "c" || this.id == "ce") {
			document.getElementById("screen").innerHTML = "";
			if (this.id == "c") {
				lhs        = 0;
				op         = "";
				rhs        = 0;
				inputValue = "";
				total      = 0;
				}
			else {
				
			}
		}
		else {
			document.getElementById("screen").innerHTML += this.id;
		}

		if (this.id == " equals ") {
			total = document.getElementById("screen").innerHTML;
			var calcArray = total.split(" ");
			lhs = parseFloat(calcArray[0]);
			op = calcArray[1];
			rhs = parseFloat(calcArray[2]);

			console.log(lhs + op + rhs);

			switch(op) {
				case "+":
					document.getElementById("screen").innerHTML = lhs + rhs;
					break;
				case "-":
					document.getElementById("screen").innerHTML = lhs - rhs;
					break;
				case "×":
					document.getElementById("screen").innerHTML = lhs * rhs;
					break;
				case "÷":
					document.getElementById("screen").innerHTML = lhs / rhs;
					break;
			}
		}
	});
});

interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
      var textEl = event.target.querySelector('p');

      textEl && (textEl.textContent =
        'moved a distance of '
        + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px');
    }
  });