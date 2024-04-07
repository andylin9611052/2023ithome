const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inventory = [];
let currentRoom = '起始房間';
let copperCoins = 0; // 銅幣
let silverCoins = 0; // 銀幣
let goldCoins = 0; // 金幣;
let hasKey = false; // 是否擁有鑰匙

const rooms = {
  '起始房間': {
    description: '你現在在起始房間。有一扇門通向東邊的客廳。',
    items: ['鑰匙'],
    characters: {
      '守衛': {
        dialog: '守衛：你不能通過這扇門，除非你給我一枚金幣。',
        action: () => {
          if (inventory.includes('金幣')) {
            console.log('你給了守衛一枚金幣，守衛放你通過了。');
            currentRoom = '客廳';
          } else {
            console.log('你沒有足夠的金幣。');
          }
        },
      },
    },
    exits: {
      '東': '客廳',
    },
  },
  '客廳': {
    description: '你現在在客廳。有兩扇門通向西邊的起始房間和南邊的花園。',
    items: ['畫', '植物'],
    characters: {
      '花匠': {
        dialog: '花匠：我需要畫、花和植物來獲得銅幣。',
        action: () => {
          if (inventory.includes('畫') && inventory.includes('花') && inventory.includes('植物')) {
            console.log('你給了花匠畫、花和植物，他給了你一個銅幣。');
            rooms['客廳'].items = ['畫'];
            inventory.splice(inventory.indexOf('畫'), 1);
            inventory.splice(inventory.indexOf('花'), 1);
            inventory.splice(inventory.indexOf('植物'), 1);
            copperCoins += 1;

            // 添加銅幣到背包
            inventory.push('銅幣');
          } else {
            console.log('你沒有足夠的物品。');
          }
        },
      },
    },
    exits: {
      '西': '起始房間',
      '南': '花園',
    },
  },
  '花園': {
    description: '你現在在花園。有一扇門通向北邊的客廳，以及一扇通往地下室的門。',
    items: ['花'],
    characters: {},
    exits: {
      '北': '客廳',
      '地下室': '地下室',
    },
  },
  '地下室': {
    description: '你進入了地下室，這裡有三扇門通往不同的房間。一扇門通往怪物房間，一扇通往武器房間，還有一扇通往寶物庫。',
    items: [hasKey ? '鑰匙' : ''], // 只有當擁有鑰匙時才會顯示鑰匙
    characters: {},
    exits: {
      '怪物房間': '怪物房間',
      '武器房間': '武器房間',
      '寶物庫': '寶物庫',
    },
  },
  '怪物房間': {
    description: '你進入了怪物房間。這裡有一個可怕的怪物。',
    items: [],
    characters: {
      '怪物': {
        dialog: '怪物：你想離開還是攻擊我？',
        action: () => {
          if (inventory.includes('寶劍')) {
            console.log('你使用寶劍成功擊敗了怪物。你獲得了一個銀幣。');
            rooms['地下室'].items.push('銀幣');
            inventory.splice(inventory.indexOf('寶劍'), 1);
            silverCoins += 1;
          } else {
            console.log('你沒有武器，無法攻擊怪物。');
          }
        },
      },
    },
    exits: {
      '離開': '地下室',
    },
  },
  '武器房間': {
    description: '你進入了武器房間。這裡有一個工匠。',
    items: [],
    characters: {
      '工匠': {
        dialog: '工匠：你需要使用銅幣來跟我兌換寶劍。',
        action: () => {
          if (inventory.includes('銅幣')) {
            console.log('你給了工匠一枚銅幣，他給了你一把寶劍。');
            inventory.splice(inventory.indexOf('銅幣'), 1);
            inventory.push('寶劍');
          } else {
            console.log('你沒有足夠的銅幣。');
          }
        },
      },
    },
    exits: {
      '離開': '地下室',
    },
  },
  '寶物庫': {
    description: '你進入了寶物庫。這裡有一個寶物管理員。',
    items: [],
    characters: {
      '寶物管理員': {
        dialog: '寶物管理員：你可以使用銀幣來兌換金幣。',
        action: () => {
          if (inventory.includes('銀幣')) {
            console.log('你給了寶物管理員一枚銀幣，他給了你一枚金幣。');
            inventory.splice(inventory.indexOf('銀幣'), 1);
            inventory.push('金幣');
          } else {
            console.log('你沒有足夠的銀幣。');
          }
        },
      },
    },
    exits: {
      '離開': '地下室',
    },
  },
};

function displayRoomInfo() {
  console.log(rooms[currentRoom].description);
  if (rooms[currentRoom].items.length > 0) {
    console.log('你看到：' + rooms[currentRoom].items.join(', '));
  }

  const characters = Object.keys(rooms[currentRoom].characters);
  if (characters.length > 0) {
    console.log('你可以和以下角色對話：' + characters.join(', '));
  }
}

function startGame() {
  console.log('歡迎來到文字冒險遊戲！');
  displayRoomInfo();
  rl.prompt();
  rl.on('line', (input) => {
    const command = input.trim().toLowerCase().split(' ');

    if (command[0] === 'go' && command[1]) {
      const exit = command[1];
      if (rooms[currentRoom].exits[exit]) {
        if (exit === '寶物庫' && !hasKey) {
          console.log('你需要鑰匙才能進入寶物庫。');
        } else {
          currentRoom = rooms[currentRoom].exits[exit];
          displayRoomInfo();
        }
      } else {
        console.log('你不能往 ' + exit + ' 前進。');
      }
    } else if (command[0] === 'look') {
      displayRoomInfo();
    } else if (command[0] === 'take' && command[1]) {
      const item = command[1];
      if (rooms[currentRoom].items.includes(item)) {
        inventory.push(item);
        rooms[currentRoom].items = rooms[currentRoom].items.filter(i => i !== item);
        console.log('你拿起了 ' + item);

        if (item === '鑰匙') {
          hasKey = true;
        }
      } else {
        console.log('這裡沒有 ' + item + '。');
      }
    } else if (command[0] === 'talk' && command[1]) {
      const character = command[1];
      if (rooms[currentRoom].characters[character]) {
        console.log(rooms[currentRoom].characters[character].dialog);
        if (rooms[currentRoom].characters[character].action) {
          rooms[currentRoom].characters[character].action();
        }
      } else {
        console.log(character + ' 不在這裡。');
      }
    } else if (command[0] === 'bag') {
      if (inventory.length > 0) {
        console.log('你的背包包含：' + inventory.join(', '));
      } else {
        console.log('你的背包是空的。');
      }
    } else if (command[0] === 'quit') {
      rl.close();
    } else {
      console.log('無效的命令。');
    }

    rl.prompt();
  });
}

startGame();
