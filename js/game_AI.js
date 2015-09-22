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
var corners = ['11', '13', '31', '33'];
var edges = ['21', '32', '12', '23'];
var secondMove = '';
//Reset functions
function reset() {
    counter = 0;
    tilesClicked = [];
    circles = [];
    crosses = [];
    ai_next_move = '';
    secondMove = '';
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
    secondMove = '';
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

function arrayStuff(tileA) {
    tilesClicked.push(tileA);
    var index = tilesLeft.indexOf(tileA);
    tilesLeft.splice(index, 1); 
}

function ai_win_defend() { 
    moveRequired = false;
    results = [ //resets every time the function is called
        ['11', '12', '13'], //row 1
        ['21', '22', '23'], //row 2
        ['31', '32', '33'], //row 3
        ['11', '21', '31'], //collumn 1
        ['12', '22', '32'], //collumn 2
        ['13', '23', '33'], //collumn 3
        ['13', '22', '31'], //diagonal 1
        ['11', '22', '33'], //diagonal 2     -
    ];
    var defendingMoves = []
    for (var a = 0; a < results.length; a++) {
        var counter_x = 0;
        var counter_o = 0;
        for (var b = 0; b < results[a].length; b++) {
            //replace coordinate with 'o' or 'x'
            for (item = 0; item < circles.length; item++) {
                if (circles[item] === results[a][b]) { //can't have same item in circles and crosses
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
            if (counter_o >= 2 && counter_x === 0) {
                //make AI's next click at the coordinate of the square that is left
                for (var c = 0; c < 3; c++) {
                    if (results[a][c] !== 'o') {
                        if (!isObjInArr(results[a][c], tilesClicked)) {
                            ai_next_move = results[a][c];
                            moveRequired = true;
                            //console.log('winning move: ' + ai_next_move);
                            return;
                        }
                    }
                }
            } else if (counter_x >= 2 && counter_o === 0) {
                //make AI's next click at the coordinate of the square that is left
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
    if (defendingMoves.length === 0) { //this is called here to make sure winning moves are ALWAYS prioritized
        ai_next_move = tilesLeft[Math.floor(Math.random()*tilesLeft.length)];
        //console.log('should be random: ' + ai_next_move);
        return;
    } else {
        ai_next_move = defendingMoves[Math.floor(Math.random()*defendingMoves.length)]; //just do defendingMoves[0], but thats boring! lol
        moveRequired = true;
        //console.log('should choose a (random) defending move: ' + ai_next_move);
    }
}

function loopAndCheck(arr) { 
    for (var i = 0; i < arr.length; i++) {
        if (!isObjInArr(arr[i], tilesClicked)) {
            ai_next_move = arr[i]; 
            return;
        }
    }
}

function ai_shot() {
    ai_win_defend(); 
    if (moveRequired === true) {
        ai_win_defend();
        
    } else if (counter === 0) { //meaning ai goes first
        ai_next_move = corners[Math.floor(Math.random()*corners.length)]; //ai goes in random corner 
        //console.log('moving in a corner (first): ' + ai_next_move);
        
    } else if (counter === 1) { //meaning ai goes 2nd
        //ai go in center or random corner if player going forst went in center
        if (isObjInArr('22', tilesClicked)) { //FIX
            ai_next_move = corners[Math.floor(Math.random()*corners.length)]; //no need to check if in tilesclicked as only '22' (center) is in it
            secondMove = 'corner';
            //console.log('moving on random corner (second): ' + ai_next_move);            
        } else {
            ai_next_move = '22';
            secondMove = 'center';
            //console.log('moving in center (second): ' + ai_next_move);
        }
        
    } else if (counter === 2) { //meaning ai goes 3rd (and also went first)
        //ai goes in another corner
        loopAndCheck(corners);
        //console.log('moving on corner (third): ' + ai_next_move);                      
        
    } else if (counter === 3) { //meaning ai goes 4th (and also went second)
        //ai follows up center with an edge OR follows up a corner with two options: defend or another corner
        if (secondMove === 'center') {
            loopAndCheck(edges);
            //console.log('moving on random edge (fourth): ' + ai_next_move);
        } else if (secondMove === 'corner') {
            loopAndCheck(corners);
            //console.log('moving on corner (fourth): ' + ai_next_move);
        }
        secondMove = '';
    }
}

(function( $ ){
    $.fn.gameCross = function() {
        crosses.push(tileClicked); 
        counter++; 
        if (CheckForResult(crosses)) {
            alert("Player 1 (X) WINS!");
            gamesInSession++;
            scoreX++;
            $("#p1Score").text(scoreX);
            reset();
        }
    };
})( jQuery );

//Circles (AI)
(function( $ ){
    $.fn.gameCircle = function() {
        ai_shot();
        $('#' + ai_next_move).attr('src', 'images/circle.png');
        arrayStuff(ai_next_move);
        circles.push(ai_next_move);
        counter++; 
        if (CheckForResult(circles)) {
            alert("Player 2 (O) WINS!");
            gamesInSession++;
            scoreO++;
            $("#p2Score").text(scoreO);
            reset();
        }        
    };
})( jQuery );

//The part that actually does stuff (calls functions)
whoGoesNext();
if (goingNext === 'x') {
    $(document).ready(function(){ 
        $('.gameTile').click(function() {
            tileClicked = $(this).attr('id');
            if (!isObjInArr(tileClicked, tilesClicked)) { //alternatly could use tilesLeft
                arrayStuff(tileClicked);
                $(this).attr('src', 'images/x.png');
                $().gameCross();
                whoGoesNext();
                $().gameCircle();
            }
        });
    });    
} else {
    $().gameCircle();
    console.log('else loop');
}
//Reset Button:
$(document).ready(function(){
    $('#reset').click(function(){
        reset();
        resetScores();
    });
});