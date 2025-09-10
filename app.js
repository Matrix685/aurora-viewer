const fs = require("fs");
const https = require("https");
const Readable = require("stream").Readable;
const shell = require("shelljs");

const url = "https://comicaurora.com/";
let imageUrl;

const auroraHTML = fs.createWriteStream("index.html");

const request = https.request(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
        data += chunk;
    });

    response.on("end", function () {
        const lines = data.split("\n");

        for (const line of lines) {
            if (line.includes('<div id="mgsisk_webcomic_collection_widget_webcomicmedia-5"')) {
                line.split(" ").forEach((imageLink) => {
                    if (imageLink.includes('src="https://comicaurora.com/wp-content/uploads/')) {
                        imageUrl = imageLink.substring(5, imageLink.length - 1);

                        // console.log(imageUrl);
                    }
                });
                // console.log(line);
                break;
            }
        }

        downloadImage(imageUrl);

        let replacedData = data.replaceAll(imageUrl, "images/current-page.png");
        let s = new Readable();

        s.push(replacedData);
        s.push(null);

        s.pipe(auroraHTML);
        console.log("HTML successful");
    });
});

request.on("error", (error) => {
    console.log("An error", error);
});

request.end();

function downloadImage(imageUrl) {
    const imageName = "images/current-page.png";

    const file = fs.createWriteStream(imageName);

    https
        .get(imageUrl, (response) => {
            response.pipe(file);

            file.on("finish", () => {
                file.close();
                console.log(`Image downloaded as ${imageName}`);

                commit();
            });
        })
        .on("error", (err) => {
            fs.unlink(imageName);
            console.error(`Error downloading image: ${err.message}`);
        });
}

function commit() {
    shell.exec("update.sh");

    console.log("all done!");
}
