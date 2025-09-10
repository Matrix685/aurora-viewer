async function sendUrl(url) {
    await fetch("http://localhost:8080/post", {
        method: "POST",
        body: JSON.stringify(url),
    });
}

const btn = document.getElementById("btn");

btn.onclick = () => {
    console.log("Clicked!");

    // const iframe = document.querySelector("iframe").contentDocument.querySelector("div#page");

    // console.log(iframe);

    // const auroraImg = document.querySelector("#mgsisk_webcomic_collection_widget_webcomicmedia-5 > a > img");
    // const auroraImgURL = auroraImg.src;

    // sendUrl(auroraImgURL);
};
