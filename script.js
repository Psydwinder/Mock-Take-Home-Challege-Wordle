let height = 6; //number of guesses
let width = 5; //length of the word

let row = 0; //current guess
let col = 0; //current letter for that attempt

let gameOver = false;
let word = "SQUID";

window.onload = function () {
  initialise();
};

function initialise() {
  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      let tile = document.createElement("span");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.innerText = "";
      document.getElementById("board").appendChild(tile);
    }
  }

  document.addEventListener("keyup", (e) => {
    if (gameOver) return;
    if ("KeyA" <= e.code && e.code <= "KeyZ") {
      if (col < width) {
        let currentTile = document.getElementById(
          row.toString() + "-" + col.toString()
        );
        if (currentTile.innerText == "") {
          currentTile.innerText = e.code[3];
          col += 1;
        }
      }
    } else if (e.code == "Backspace") {
      if (0 < col && col < width) {
        col -= 1;
      }
      let currentTile = document.getElementById(
        row.toString() + "-" + col.toString()
      );
      currentTile.innerText = "";
    } else if (e.code == "Enter") {
      update();
      row += 1;
      col = 0;
    }

    if (!gameOver && row == height) {
      gameOver = true;
      document.getElementById("answer").innerText = word;
    }
  });
}

function update() {
  let correct = 0;
  let letterCount = {};
  for (let i = 0; i < word.length; i++) {
    letter = word[i];
    if (letterCount[letter]) {
      letterCount[letter] += 1;
    } else {
      letterCount[letter] = 1;
    }
  }

  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(
      row.toString() + "-" + c.toString()
    );
    let letter = currentTile.innerText;
    if (word[c] == letter) {
      currentTile.classList.add("correct");
      correct += 1;
      letterCount[letter] -= 1;
    }
    if (correct == width) {
      gameOver = true;
    }
  }

  for (let c = 0; c < width; c++) {
    let currentTile = document.getElementById(
      row.toString() + "-" + c.toString()
    );
    let letter = currentTile.innerText;

    if (!currentTile.classList.contains("correct")) {
      if (word.includes(letter) && letterCount[letter] > 0) {
        currentTile.classList.add("present");
        letterCount[letter] -= 1;
      } else {
        currentTile.classList.add("absent");
      }
    }
  }
}
