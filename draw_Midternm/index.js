// All my applications variables
var myScreenLocalization = { x: 0, y: window.innerHeight / 2 };
var counter = 0;
var minFontSize = 6;
var angleDistortion = 5;
var letters = " And it came to pass that I, Nephi, said unto my father: I will go and do the things which the Lord hath commanded, for I know that the Lord giveth no commandments unto the children of men, save he shall prepare a way for them that they may accomplish the thing which he commandeth them..";

//this is my draw variables 
var drawArea;
var drawStuff;
var pointer = { x: 0, y: 0, down: false }

function executeMycode() {
    drawArea = document.getElementById('canvas');
    drawStuff = drawArea.getContext('2d');
    drawArea.width = window.innerWidth;
    drawArea.height = window.innerHeight;

    drawArea.addEventListener('mousemove', mouseMove, false);
    drawArea.addEventListener('mousedown', mouseDown, false);
    drawArea.addEventListener('mouseup', mouseUp, false);
    drawArea.addEventListener('mouseout', mouseUp, false);
    drawArea.addEventListener('dblclick', doubleClick, false);
    

    // that will works for touch screen
    drawArea.addEventListener('touchmove', mouseMove, false);
    drawArea.addEventListener('touchstart', mouseDown, false);
    drawArea.addEventListener('touchend', mouseUp, false);
    drawArea.addEventListener('touchcancel', mouseUp, false);
    //drawArea.addEventListener('dblclick', doubleClick, false);
    
    
    window.onresize = function(event) {
        drawArea.width = window.innerWidth;
        drawArea.height = window.innerHeight;
    }
}

function mouseMove(event) {
    pointer.x = event.pageX;
    pointer.y = event.pageY;
    draw();
}

function doubleClick(event) {
    drawArea.width = drawArea.width;
}

function draw() {
    if (pointer.down) {
        var myDistance = distance(myScreenLocalization, pointer);
        var fontSize = minFontSize + myDistance / 2;
        var letter = letters[counter];
        var stepSize = textWidth(letter, fontSize);

        if (myDistance > stepSize) {
            var angle = Math.atan2(pointer.y - myScreenLocalization.y, pointer.x - myScreenLocalization.x);

            drawStuff.font = fontSize + "px Georgia";
            drawStuff.style = "color:" ;
            drawStuff.save();
            drawStuff.translate(myScreenLocalization.x, myScreenLocalization.y);
            drawStuff.rotate(angle);
            drawStuff.fillText(letter, 0, 0);
            drawStuff.restore();

            counter++;
            if (counter > letters.length - 1) {
                counter = 0;
            }

            console.log(myScreenLocalization.x + Math.cos(angle) * stepSize)
            myScreenLocalization.x = myScreenLocalization.x + Math.cos(angle) * stepSize;
            myScreenLocalization.y = myScreenLocalization.y + Math.sin(angle) * stepSize;

        }
    }
}

function distance(pt, pt2) {

    var xs = 0;
    var ys = 0;

    xs = pt2.x - pt.x;
    xs = xs * xs;

    ys = pt2.y - pt.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
}

function mouseDown(event) {
    pointer.down = true;
    myScreenLocalization.x = event.pageX;
    myScreenLocalization.y = event.pageY;
    color = //change this to a color;
    document.getElementById('info').style.display = 'none';
}

function textWidth(string, size) {
    drawStuff.font = size + "px Georgia";

    if (drawStuff.fillText) {
        return drawStuff.measureText(string).width;
    } else if (drawStuff.mozDrawText) {
        return drawStuff.mozMeasureText(string);
    }

};

function mouseUp(event) {
    pointer.down = false;
}

executeMycode();
