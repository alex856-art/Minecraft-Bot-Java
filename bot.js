const mineflayer = require('mineflayer');

// Konfigurasi bot
const botOptions = {
  host: 'IP', // Ganti dengan IP server Anda
  port: PORT, // Port default Minecraft
  username: 'Bot_' + Math.floor(Math.random() * 10000), // Nama pengguna bot secara acak
  version: 'VERSI' // Versi Minecraft
};

let bot;

function createBot() {
  bot = mineflayer.createBot(botOptions);

  bot.on('login', () => {
    console.log(`Bot ${botOptions.username} berhasil masuk ke server!`);
    moveRandomly();
  });

  bot.on('end', () => {
    console.log('Bot terputus dari server, mencoba untuk menghubungkan kembali...');
    setTimeout(createBot, 5000); // Coba reconnect setelah 5 detik
  });

  bot.on('error', (err) => {
    console.log(`Terjadi kesalahan: ${err.message}`);
    // Tangani error dan coba reconnect
    bot.end();
  });
}

function moveRandomly() {
  setInterval(() => {
    const directions = ['forward', 'back', 'left', 'right'];
    const direction = directions[Math.floor(Math.random() * directions.length)];

    switch (direction) {
      case 'forward':
        bot.setControlState('forward', true);
        break;
      case 'back':
        bot.setControlState('back', true);
        break;
      case 'left':
        bot.setControlState('left', true);
        break;
      case 'right':
        bot.setControlState('right', true);
        break;
    }

    setTimeout(() => {
      bot.clearControlStates();
    }, Math.floor(Math.random() * 1000) + 500); // Durasi gerakan antara 500ms hingga 1500ms

    console.log(`Bot bergerak ke ${direction}`);
  }, 2000); // Interval gerakan bot
}

// Mulai bot
createBot();
