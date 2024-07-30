const mineflayer = require('mineflayer')

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const botName = `Bot_${getRandomInt(1000, 9999)}`

const bot = mineflayer.createBot({
  host: 'IP', // IP server
  port: PORT,                    // Port server
  username: botName,              // Nama akun dengan angka acak
  version: 'VERSI',              // Versi Minecraft
  hideErrors: false,
  checkTimeoutInterval: 30000,    // Periksa koneksi setiap 30 detik
})

bot.on('login', () => {
  console.log(`Bot logged in as ${bot.username}`)
  bot.chat('Hello! I am a bot.')
  randomMovement()
})

bot.on('kicked', (reason, loggedIn) => console.log(reason, loggedIn))
bot.on('error', err => console.log(err))

function randomMovement() {
  setInterval(() => {
    const x = (Math.random() * 2 - 1) * 10 // Gerakan random di sumbu x
    const z = (Math.random() * 2 - 1) * 10 // Gerakan random di sumbu z
    bot.setControlState('forward', true)
    bot.setControlState('jump', true)
    bot.setControlState('left', x < 0)
    bot.setControlState('right', x > 0)
    bot.lookAt(bot.entity.position.offset(x, 0, z))
    setTimeout(() => {
      bot.setControlState('forward', false)
      bot.setControlState('jump', false)
      bot.setControlState('left', false)
      bot.setControlState('right', false)
    }, 2000) // Gerak selama 2 detik
  }, 60000) // Setiap 1 menit
}

bot.on('end', () => {
  console.log('Bot disconnected. Reconnecting...')
  setTimeout(() => {
    mineflayer.createBot(bot.options)
  }, 5000) // Reconnect after 5 seconds
})
