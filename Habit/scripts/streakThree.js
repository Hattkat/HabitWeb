

let streakThree = 2;
function H3subractOne(){
    streakThree--;
    H3updateText();
}
function H3addOne(){
    streakThree++;
    H3updateText();
}

function H3updateText(){
    document.getElementById('streakThree').innerHTML = "<h4>" + streakThree + "</h4>";
}