//use jquery's getscript to link to PvAI or PvP script
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
var ai_next_move = '';
var hasMove = false;

//Resetfunctions
function reset() {
    counter = 0;
    tilesClicked = [];
    circles = [];
    crosses = [];
    ai_next_move = ''; //is this need? is it bad to put here?
    tilesLeft = ['11','12','13','21','22','23','31','32','33'];
    $('.gameTile').attr('src', 'images/blank.png');
}
function resetScores() {
    scoreX = 0;
    scoreO = 0;
    numTies = 0;
    gamesInSession = 0;
    goingNext = 'x';
    ai_next_move = '';
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

function arrayStuff(tileA) {
    tilesClicked.push(tileA);
    var index = tilesLeft.indexOf(tileA);
    tilesLeft.splice(index, 1); //potential bug of only splicing 1? (unlikely) 
}

function ai_shot() { //MUST CALL FUNCTION AFTER appending to circles/crosses || propblem with moving to defend (eg. row one) instead of moving to win (eg. in row three), fix by checking / counting outside of a inner for loop 
    results = [ //put a var?
        ['11', '12', '13'], //row 1
        ['21', '22', '23'], //row 2
        ['31', '32', '33'], //row 3
        ['11', '21', '31'], //collumn 1
        ['12', '22', '32'], //collumn 2
        ['13', '23', '33'], //collumn 3
        ['13', '22', '31'], //diagonal 1
        ['11', '22', '33'], //diagonal 2     -->pretty sure this resets whe ngame resets
    ];
    var defendingMoves = []
    for (var a = 0; a < results.length; a++) {
        var counter_x = 0;
        var counter_o = 0;
        for (var b = 0; b < results[a].length; b++) {
            //replace coordinate with 'o' or 'x'
            for (item = 0; item < circles.length; item++) {
                if (circles[item] === results[a][b]) { //cant have same item in circles and crosses right?
                    results[a][b] = 'o';
                    counter_o++;
                }
            }
            for (item2 = 0; item2 < crosses.length; item2++) {
                if (crosses[item2] === results[a][b]) {
                    results[a][b] = 'x';
                    counter_x++;
                }
            }
            if (counter_o >= 2 && counter_x === 0) { //Does  && counter_x === 0 fix problem?
                //make AI's next click at the coordinate of the one left
                for (var c = 0; c < 3; c++) {
                    if (results[a][c] !== 'o') {
                        if (!isObjInArr(results[a][c], tilesClicked)) {
                            ai_next_move = results[a][c]; //this being the AI's next move #HERE IS THE OUTPUT!!!!!#
                            console.log('winning move: ' + ai_next_move);
                            return;
                        } else {
                            //GO RANDOM?
                        }
                    }
                }
            } else if (counter_x >= 2 && counter_o === 0) { //Does  && counter_o === 0 fix problem?
                //make AI's next click at the coordinate of the one left
                for (var c = 0; c < 3; c++) {
                    if (results[a][c] !=='x' && results[a][c] !=='o') {
                        if (!isObjInArr(results[a][c], tilesClicked)) {
                            defendingMoves.push(results[a][c]);
                        }
                    }
                }
            } 
        }
    }
    if (defendingMoves.length === 0) {
        ai_next_move = tilesLeft[Math.floor(Math.random()*tilesLeft.length)];
        console.log('should be random: ' + ai_next_move);
        return;
    } else {
        ai_next_move = defendingMoves[Math.floor(Math.random()*defendingMoves.length)]; //just do defendingMoves[0]
        console.log('should choose a (random) defending move: ' + ai_next_move);
    }
}

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
//Circles (AI stuff goes here)
(function( $ ){
    $.fn.gameCircle = function() {
        //tileClicked = tilesLeft[Math.floor(Math.random()*tilesLeft.length)];
        //$('#' + tileClicked).attr('src', 'images/circle.png');
        ai_shot();
        $('#' + ai_next_move).attr('src', 'images/circle.png');
        arrayStuff(ai_next_move);
        circles.push(ai_next_move);
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

//The part that actually does stuff (tiles change on click / AI does stuff)
whoGoesNext()
if (goingNext === 'x') {
    $(document).ready(function(){ 
        $('.gameTile').click(function() {
            tileClicked = $(this).attr('id');
            if (isObjInArr(tileClicked, tilesClicked)) { //alternatly could use tiles left
                //Do nothing (tile has already been clicked)
            } else {
                arrayStuff(tileClicked);
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