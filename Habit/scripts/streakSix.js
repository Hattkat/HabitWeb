

let streakTwo = 2;
function H2subractOne(){
    streakTwo--;
    H2updateText();
}
function H2addOne(){
    streakTwo++;
    H2updateText();
}

function H2updateText(){
    document.getElementById('streakTwo').innerHTML =  "</h4>";
}