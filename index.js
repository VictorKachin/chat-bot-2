const TelegramApi = require("node-telegram-bot-api");
const {gameOptions, againOptions} = require("./options")
const token = "5014061683:AAGAmyrBlzCWf1Amzu42iEw3Iw1VOinMjQs";

const bot = new TelegramApi(token, {polling: true});

const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, `Сейчас я загадаю вам число от 0 до 9. Попробуйте отгадать)`);
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Отгадайте:", gameOptions);
};

const start = () => {
    bot.setMyCommands([
        {command: "/start", description: "Приветствие"},
        {command: "/info", description: "Получить информацию о пользователе"},
        {command: "/game", description: `Игра "Отгадай число"`}
    ]);

    bot.on("message", async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;

        // bot.sendMessage(chatId, `Здравствуйте! Вы мне написали: \"${text}\"`)
        if (text === "/start") {
            await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/1f4/8d2/1f48d2d9-2b00-47da-8c0d-7f60aa5b90f9/1.webp");
            return bot.sendMessage(chatId, "Добро пожаловать в чат-бот PicsForDesign.com");
        }
        if (text === "/info") {
            return bot.sendMessage(chatId, `Мы рады видеть вас, ${msg.from.first_name}!`);
        }
        if (text === "/game") {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, "Я вас не понимаю. Попробуйте ещё раз! )");
    });

    bot.on("callback_query", async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === "/again") {
            return startGame(chatId);
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `Вы отгадали цифру ${chats[chatId]}`, againOptions);
        } else {
            return bot.sendMessage(chatId, `К сожалению вы не угадали. Бот загадал цифру ${chats[chatId]}`, againOptions);
        }
        // bot.sendMessage(chatId, `Вы выбрали цифру ${data}`)
    });
};

start();