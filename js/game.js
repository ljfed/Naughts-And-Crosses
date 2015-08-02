var counter = 0;
$(document).ready(function(){
    $('.gameTile').click(function() {
        if (counter%2 === 0) {
            $(this).attr('src', 'images/x.png');
            counter = counter+1;
            //console.log(counter);
        } else if (counter === 9) {
            
        } else {
            $(this).attr('src', 'images/circle.png');
            counter = counter+1;
            //console.log(counter);            
        }
    });
});

$(document).ready(function(){
    $('#reset').click(function(){
        $('.gameTile').attr('src', 'images/blank.png');
        counter = 0;
    });
});