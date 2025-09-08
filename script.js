// async function getData() {
//     const url = "https://www.comicaurora.com";
//     try {
//         const response = await fetch(url);

//         console.log("response");

//         if (!response.ok) {
//             throw new Error(`Response status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log(result);
//     } catch (error) {
//         console.error(error.message);
//     }
// }

// async function downloadImage(imageSrc, nameOfDownload = "my-image.png") {
//     // const response = await fetch(imageSrc);

//     // const blobImage = await response.blob();

//     const blobImage = new Blob(["https://comicaurora.com/wp-content/uploads/2025/06/CH5_031_snap.png"]);

//     const href = URL.createObjectURL(blobImage);

//     console.log(href);

//     const anchorElement = document.createElement("a");
//     anchorElement.href = href;
//     anchorElement.download = nameOfDownload;

//     document.body.appendChild(anchorElement);
//     // anchorElement.click();

//     // document.body.removeChild(anchorElement);
//     // window.URL.revokeObjectURL(href);
// }

// const button = document.getElementById("btn");

// console.log(button);

// button.addEventListener("click", () => {
//     console.log("Clicked!");

//     downloadImage("http://localhost:8080/flehs.png", "my-image.png")
//         .then(() => {
//             console.log("The image has been downloaded");
//         })
//         .catch((err) => {
//             console.log("Error downloading image: ", err);
//         });
// });

// const button = document.getElementById("btn");
// const anchor = document.getElementById("anchor");

// console.log(button);

// button.addEventListener("click", () => {
//     // console.log("Clicked!");

//     const blob = new Blob(["https://comicaurora.com/wp-content/uploads/2025/06/CH5_031_snap.png"]);

//     // bufferBlob = blob.arrayBuffer();

//     const href = URL.createObjectURL(blob);

//     console.log(href.host);

//     const anchorElement = document.createElement("img");

//     anchorElement.src = href;
//     // anchorElement.download = "aurora.png";

//     anchor.appendChild(anchorElement);
//     // anchorElement.click();
// });

const button = document.getElementById("btn");
const anchor = document.getElementById("anchor");

// button.addEventListener("click", () => {
//     const fileUrl = "https://comicaurora.com/wp-content/uploads/2025/06/CH5_031_snap.png";

//     var xhr = new XMLHttpRequest();
//     xhr.responseType = "blob";
//     xhr.onload = function () {
//         var a = document.createElement("a"); // create html element anchor
//         a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
//         a.download = "TEMP-1.jpg"; // Set the file name.
//         a.style.display = "none"; // set anchor as hidden
//         document.body.appendChild(a);
//         a.click();
//         a.remove();
//     };
//     xhr.open("GET", fileUrl);
//     xhr.send();
// });

async function getData() {
    const url = "http://localhost:8080/data";
    try {
        const response = await fetch(url);

        console.log(response);

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        // const result = await URL.createObjectURL(response);
        const result = await response.json();

        console.log(result);

        anchor.href = result;
    } catch (error) {
        console.error(error.message);
    }
}

button.addEventListener("click", () => {
    console.log("Clicked!");

    getData();
});

// button.addEventListener("click", () => {
//     let username = "ImAlgo";

//     let url = `http://skins.minecraft.net/MinecraftSkins/${username}.png`;

//     YUI().use("yql", function (Y) {
//         Y.YQL(`select * from data.uri where url="${url}"&format=json&callback=`, function (query) {
//             //r now contains the result of the YQL Query
//             //use the YQL Developer console to learn
//             //what data is coming back in this object
//             //and how that data is structured.
//             console.log(query);

//             let a = document.createElement("a");

//             a.download = `${username}.png`;

//             fetch(query)
//                 .then((response) => response.json())
//                 .then(
//                     ({
//                         query: {
//                             results: { url },
//                         },
//                     }) => {
//                         a.href = url;
//                         document.body.appendChild(a);
//                         a.click();
//                     }
//                 )
//                 .catch((err) => console.log(err));
//         });
//     });
// });

// let query = `https://query.yahooapis.com/v1/public/yql?q=select * from data.uri where url="${url}"&format=json&callback=`;

// let a = document.createElement("a");

// a.download = `${username}.png`;

// fetch(query)
//     .then((response) => response.json())
//     .then(
//         ({
//             query: {
//                 results: { url },
//             },
//         }) => {
//             a.href = url;
//             document.body.appendChild(a);
//             a.click();
//         }
//     )
//     .catch((err) => console.log(err));
