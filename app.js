const fs = require("fs");
const https = require("https");
const Readable = require("stream").Readable;
const shell = require("shelljs");

// getComic(); // for testing

function getComic() {
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

                            console.log(imageUrl);
                        }
                    });
                    // console.log(line);
                    break;
                }
            }

            downloadImage(imageUrl);

            let replacedData = data
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/logo-progress.png", "images/logo-progress.png") // aurora logo
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/12/logo-BIG.png", "images/logo-BIG.png") // aurora logo v2
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/bg-aurora.png", "images/bg-aurora.png") // aurora background
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/cropped-icon-32x32.png", "images/cropped-icon-32x32.png") // some icon idk
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/header-wrap-small-alt.png", "images/header-wrap-small-alt.png") // vines in header
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/arrow-blue-e1571699055192.png", "images/arrow-blue-e1571699055192.png") // double left arrow
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/arrow--e1571699115274.png", "images/arrow--e1571699115274.png") // single left arrow
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/random-e1571699137392.png", "images/random-e1571699137392.png") // random page button
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/arrow-1-1-e1571699098139.png", "images/arrow-1-1-e1571699098139.png") // single right arrow
                .replaceAll("https://comicaurora.com/wp-content/uploads/2019/04/arrow-1-2-e1571699075864.png", "images/arrow-1-2-e1571699075864.png") // double right arrow
                .replaceAll("<head>", `<head>\n\t<link rel="stylesheet" href="styles/style.css" />`) // styles
                .replaceAll(imageUrl, "images/current-page.png"); // comic page

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
}

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
    shell.exec("./update.sh"); // wait i need to test one more thing

    console.log("all done!");
}

console.log("Waiting for new comic");

function checkComic() {
    // console.log("you do work right?");
    const time = new Date();

    console.log(time.getHours().toString() + ":" + time.getMinutes());

    if (time.getHours() >= 8 && time.getMinutes() > 15) {
        console.log("ITS OUUUUTT!!");
        getComic();
        clearInterval(checkTime);
    }
}

let checkTime = setInterval(checkComic, 60000);

checkComic();
