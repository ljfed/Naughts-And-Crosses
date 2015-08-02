var counter = 0;
$(document).ready(function(){
    $('.gameTile').click(function() {
        if (counter%2 === 0) {
            $(this).attr('src', 'images/x.png');
            counter = counter+1;
            console.log(counter);
        } else if (counter === 9) {
            
        } else {
            $(this).attr('src', 'images/circle.png');
            counter = counter+1;
            console.log(counter);            
        }
    });
});
function isEven(n){
    checker = n%2;
    console.log(checker);
}
isEven(8);