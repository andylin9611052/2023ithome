const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startGame() {
  console.log('歡迎來到簡單的文字冒險遊戲！');
  console.log('你身處在一個神秘的森林中。');
  console.log('你必須做出一些選擇來繼續遊戲。\n');

  rl.question('你要往左走還是往右走？(left/right): ', (answer) => {
    if (answer === 'left') {
      console.log('你選擇了往左走。');
      console.log('你發現了一個寶箱，裡面有寶貴的寶物！');
      console.log('恭喜你，你贏得了遊戲！');
      rl.close();
    } else if (answer === 'right') {
      console.log('你選擇了往右走。');
      console.log('你走進了一個危險的巢穴，遭遇了一頭獅子。');
      console.log('獅子攻擊了你，你失敗了！');
      rl.close();
    } else {
      console.log('無效的選項，請選擇 "left" 或 "right".');
      startGame();
    }
  });
}

startGame();
