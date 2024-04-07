const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function startGame() {
  console.log('歡迎來到猜數字遊戲！我們已經選擇了一個1到100之間的秘密數字。');
  askForGuess();
}

function askForGuess() {
  rl.question('請猜一個數字: ', (input) => {
    const guess = parseInt(input);

    if (isNaN(guess)) {
      console.log('請輸入有效的數字。');
      askForGuess();
    } else {
      attempts++;
      if (guess === secretNumber) {
        console.log(`恭喜你，你猜對了！答案是 ${secretNumber}，你用了 ${attempts} 次猜對。`);
        rl.close();
      } else if (guess < secretNumber) {
        console.log('太小了，請再試一次。');
        askForGuess();
      } else {
        console.log('太大了，請再試一次。');
        askForGuess();
      }
    }
  });
}

startGame();
