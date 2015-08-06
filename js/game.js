var counter = 0;
var tilesClicked = [];
var circles = [];
var crosses = [];

//Reset
function reset() {
    counter = 0;
    tilesClicked = [];
    circles = [];
    crosses = [];
    $('.gameTile').attr('src', 'images/blank.png');
}

//Is and item in and array?
function isObjInArr(obj, arr) {
    for (var i=0;i<arr.length;i++) {
        if (arr[i] === obj) {
            return true; //is in the array
        }
    }
    return false;
}

//Function that tests for three in a row
function CheckForResault(arr) { //IN PROGRESS
    var digitOneIsOne = 0;
    var digitOneIsTwo = 0;
    var digitOneIsThree = 0;
    var digitTwoIsOne = 0;
    var digitTwoIsTwo = 0;
    var digitTwoIsThree = 0;
    var diagonalUpRight = 0;
    var diagonalUpLeft = 0;
    for (var item in arr) {
        var coordinate = arr[item];
        if (coordinate[0] === '1') {
            digitOneIsOne++;
        } else if (coordinate[0] === '2') {
            digitOneIsTwo++;
        } else if (coordinate[0] === '3') {
            digitOneIsThree++;
        } 
        if (coordinate[1] === '1') {
            digitTwoIsOne++;
        } else if (coordinate[1] === '2') {
            digitTwoIsTwo++;
        } else if (coordinate[1] === '3') {
            digitTwoIsThree++;
        }
        if (coordinate==='11'||coordinate==='22'||coordinate==='33') {
            diagonalUpRight++;
        }
        if (coordinate==='13'||coordinate==='22'||coordinate==='31') {
            diagonalUpLeft++;
        }
    }
    if (digitOneIsOne>=3||digitOneIsTwo>=3||digitOneIsThree>=3||digitTwoIsOne>=3||digitTwoIsTwo>=3||digitTwoIsThree>=3||diagonalUpRight>=3||diagonalUpLeft>=3) {
        return true;
    }
    if (counter===9) {
        alert("The Game Is A Tie");
        reset();
    }
}

//Tiles change on click:
$(document).ready(function(){
    $('.gameTile').click(function() {
        tileClicked = $(this).attr('id');
        if (counter%2 === 0) { //checking counter is even
            if (isObjInArr(tileClicked, tilesClicked)) { //checking if tile has been clicked
                //Do nothing (function returns true)
            } else { //tile hasn't been clicked       
                $(this).attr('src', 'images/x.png');
                tilesClicked.push(tileClicked);
                crosses.push(tileClicked); 
                counter++;
                if (CheckForResault(crosses)) {
                    alert("Player 1 (X) WINS!");
                    reset();
                }
            }            
        } else {
            if (isObjInArr(tileClicked, tilesClicked)) {
                //do nothing (function returns true)
            } else {
                $(this).attr('src', 'images/circle.png');
                tilesClicked.push(tileClicked);
                circles.push(tileClicked);
                counter++;
                if (CheckForResault(circles)) {
                    alert("Player 2 (O) WINS!");
                    reset();
                }
            }
        }
    });
});

//Reset Button:
$(document).ready(function(){
    $('#reset').click(function(){
        reset();
    });
});