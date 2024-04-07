const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'honeydew', 'kiwi'];
const randomWord = words[Math.floor(Math.random() * words.length)];
let guessedWord = new Array(randomWord.length).fill('_');
let attempts = 6;

function displayWord() {
  console.log(`猜這個單詞: ${guessedWord.join(' ')}`);
}

function startGame() {
  console.log('歡迎來到猜單詞遊戲！');
  displayWord();
  console.log(`你有 ${attempts} 次嘗試機會。`);

  rl.setPrompt('請猜一個字母: ');
  rl.prompt();
  rl.on('line', (input) => {
    const letter = input.trim().toLowerCase();
    if (letter.length !== 1 || !/^[a-z]$/.test(letter)) {
      console.log('請輸入有效的單個字母。');
      rl.prompt();
      return;
    }

    if (randomWord.includes(letter)) {
      for (let i = 0; i < randomWord.length; i++) {
        if (randomWord[i] === letter) {
          guessedWord[i] = letter;
        }
      }
    } else {
      attempts--;
      console.log(`單詞中不包含 "${letter}"。還剩下 ${attempts} 次嘗試。`);
    }

    displayWord();

    if (guessedWord.join('') === randomWord) {
      console.log('恭喜你，你猜對了！答案是: ' + randomWord);
      rl.close();
    } else if (attempts === 0) {
      console.log('遊戲結束，你沒有機會了。正確答案是: ' + randomWord);
      rl.close();
    } else {
      rl.prompt();
    }
  });
}

startGame();
