class Concentration {
    constructor() {
        this.imagePath = 'Cards/';
        this.images = Array(20).fill(null);
        this.firstPick = -1;
        this.secondPick = -2;
        this.matches = 0;
        this.tries = 0;

        //now, override JS behavior with keyword this, by binding keyword this in eventhandlers to this class
        this.showMatches = this.showMatches.bind(this);
        this.enableAllRemainingCards = this.enableAllRemainingCards.bind(this);
        this.enableAllCards = this.enableAllCards.bind(this);
        this.checkCards = this.checkCards.bind(this);
        this.disableAllCards = this.disableAllCards.bind(this);
        this.isMatch = this.isMatch.bind(this);

        this.init();
    }

    init() {
        this.fillImages();
        this.shuffleImages();
        this.showMatches();
        this.enableAllCards();
        this.showAllBacks();
    }

    fillImages() {
        let values = ['a', 'k', 'q', 'j', 't', '9', '8', '7', '6', '5'];
        let suits = ['h', 's'];
        let index = 0;
        for (let value = 0; value < values.length; value++) {
            for (let suit = 0; suit < suits.length; suit++) {
                this.images[index] = 'card' + values[value] + suits[suit] + '.jpg';
                index++;
            }
        }
    }

    shuffleImages() {
        for (let image of this.images) {
            let rnd = Math.floor(Math.random() * this.images.length);
            [image, this.images[rnd]] = [this.images[rnd], image]
        }
    }

    showMatches() {
        document.getElementById("status").innerHTML = "Matches : " + this.matches + " | Tries : " + this.tries;
        if (this.matches == 10) {
            let question = confirm("Do you want to play again?");
            if (question == true) {
                new Concentration();
                this.matches = 0;
                this.tries = 0;
            }
        }
    }

    enableAllCards() {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++) {
            cards[i].onclick = this.handleClick.bind(this, i);
            cards[i].style.cursor = 'pointer';
        }
    }

    enableAllRemainingCards() {
        var cards = document.getElementsByName("card");
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].style.backgroundImage != 'none') {
                cards[i].onclick = this.handleClick.bind(this, i);
                cards[i].style.cursor = 'pointer';
            }

        }
    }

    handleClick(index) {
        let cardImage = this.imagePath + this.images[index];
        document.getElementById(index).style.backgroundImage = 'url(' + cardImage + ')';
        this.disableCard(index);
        if (this.firstPick == -1)
            this.firstPick = index;
        else {
            this.secondPick = index;
            this.disableAllCards();
            setTimeout(this.checkCards, 2000);
        }
    }

    disableCard(index) {
        let card = document.getElementById(index);
        card.onclick = () => { };
        card.style.cursor = 'none';
    }

    disableAllCards() {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++) {
            this.disableCard(i);
        }
    }

    showBack(index) {
        let backImage = this.imagePath + 'black_back.jpg';
        let card = document.getElementById(index);
        card.style.backgroundImage = 'url(' + backImage + ')';
    }

    showAllBacks() {
        let cards = document.getElementsByName("card");
        for (let i = 0; i < cards.length; i++) {
            this.showBack(i);
        }
    }

    checkCards() {
        this.tries++;
        if (this.isMatch() == true) {
            this.matches++;
            this.removeCard(this.firstPick);
            this.removeCard(this.secondPick);
            if (this.matches < 10) {
                this.enableAllRemainingCards();
            }
        }
        else {
            this.showBack(this.firstPick);
            this.showBack(this.secondPick);
            this.enableAllRemainingCards();
        }
        this.showMatches();
        this.firstPick = -1;
        this.secondPick = -1;
    }

    isMatch() {
        if (this.images[this.firstPick].substr(4, 1) == this.images[this.secondPick].substr(4, 1)) {
            return true;
        }
        else {
            return false;
        }
    }

    removeCard(index) {
        let card = document.getElementById(index);
        card.style.backgroundImage = 'none';
    }
}
let concentration;
window.onload = () => { new Concentration(); }