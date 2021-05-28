var imagePath = 'Cards/';
var images = Array(20).fill(null);
var firstPick = -1;
var secondPick = -2;
var matches = 0;
var tries = 0;

function init(){
    fillImages();
    shuffleImages();
    showMatches();
    enableAllCards();
    showAllBacks();

}

function fillImages(){
    var values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
    var suits = ['h', 's'];
    var index = 0;
    for(var value = 0; value < values.length; value++){
        for(var suit = 0; suit < suits.length; suit++){
            images[index] = 'card' + values[value] + suits[suit] + '.jpg';
            index++;
        }
    }
}

function shuffleImages(){
    for(var i = 0; i < images.length; i++){
        var rnd = Math.floor(Math.random()* images.length);
        var temp = images[i];
        images[i] = images[rnd];
        images[rnd] = temp;
    }
}

function showMatches(){
    document.getElementById("status").innerHTML = "Matches : " + matches + " | Tries : " + tries; 
    if(matches == 10) {
        var question = confirm("Do you want to play again?");
        if(question == true){
            new Concentration();
            matches = 0;
            tries = 0;
        }
    }
}

function enableAllCards(){
    var cards = document.getElementsByName("card");
    for (var i = 0; i < cards.length; i++){
        cards[i].onclick = handleClick;
        cards[i].style.cursor = 'pointer';
    }
}

function enableAllRemainingCards(){
    var cards = document.getElementsByName("card");
    for (var i = 0; i < cards.length; i++){
        if(cards[i].style.backgroundImage != 'none') {
            cards[i].onclick = handleClick;
            cards[i].style.cursor = 'pointer';
        }

    }
}

function handleClick() {
    var index = this.id;
    var cardImage = imagePath + images[index];
    this.style.backgroundImage = 'url(' + cardImage + ')';
    disableCard(index);
    if (firstPick == -1)
        firstPick = index;
    else {
        secondPick = index;
        disableAllCards();
        setTimeout(checkCards, 2000);
    }
}

function disableCard(index){
    var card = document.getElementById(index);
    card.onclick = () => {};
    card.style.cursor = 'none';
}

function disableAllCards(){
    var cards = document.getElementsByName("card");
    for(var i = 0; i < cards.length; i++){
        disableCard(i);
    }
}

function showBack(index){
    var backImage = imagePath + 'black_back.jpg';
    var card = document.getElementById(index);
    card.style.backgroundImage = 'url(' + backImage + ')';
}

function showAllBacks(){
    var cards = document.getElementsByName("card");
    for(var i = 0; i < cards.length; i++){
        showBack(i);
    }
}

function checkCards(){
    tries++;
    if(isMatch() == true){
        matches++;
        removeCard(firstPick);
        removeCard(secondPick);
        if(matches < 10){
            enableAllRemainingCards();
        }
    }
    else{
        showBack(firstPick);
        showBack(secondPick);
        enableAllRemainingCards();
    }
    showMatches();
    firstPick = -1;
    secondPick = -1;
}

function isMatch(){
    if(images[firstPick].substr(4,1) == images[secondPick].substr(4,1)){
        return true;
    }
    else{
        return false;
    }
}

function removeCard(index){
    var card = document.getElementById(index);
    card.style.backgroundImage = 'none';
}


window.onload = init;