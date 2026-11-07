let boxes = document.querySelectorAll(".box");
let resetbtn = document.getElementById("reset-btn");
let newGmebtn = document.getElementById("new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.getElementById("msg");

let turnO = true;

const Winpatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetgame = () => {
  turnO = true;

  enableBoxes();

  for (let box of boxes) {
    box.innerText = "";
  }

  msgContainer.classList.add("hide");
};


boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.textContent === "") {
      box.textContent = turnO ? "O" : "X";
      turnO = !turnO;
      checkWin();
    }
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
  } 
};

const showwin = (winner) => {
  msg.innerText = "Congratulations, winner is " + winner;
  msgContainer.classList.remove("hide");
};

const checkDraw = () => {
  let isDraw = true;

  for (let box of boxes) {
    if (box.innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    msg.innerText = "It's a Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
  }
};

const checkWin = () => {
  for (let pattern of Winpatterns) {
    let pos1value = boxes[pattern[0]].innerText;
    let pos2value = boxes[pattern[1]].innerText;
    let pos3value = boxes[pattern[2]].innerText;

    if (pos1value !== "" && pos2value !== "" && pos3value !== "") {
      if (pos1value === pos2value && pos2value === pos3value) {
        console.log("Winner:", pos1value);

        showwin(pos1value);
        disableBoxes();
        return;
      }
    }
  }

  checkDraw();
};

newGmebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);

// const checkWin = () => {
//     for (let i = 0; i < Winpatterns.length; i++) {
//         const [a, b, c] = Winpatterns[i];
//         if (boxes[a].textContent && boxes[a].textContent === boxes[b].textContent && boxes[a].textContent === boxes[c].textContent) {
//             alert(`${boxes[a].textContent} wins!`);
//             resetGame();
//             return;
//         }
//     }
//     if (Array.from(boxes).every(box => box.textContent !== '')) {
//         alert("It's a draw!");
//         resetGame();
//     }
// }
