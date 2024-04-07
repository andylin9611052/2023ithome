const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const options = ['剪刀', '石頭', '布'];

function startGame() {
  console.log('歡迎來到猜拳遊戲！');
  console.log('你的選項: 1. 剪刀, 2. 石頭, 3. 布');

  rl.question('請選擇一個選項 (1/2/3): ', (input) => {
    const playerChoice = parseInt(input) - 1;
    if (playerChoice < 0 || playerChoice > 2 || isNaN(playerChoice)) {
      console.log('請輸入有效的選項（1/2/3）。');
      startGame();
      return;
    }

    const computerChoice = Math.floor(Math.random() * 3);

    console.log(`你選擇了${options[playerChoice]}`);
    console.log(`電腦選擇了${options[computerChoice]}`);

    if (playerChoice === computerChoice) {
      console.log('平局！');
    } else if ((playerChoice === 0 && computerChoice === 2) || 
               (playerChoice === 1 && computerChoice === 0) || 
               (playerChoice === 2 && computerChoice === 1)) {
      console.log('你贏了！');
    } else {
      console.log('你輸了！');
    }

    rl.close();
  });
}

startGame();
