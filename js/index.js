const slotsHtml = [];
const pointSpan = document.getElementById("point");
const mistakeSpan = document.getElementById("mistake");
// html elements
let slotNum = [];
// selcted slot number
let slotKey = [];
// hotkey for slot
let settingMode = false;
let slotRows = 4;
let slotCols = 9;

let points = 0;
let mistakes = 0;

for (let i = 0; i <= slotRows; i++) {
  for (let j = 1; j <= slotCols; j++) {
    slotsHtml[i + "-" + j] = document.getElementById(i + "-" + j);
    if (i == 0) {
      slotsHtml[i + "-" + j].addEventListener("click", (e) => {
        clickSettings(e);
      });
    }
  }
}

for (let i = 1; i <= slotCols; i++) {
  slotKey[i] = i;
}

function startSelected() {
  for (let i = 1; i <= slotRows; i++) {
    slotNum[i] = rand(1, slotCols);
  }
  updateStyle();
}

function newSelected() {
  for (let i = 1; i <= slotRows; i++) {
    if (i != slotRows) {
      slotNum[i] = slotNum[i + 1];
    } else {
      slotNum[i] = rand(1, slotCols);
    }
  }
  updateStyle();
}

function resetStyle() {
  for (let i = 1; i <= slotRows; i++) {
    for (let j = 1; j <= slotCols; j++) {
      slotsHtml[i + "-" + j].removeAttribute("class");
    }
  }
}

function slotKeyChange() {
  console.log("slotKeyChange");
  settingMode = false;
}

function checkValidKey(key) {
  for (let i = 0; i <= slotCols; i++) {
    if (key == slotKey[i]) {
      return false;
    }
  }
  return true;
}

function clickSettings(e) {
  settingMode = true;
  console.log(e);
  e.classList.add(settingMode);
}

function updateStyle() {
  resetStyle();
  for (let i = 1; i <= slotRows; i++) {
    slotsHtml[i + "-" + slotNum[i]].classList.add("target");
  }
}

function checkSlotKey(key) {
  let elem = slotsHtml["0-" + slotNum[1]];
  if (key == slotKey[slotNum[1]]) {
    console.log(elem);

    elem.classList.add("clicked");
    setTimeout(() => {
      elem.classList.remove("clicked");
    }, 250);

    newSelected();
    addPoint();
  } else {
    addMistake();
  }
}

function addPoint() {
  points++;
  pointSpan.innerHTML = points;
}

function addMistake() {
  mistakes++;
  mistakeSpan.innerHTML = mistakes;
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

startSelected();

window.addEventListener("keydown", (e) => {
  if (settingMode == false) {
    checkSlotKey(e.key);
  } else {
    slotKeyChange(e.key);
  }
});
