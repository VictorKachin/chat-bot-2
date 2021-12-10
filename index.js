const TelegramApi = require("node-telegram-bot-api");

const token = "5014061683:AAGAmyrBlzCWf1Amzu42iEw3Iw1VOinMjQs";

const bot = new TelegramApi(token, {polling: true});

const chats = {};

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "1", callback_data: "1"}, {text: "2", callback_data: "2"}, {text: "3", callback_data: "3"}],
            [{text: "4", callback_data: "4"}, {text: "5", callback_data: "5"}, {text: "6", callback_data: "6"}],
            [{text: "7", callback_data: "7"}, {text: "8", callback_data: "8"}, {text: "9", callback_data: "9"}],
            [{text: "0", callback_data: "0"}],
        ]
    })
}

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
            await bot.sendMessage(chatId, `Сейчас я загадаю вам число от 0 до 9. Попробуйте отгадать)`);
            const randomNumber = Math.floor(Math.random() * 10);
            chats[chatId] = randomNumber;
            return bot.sendMessage(chatId, "Отгадайте:", gameOptions)
        }
        return bot.sendMessage(chatId, "Я вас не понимаю. Попробуйте написать ещё раз! )");

    });
    bot.on("callback_query", msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        ша 
        bot.sendMessage(chatId, `Вы выбрали цифру ${data}`)
        console.log(msg);
    })
};

start();