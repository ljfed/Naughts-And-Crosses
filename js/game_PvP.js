var counter = 0;
var tilesClicked = [];
var circles = [];
var crosses = [];
var scoreX = 0;
var scoreO = 0;
var numTies = 0;
var gamesInSession = 0;
var goingNext = 'x';

//Resetfunctions
function reset() {
    counter = 0;
    tilesClicked = [];
    circles = [];
    crosses = [];
    $('.gameTile').attr('src', 'images/blank.png');
}
function resetScores() {
    scoreX = 0;
    scoreO = 0;
    numTies = 0;
    gamesInSession = 0;
    goingNext = 'x';
    $("#p1Score").text(scoreX);
    $("#p2Score").text(scoreO);
    $("#numTies").text(numTies);
    $('#goingNext').removeClass('p2Colour').addClass('p1Colour').text("Player 1 (X)");
}
//Is an item in an array?
function isObjInArr(obj, arr) {
    for (var i=0;i<arr.length;i++) {
        if (arr[i] === obj) {
            return true; //is in the array
        }
    }
    return false;
}
//Function that checks for a result
function CheckForResult(arr) {
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
        gamesInSession++;
        numTies++;
        $('#numTies').text(numTies);
        reset();
    }
}

function whoGoesNext() {
    if (gamesInSession%2===0) {
        if (counter%2===0) {
            goingNext = 'x';
        } else {
            goingNext = 'o';
        }
    } else {
        if (counter%2===1) {
            goingNext = 'x';
        } else {
            goingNext = 'o';
        }        
    }
}
//Crosses
(function( $ ){
    $.fn.gameCross = function() {
        crosses.push(tileClicked); 
        counter++;
        $('#goingNext').removeClass('p1Colour').addClass('p2Colour').text("Player 2 (O)");
        if (CheckForResult(crosses)) {
            alert("Player 1 (X) WINS!");
            gamesInSession++;
            reset();
            scoreX++;
            $("#p1Score").text(scoreX);
        }
    };
})( jQuery );
//Circles
(function( $ ){
    $.fn.gameCircle = function() {
        circles.push(tileClicked);
        counter++;
        $('#goingNext').removeClass('p2Colour').addClass('p1Colour').text("Player 1 (X)");
        if (CheckForResult(circles)) {
            alert("Player 2 (O) WINS!");
            gamesInSession++;
            reset();
            scoreO++;
            $("#p2Score").text(scoreO);
        }        
    };
})( jQuery );

//Tiles change on click:
$(document).ready(function(){ 
    $('.gameTile').click(function() {
        tileClicked = $(this).attr('id');
        if (isObjInArr(tileClicked, tilesClicked)) {
            //Do nothing (tile has already been clicked)
        } else {
            tilesClicked.push(tileClicked);
            whoGoesNext();
            if (goingNext==='x') {
                $(this).attr('src', 'images/x.png');
                $().gameCross();
            } else {
                $(this).attr('src', 'images/circle.png');
                $().gameCircle();
            }
        }
    });
});

//Reset Button:
$(document).ready(function(){
    $('#reset').click(function(){
        reset();
        resetScores();
    });
});