

let streakOne = 2;
function subractOne(){
    streakOne--;
    updateText();
}
function addOne(){
    streakOne++;
    updateText();
}

function updateText(){
    document.getElementById('streakOne').innerHTML = "<h4>" + streakOne +  "</h4>";
}