var counter = 0;
var tilesClicked = [];
var tilesLeft = ['11','12','13','21','22','23','31','32','33'];
var circles = [];
var crosses = [];
var scoreX = 0;
var scoreO = 0;
var numTies = 0;
var gamesInSession = 0;
var goingNext = '';

//Resetfunctions
function reset() {
    counter = 0;
    tilesClicked = [];
    circles = [];
    crosses = [];
    tilesLeft = ['11','12','13','21','22','23','31','32','33'];
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
            goingNext = 'x'; //but when the AI goes first it does counter++ making counter = 1 so O goes twice?
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

function arrayStuff() {
    tilesClicked.push(tileClicked);
    var index = tilesLeft.indexOf(tileClicked);
    tilesLeft.splice(index, 1); //potential bug of only splicing 1? (unlikely) 
}
//Crosses
(function( $ ){
    $.fn.gameCross = function() {
        crosses.push(tileClicked); 
        counter++; 
        if (CheckForResult(crosses)) {
            alert("Player 1 (X) WINS!");
            gamesInSession++;
            reset();
            scoreX++;
            $("#p1Score").text(scoreX);
            test = true;
        }
    };
})( jQuery );
//Circles (AI)
(function( $ ){
    $.fn.gameCircle = function() {
        tileClicked = tilesLeft[Math.floor(Math.random()*tilesLeft.length)];
        $('#' + tileClicked).attr('src', 'images/circle.png');
        arrayStuff();
        circles.push(tileClicked);
        counter++; 
        if (CheckForResult(circles)) {
            alert("Player 2 (O) WINS!");
            gamesInSession++;
            reset();
            scoreO++;
            $("#p2Score").text(scoreO);
        }        
    };
})( jQuery );

//Tiles change on click / with AI:
whoGoesNext()
if (goingNext === 'x') {
    $(document).ready(function(){ 
        $('.gameTile').click(function() {
            tileClicked = $(this).attr('id');
            if (isObjInArr(tileClicked, tilesClicked)) {
                //Do nothing (tile has already been clicked)
            } else {
                arrayStuff();
                $(this).attr('src', 'images/x.png');
                $().gameCross();
                whoGoesNext()
                $().gameCircle();
            }
        });
    });    
} else {
    $().gameCircle();
}

//Reset Button:
$(document).ready(function(){
    $('#reset').click(function(){
        reset();
        resetScores();
    });
});