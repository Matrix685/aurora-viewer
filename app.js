const fs = require("fs");
const https = require("https");

const url = "https://comicaurora.com/";

const request = https.request(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
        data += chunk.toString();
    });

    response.on("end", async function () {
        // const body = JSON.parse(data);
        // console.log(body);

        const lines = data.split("\n");
        let imageEl;

        for (const line of lines) {
            if (line.includes('<div id="mgsisk_webcomic_collection_widget_webcomicmedia-5"')) {
                imageEl = line;
                break;
            }
        }

        // await pipeline(imageEl, file);
        fs.writeFile("aurora.html", imageEl, (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
            } else {
                console.log("File written successfully");
            }
        });
    });
});

request.on("error", (error) => {
    console.log("An error", error);
});

request.end();

// const imageUrl = "https://undertale.com/assets/images/stickers3.png";

function downloadImage(imageUrl) {
    const imageName = "images/sans.png";

    const file = fs.createWriteStream(imageName);

    https
        .get(imageUrl, (response) => {
            response.pipe(file);

            file.on("finish", () => {
                file.close();
                console.log(`Image downloaded as ${imageName}`);
            });
        })
        .on("error", (err) => {
            fs.unlink(imageName);
            console.error(`Error downloading image: ${err.message}`);
        });
}
