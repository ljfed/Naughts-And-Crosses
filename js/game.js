var counter = 0;
var tilesClicked = [];

function isObjInArr(obj, arr) {
    for (var i=0;i<arr.length;i++) {
        if (arr[i] === obj) {
            return true; //is in the array
        }
    }
    return false;
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
                counter++;
            }            
        } else {
            if (isObjInArr(tileClicked, tilesClicked)) {
                //do nothing (function returns true)
            } else {
                $(this).attr('src', 'images/circle.png');
                tilesClicked.push(tileClicked);
                counter++;
            }
        }
    });
});


//Reset Button:
$(document).ready(function(){
    $('#reset').click(function(){
        $('.gameTile').attr('src', 'images/blank.png');
        counter = 0;
        tilesClicked = [];
    });
});