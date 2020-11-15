const uri = require('url');
const { firefox } = require('playwright-firefox');

const makeBumperRepo = () => {
    return Object.freeze({
        isValidUrl,
        bumpPost
    });

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function isValidUrl({ url }) {
        try {
            new URL(url);
            const pathName = uri.parse(url).host

            if (pathName == "ogusers.com") {
                return true
            }
            else {
                return false
            }
        } catch (err) {
            console.log(err)
            return false;
        };
    }

    async function bumpPost({ url, text }) {

        const resp = {}

        console.log("here")

        try {
            const browser = await firefox.launch({headless:true});
            const context = await browser.newContext();
            const page = await context.newPage();
            await page.goto('https://ogusers.com/member.php?action=login')

            await sleep(8000);
            await page.fill('[placeholder="Username"]', process.env.OG_USERNAME)
            await sleep(1000);
            await page.fill('[placeholder="Password"]', process.env.OG_PASSWORD)
            await sleep(1000);
            await page.click('button')
            await sleep(2000);

            await page.goto(url)
            await sleep(3000);
            await page.fill('[placeholder="Your Reply..."]', text)
            await sleep(1000);

            await page.click('text="Post Reply"')
            await sleep(4000);

            await browser.close()

            resp.success = true
            resp.message = `Bumped with message : ${text}`

            return resp
        }
        catch (error) {
            console.log("ha")
            console.log(error)
            resp.success = false
            resp.message = 'Can\'t bump your message'
            return resp
        }

    }
}

exports.default = makeBumperRepo();
