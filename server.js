var express = require("express");
var fs = require("fs");
var app = express();
app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["*"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

var port = 8080;
app.listen(port, () => {
    console.log("Listening on port " + port + ".");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/website/index.html");
});

app.get("/image/flesh", (req, res) => {
    res.sendFile(__dirname + "/website/flehs.png");
});

app.get("/text", (req, res) => {
    res.sendFile(__dirname + "/website/text.txt");
});

app.get("/pigeon", (req, res) => {
    res.sendFile(__dirname + "/website/document.json");
});

app.get("/test", (req, res) => {
    res.send(JSON.stringify("hello world"));
    // res.download(__dirname + "/website/text.txt");
});

const cors = require("cors");

app.use(cors());

fetch("https://comicaurora.com/wp-content/uploads/2025/06/CH5_031_snap.png")
    .then((response) => response.blob())
    .then((blob) => {
        // res.type(blob.type);
        // blob.arrayBuffer().then((buf) => {
        //     res.send(Buffer.from(buf));
        // });

        console.log(blob.text());

        const content = JSON.stringify(blob);

        fs.writeFile(__dirname + "/blobby.json", content, (err) => {
            if (err) {
                console.error(err);
            }
        });
    });

app.get("/data", (req, res) => {
    res.sendFile(__dirname + "/blobby.txt");
});

app.get("*", (req, res) => {
    if (fs.existsSync(__dirname + "/website" + req.path)) {
        res.sendFile(__dirname + "/website" + req.path);
    } else {
        res.status(404).contentType("text/plain").send("404 Not Found");
    }
});
