const express = require('express');
const app = express();
const puppeteer = require('puppeteer');
const cron = require('node-cron');

app.listen(8080, async (err) => {
    if (err) return console.error(err);
    console.log(`Server on 8080 is running...`);

    const scheduledTask = async () => {
        try {
            const browser = await puppeteer.launch({ headless: false, protocolTimeout: 0, userDataDir: './user_data' });
            const page = await browser.newPage();
    
            await page.goto('https://rollercoin.com/game');
            setTimeout(async () => {
                await browser.close();
            }, 5000);
        } catch (error) {
            console.error('Error during puppeteer operation:', error);
        }
    };

    cron.schedule('* * * * *', scheduledTask);
});