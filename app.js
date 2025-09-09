const express = require("express");
const fs = require("fs");
const request = require("request");
const cors = require("cors");

const app = express();
const port = 8080;

app.use(cors());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/website/index.html");
});

function download(uri, filename, callback) {
    request.head(uri, function (err, res, body) {
        // console.log("content-type:", res.headers["content-type"]);
        // console.log("content-length:", res.headers["content-length"]);

        request(uri).pipe(fs.createWriteStream(filename)).on("close", callback);
    });
}

download("https://upload.wikimedia.org/wikipedia/en/d/db/Undertale_Combat_Example.png", "undertale.png", function () {
    console.log("done");
});
// fetch("https://comicaurora.com/wp-content/uploads/2025/06/CH5_031_snap.png")
// fetch("https://upload.wikimedia.org/wikipedia/en/d/db/Undertale_Combat_Example.png")
//     .then((response) => response.blob())
//     .then((blob) => {
//         // res.type(blob.type);
//         // blob.arrayBuffer().then((buf) => {
//         //     res.send(Buffer.from(buf));
//         // });

//         console.log(blob.type);

//         // const content = JSON.stringify(blob);

//         // fs.writeFile(__dirname + "/blobby.json", content, (err) => {
//         //     if (err) {
//         //         console.error(err);
//         //     }
//         // });
//     });

app.get("/image", (req, res) => {
    fetch("https://upload.wikimedia.org/wikipedia/en/d/db/Undertale_Combat_Example.png")
        .then((response) => response.blob())
        .then((blob) => {
            console.log(blob.type);

            res.send(blob.type);
        });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
