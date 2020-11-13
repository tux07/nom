"use strict";
const puppeteer = require('puppeteer');
const argv = require('minimist')(process.argv.slice(2));

process.on('SIGINT', function() {
    console.log("\n\rCaught interrupt signal")
    process.exit()
})

let sendViewers = async (model, viewers) => {
    const totalv = viewers
    console.log('Launching browser...')
    const browser = await puppeteer.launch({headless: true ,args: ['--no-sandbox', '--no-zygote', '--single-process', '--disable-gpu', '--disable-dev-shm-usage', '--user-data-dir=/tmp', '--safebrowsing-disable-auto-update', '--disable-setuid-sandbox', '--disable-background-networking', '--disable-default-apps', '--disable-extensions', '--disable-sync', '--disable-translate', '--mute-audio', '--no-first-run', '--metrics-recording-only', '--ignore-certificate-errors', ' --ignore-ssl-errors', '--ignore-certificate-errors-spki-list', '--incognito']});
    for(viewers; viewers >= 1; viewers--) {


        try {
            const page = await browser.newPage()
            await page.setCookie(...COOKIE)
            await page.setUserAgent(USER_AGENT)
            await page.setViewport({ width: 800, height: 600 })

            await page.waitFor(2000)           
            await page.goto(`https://www.chaturbate.com/${model}/`, { waitUntil: 'networkidle2' })

            // await browser.close()
        } catch (e) {
            console.error(e);
        } finally {
            console.log(`Open page ${totalv-(viewers-1)} of ${totalv}.`)
        }
       
    }

    console.log('Finished opening pages.')
    console.log('Press CTRL+C to abort.')

}


;(async function main () {

    try {
        if (Object.keys(argv).length > 2) {
           await sendViewers(argv['m'], argv['v'])
        } else {
            console.log('Usage: nodejs anonymous_users.js -m model -v 100')
        }
    } catch (err) {
        console.error(err);
    }

}) ()

const USER_AGENT = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3239.108 Safari/537.36';
const COOKIE = [{

        "domain": "chaturbate.com",
        "expirationDate": '2020-10-11T01:09:05.000Z',
        "hostOnly": false,
        "httpOnly": false,
        "name": "agreeterms",
        "path": "/",
        "sameSite": "no_restriction",
        "secure": false,
        "session": false,
        "storeId": "0",
        "value": "1"
}];
