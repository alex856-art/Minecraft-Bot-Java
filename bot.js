const mineflayer = require('mineflayer');
const minecraftData = require('minecraft-data');

// Konfigurasi bot
const botOptions = {
  host: 'IP', // Ganti dengan IP server Anda
  port: Port, // Port default Minecraft
  username: 'Bot_' + Math.floor(Math.random() * 10000), // Nama pengguna bot secara acak
  version: 'Versi' // Pastikan versi ini didukung oleh mineflayer
};

const bot = mineflayer.createBot(botOptions);

bot.on('login', () => {
  console.log(`Bot ${botOptions.username} berhasil masuk ke server!`);
  console.log(`Bot version: ${bot.version}`);
  moveRandomly();
});

bot.on('end', () => {
  console.log('Bot terputus dari server, mencoba untuk menghubungkan kembali...');
  setTimeout(() => {
    const newBot = mineflayer.createBot(botOptions);
    newBot.on('login', moveRandomly);
  }, 5000);
});

bot.on('error', (err) => {
  console.log(`Terjadi kesalahan: ${err.message}`);
});

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
  }, 2000);
}

bot.on('kicked', (reason, loggedIn) => {
  console.log(`Bot kicked: ${reason} ${loggedIn}`);
});

bot.on('error', err => console.log(err));
