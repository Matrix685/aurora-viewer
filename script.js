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

async function downloadImage(imageSrc, nameOfDownload = "my-image.png") {
    const response = await fetch(imageSrc);

    const blobImage = await response.blob();

    const href = URL.createObjectURL(blobImage);

    const anchorElement = document.createElement("a");
    anchorElement.href = href;
    anchorElement.download = nameOfDownload;

    document.body.appendChild(anchorElement);
    anchorElement.click();

    document.body.removeChild(anchorElement);
    window.URL.revokeObjectURL(href);
}

window.onload = () => {
    const button = document.getElementById("btn");

    console.log(button);

    button.addEventListener("click", () => {
        console.log("Clicked!");

        downloadImage("https://comicaurora.com/wp-content/uploads/2025/06/CH5_031_snap.png", "my-image.png")
            .then(() => {
                console.log("The image has been downloaded");
            })
            .catch((err) => {
                console.log("Error downloading image: ", err);
            });
    });
};
