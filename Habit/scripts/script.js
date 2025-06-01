function CreateHabit(habitName){
    //alert("Create New Habit");
    if(habitName.length >=4){
    addHabit(habitName, 0, habitName);
    }
}
function LinkToHome(){

    window.location.href="index.html";
}

function LinkToTips(){
    window.location.href="tips.html";
}

function LinkToInsights(){
    window.location.href="insights.html";
}
function LinkToHabits(){
    window.location.href="habit.html";
}

function mainPageStart(){
  console.log("main page start called");
  checkAllHabits();
  drawBarChart();
}

/** Local Storage-related code */
    
function addHabit(habitName, habitCount, habitDescription) {
    const existingHabits = localStorage.getItem("habits");
    console.log(existingHabits);
    const parsedHabits = existingHabits === null ? {} : JSON.parse(existingHabits);

    if(parsedHabits[habitName] == null){

   
    const habit = {};
    habit.name = habitName;
    habit.count = habitCount;
    habit.description = habitDescription;

    parsedHabits[habitName] = habit;
    // Save
    localStorage.setItem("habits", JSON.stringify(parsedHabits));
    console.log(parsedHabits);
    drawHabit(habit);
    }

}


function drawHabit(habit) {
    console.log(habit);
    const name = habit.name;
    const count = habit.count;

    document.getElementById("habitGrid").innerHTML += 
        `<div id="${name}" class="grid-item">
                <h4>  </h4> 
                <p>${name}</p> 
                <p>${count} Day Streak </p> 
                <button onclick="addOneHabit('${name}')" type="button"> Add A Habit </button> 
        </div>`
}

function redrawGrid(){

}


function addOneHabit(habitName){
    console.log(habitName);
    const existingHabits = localStorage.getItem("habits"); 
    console.log(existingHabits);
    const parsedHabits = existingHabits === null ? {} : JSON.parse(existingHabits);
    parsedHabits[habitName].count++;
    localStorage.setItem("habits", JSON.stringify(parsedHabits));
    refreshAllHabits();
}


function clearAllHabits(){
    localStorage.clear();
    refreshAllHabits();
}

function refreshAllHabits(){

    document.querySelectorAll(".grid-item").forEach((e) => e.parentNode.removeChild(e));

    const existingHabits = localStorage.getItem("habits");
    const parsedHabits = existingHabits === null ? {} : JSON.parse(existingHabits);

    const obj = parsedHabits;

    Object.entries(obj).forEach(([key, value]) => {
        console.log(key, value);
        drawHabit(value);
      });

      


}

function checkAllHabits(){

    const existingHabits = localStorage.getItem("habits");
    const parsedHabits = existingHabits === null ? {} : JSON.parse(existingHabits);

    const obj = parsedHabits;
    let maxStreak = -1;

    Object.entries(obj).forEach(([key, value]) => {
        console.log(key, value);
        if(value.count > maxStreak){
            maxStreak = value.count;
        }
        
      });
    
      console.log("maxStreak =",  maxStreak);

      let Bullet1 = document.getElementById('Bullet1');

      if(maxStreak>=0){
        setBulletIcon('Bullet1', 'fa fa-check-square');
      }
      else{
        setBulletIcon('Bullet1', 'fa fa-square-o');
      }


      if(maxStreak >= 7){
        setBulletIcon('Bullet2', 'fa fa-check-square');
      }  
      else{
        setBulletIcon('Bullet2', 'fa fa-square-o');
      }

      if(maxStreak >=31){
        setBulletIcon('Bullet3', 'fa fa-check-square');
      }
      else{
        setBulletIcon('Bullet3', 'fa fa-square-o');
      }
}


function setBulletIcon(bulletName, iconName){
        const item = document.getElementById(bulletName);
        item.style.listStyleType = 'none';
        item.style.position = 'relative';
        item.style.paddingLeft = '25px';
 
        const icon = document.createElement('i');
        icon.className = iconName;
        icon.style.position = 'absolute';
        icon.style.left = '0';
        icon.style.color = 'green';
 
        item.prepend(icon);
}


function exportHistory() {      
  var _myArray = JSON.stringify(localStorage.getItem("habits") , null, 4); 
  var item = document.getElementById('exportHistoryLink');
  var dataObject = new Blob([_myArray], {type: "octet/stream"});
  fileName = 'habit_export_file'  + '.json';
  objectUrl = window.URL.createObjectURL(dataObject);
  console.log(item);
  item.setAttribute('href', objectUrl);
  item.setAttribute('download', fileName );
  item.click();  
}


function importHistory() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
 
  input.onchange = event => {
    const file = event.target.files[0];
    if (!file) return;
 
    const reader = new FileReader();
 
    reader.onload = function(e) {
      try {
        const json = JSON.parse(e.target.result);
        console.log("Loaded JSON:", json);
        const jsonString = JSON.stringify(json);
        console.log(jsonString);
        localStorage.setItem("habits", json);
        const existingHabits = localStorage.getItem("habits"); 
        console.log(existingHabits);
        refreshAllHabits();
 
        // You can now use the json data in your program
        // e.g., displayData(json);
      } catch (err) {
        console.error("Invalid JSON file:", err);
      }
    };
 
    reader.readAsText(file);
  };
 
  input.click();
}


  let cnv;
 
  function setup() {
    // Create canvas
    cnv = createCanvas(500, 200);
    // Attach it to the specific column div
    cnv.parent('column3');
 
    background(200);
    fill(0);
    text('Canvas inside column', 10, 30);
 
    // Access HTMLCanvasElement and its 2D context
    let htmlCanvas = cnv.elt; // DOM element of canvas
    let ctx = htmlCanvas.getContext('2d');
 
    console.log('Canvas Context:', ctx); // Use ctx for raw drawing if needed
  }





 
      function drawBarChart() {
        background (200);
        const existingHabits = localStorage.getItem("habits");
        const parsedHabits = existingHabits === null ? {} : JSON.parse(existingHabits);
        const array = Object.values(parsedHabits);
        const keys = array.map(item => item.name);
        const values = array.map(item => item.count);
        console.log(keys, values);

        console.log("Has Called Function");
       // let keys = Object.keys(data);
       // let values = Object.values(data);
 
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");

        let chartWidth = canvas.width - 100;
        let chartHeight = canvas.height - 100;
        let barWidth = chartWidth / keys.length;
        let maxVal = Math.max(...values);
        console.log(maxVal);
 
       // ctx.translate(50, canvas.height - 50); // move origin to bottom-left
 
        for (let i = 0; i < keys.length; i++) {
          let val = values[i];
          let barHeight = map(val, 0, maxVal, 0, chartHeight);
 
          // Draw bar
          fill(100, 150, 255);
          rect(i * barWidth, -barHeight, barWidth - 10, barHeight);
          console.log(i * barWidth, -barHeight, barWidth - 10, barHeight);
          // Label
          fill(0);
          textAlign(CENTER);
          text(keys[i], i * barWidth + (barWidth - 10) / 2, 20);
          text(val, i * barWidth + (barWidth - 10) / 2, -barHeight - 5);
        }
      

}


