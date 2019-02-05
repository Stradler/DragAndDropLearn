const box = document.createElement("div");
const container = document.createElement("div");
const root = document.getElementById("root");
const pointsNode = document.getElementById("points");
const phraseNode = document.getElementById("phrase");
const containerObj = [];
const boxesLength = 30;
const phrase = "VI VON ZU LUL";
const guessed = [];
let phraseLength = phrase.length;
const mapObj = {};
let points = 140;

for (let i = 0, len = phrase.length; i < len; i++) {
  const letterBox = document.createElement("div");
  letterBox.classList.add("letter");
  letterBox.setAttribute("data-letter", "none");
  guessed.push({ node: letterBox });
  letterBox.innerText = "_";
  phraseNode.append(letterBox);
}

function updatePhrase(letter, ind) {
  phraseLength--;
  guessed[ind].node.innerHTML = letter;
  if (!phraseLength) {
    alert("VI VON ZU LUL");
  }
}

function changePoints(operation, ratio = 1) {
  if (operation === "+") {
    points = points + 1 * ratio;
  }

  if (operation === "-") {
    points = points - 1 * ratio;
  }
  pointsNode.innerText = points;
}

for (let i = 0; i < phraseLength; i++) {
  let rand = Math.floor(Math.random() * (boxesLength - 1) + 1);
  while (mapObj[rand]) {
    rand = Math.floor(Math.random() * (boxesLength - 1) + 1);
  }
  mapObj[rand] = { letter: phrase[i], ind: i };
}

box.classList.add("box");
box.setAttribute("draggable", true);
container.classList.add("container");

for (let i = 0; i < boxesLength; i++) {
  const containerCopy = container.cloneNode(true);
  containerCopy.setAttribute(`data-index`, i);
  root.append(containerCopy);
}

const containers = document.getElementsByClassName("container");

containers[0].append(box);
for (const container of containers) {
  container.addEventListener("dragover", dragover);
  container.addEventListener("dragenter", dragenter);
  container.addEventListener("drop", drop);
}

function dragover(e) {
  e.preventDefault();
}

function dragenter(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  if (!this.firstChild) {
    const boxCopy = box.cloneNode(true);
    const ind = this.dataset.index;
    const letter = mapObj[ind] ? mapObj[ind].letter : ":(";
    boxCopy.innerHTML = letter;
    if (letter != ":(") {
      updatePhrase(letter, mapObj[ind].ind);
      changePoints("+");
    } else {
      changePoints("-");
    }
    this.append(boxCopy);
  }
}
