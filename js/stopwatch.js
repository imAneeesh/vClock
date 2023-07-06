var hr = 0;
var min = 0;
var sec = 0;
var count = 0;
var timer = false;
const lapArray = [];
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapsBtn = document.getElementById("laps");
const btn = document.getElementsByClassName('btn');
const local=localStorage.getItem("lapArray");
const localArray = JSON.parse(local);
if(localArray.length<=0){
    document.getElementById("clearall").classList.add('d-none')
}

if (localStorage.getItem("lapArray") === null) {
    localStorage.setItem("lapArray", JSON.stringify([]));
}
// localStorage.setItem("lapArray",JSON.stringify([]));

const displayElement = document.getElementById("display");
function start() {
    stopBtn.classList.remove("d-none");
    lapsBtn.classList.remove("d-none");
    resetBtn.classList.remove("d-none");
    startBtn.classList.add("d-none");
    timer = true;

    startBtn.disabled = true;
    stopBtn.disabled = false;
    lapsBtn.disabled = false;
    stopwatch();
}
function stop() {
    lapsBtn.classList.add("d-none");
    document.getElementById("start").classList.remove("d-none");

    startBtn.disabled = false;
    stopBtn.disabled = true;
    timer = false;
}

function reset() {
    const display = document.getElementById("display");
    document.getElementById("stop").classList.add("d-none");
    lapsBtn.classList.add("d-none");
    startBtn.classList.remove("d-none");
    resetBtn.classList.add("d-none");
    // display.innerHTML='';
    lapsBtn.disabled = true;
    startBtn.disabled = false;

    timer = false;
    hr = 0;
    min = 0;
    sec = 0;
    count = 0;
    document.getElementById("sec").innerHTML = "00";
    document.getElementById("min").innerHTML = "00";
    document.getElementById("hr").innerHTML = "00";
    document.getElementById("count").innerHTML = "00";
}
function laps() {
    var localArray;
    document.getElementById("clearall").classList.remove('d-none')
    lapsec = document.getElementById("sec").textContent;
    lapMin = document.getElementById("min").textContent;
    lapHr = document.getElementById("hr").textContent;
    lapCount = document.getElementById("count").textContent;
    const newLap = lapHr + ": " + lapMin + ": " + lapsec + ": " + lapCount;
    const local = localStorage.getItem("lapArray")
    if (local == [] || local == undefined) {
        
        localArray = [];
    }
    else {
        localArray = JSON.parse(local);
    }
    localArray.push(newLap);
    localStorage.setItem("lapArray", JSON.stringify(localArray));
    display();

}
function display() {
    const displayItem = localStorage.getItem("lapArray");
    const displayParseItem = JSON.parse(displayItem);

    if (displayParseItem == [] || displayParseItem == undefined) {
        // Handle the case when displayParseItem is empty or undefined
        return;
    }

    const ulElement = document.createElement("ul");
    ulElement.classList.add("list-group");
    // Clear existing content of displayElement
    displayElement.innerHTML = "";
    displayParseItem.forEach((element,i) => {  
        const listItem = document.createElement("li");
        const spanItem=document.createElement("span"); 
        const spanItem2=document.createElement("span");
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fa-solid fa-trash-can"></i>`;
        deleteButton.classList.add("deleteButton");    
        spanItem.textContent=i+1;
        spanItem2.textContent = element;
        listItem.classList.add("laps","d-flex","justify-between","align-items-center","gap-3")
        listItem.appendChild(spanItem);
        listItem.appendChild(spanItem2);
        listItem.appendChild(deleteButton);
        ulElement.appendChild(listItem);
        deleteButton.addEventListener("click", () => {
            clearLapItem(i);
          })
    
    });

    displayElement.appendChild(ulElement);
}

function clearLap() {
    empty = localStorage.getItem("lapArray");
    
    emptyArray = JSON.parse(empty);
    emptyArray = [];
    localStorage.setItem("lapArray", JSON.stringify(emptyArray));
    document.getElementById("clearall").classList.add('d-none')
    display();
}
function clearLapItem(index) {
    const storedLaps = localStorage.getItem("lapArray");
    let lapArray = JSON.parse(storedLaps);
  
    if (lapArray && lapArray.length > index) {
      lapArray.splice(index, 1); // Remove the lap item at the specified index
      localStorage.setItem("lapArray", JSON.stringify(lapArray));
      display();
    }
  }
  

function stopwatch() {
    if (timer == true) {
        count = count + 1;
        if (count == 100) {
            sec = sec + 1;
            count = 0;
        }
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }
        var hrString = hr;
        var minString = min;
        var secString = sec;
        var countString = count;
        if (hr < 10) {
            hrString = "0" + hrString;
        }
        if (min < 10) {
            minString = "0" + minString;
        }
        if (sec < 10) {
            secString = "0" + secString;
        }
        if (count < 10) {
            countString = "0" + countString;
        }
        document.getElementById("sec").innerHTML = secString;
        document.getElementById("min").innerHTML = minString;
        document.getElementById("hr").innerHTML = hrString;
        document.getElementById("count").innerHTML = countString;
        setTimeout("stopwatch()", 10);
    }
}
display();