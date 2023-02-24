"use strict";
const time = document.querySelector(".time");
const images = document.querySelector(".images");
const audio = document.querySelector(".audio");
const video = document.querySelector(".video");
const images_s = document.querySelector(".images_s");
const audio_s = document.querySelector(".audio_s");
const video_s = document.querySelector(".video_s");
const start = document.querySelector(".start");
const programs = document.querySelector(".programs");
const body = document.querySelector(".body");
const startMenu = document.querySelector(".startMenu");
const images_folder = document.querySelector(".images_folder");
const folder_close = document.querySelector(".folder_close");
const video_close = document.querySelector(".video_close");
const audio_close = document.querySelector(".audio_close");
const bg1 = document.querySelector(".bg1");
const bg2 = document.querySelector(".bg2");
const bg3 = document.querySelector(".bg3");
const audio_folder = document.querySelector(".audio_folder");
const video_folder = document.querySelector(".video_folder");
const shutdown = document.querySelector(".shutdown");
const shutdown_item = document.querySelector(".shutdown_item");
shutdown.addEventListener("click", shutdownHandler);
start.addEventListener("click", startHandler);
images.addEventListener("dblclick", showImages);
images_s.addEventListener("click", showImages);
video.addEventListener("dblclick", showVideo);
video_s.addEventListener("click", showVideo);
audio.addEventListener("dblclick", showAudio);
audio_s.addEventListener("click", showAudio);
folder_close.addEventListener("click", hideImages);
video_close.addEventListener("click", hideVideo);
audio_close.addEventListener("click", hideAudio);
bg1.addEventListener("dblclick", (e) => {
    setBackground(e.target.src);
});
bg2.addEventListener("dblclick", (e) => {
    setBackground(e.target.src);
});
bg3.addEventListener("dblclick", (e) => {
    setBackground(e.target.src);
});
bg1.addEventListener("click", (e) => {
    moveUp("i1cc");
});
bg2.addEventListener("click", (e) => {
    moveUp("i1cc");
});
bg3.addEventListener("click", (e) => {
    moveUp("i1cc");
});
let startOpen = false;
function setBackground(src) {
    body.style.backgroundImage = `url(${src}) `;
}
function showAudio() {
    audio_folder.classList.remove("hide");
}
function hideAudio() {
    audio_folder.classList.add("hide");
}
function showVideo() {
    video_folder.classList.remove("hide");
}
function hideVideo() {
    video_folder.classList.add("hide");
}
function showImages() {
    images_folder.classList.remove("hide");
}
function hideImages() {
    images_folder.classList.add("hide");
}
function getDate() {
    time.innerHTML = new Date().toLocaleString();
}
setInterval(getDate, 1000);
function startHandler() {
    if (startOpen) {
        startOpen = false;
        hideStart();
    }
    else {
        startOpen = true;
        showStart();
    }
}
function showStart() {
    startMenu.classList.remove("hide");
}
function hideStart() {
    startMenu.classList.add("hide");
}
function shutdownHandler() {
    shutdown_item.classList.remove("hide");
    hideAudio();
    hideImages();
    hideVideo();
    hideStart();
}
function windowsStart() {
    shutdown_item.innerHTML = `
  <div class="aaa">Windows is loading</div>
  <div class="spinner"></div>
  `;
    setTimeout(() => {
        shutdown_item.classList.add("hide");
    }, 5000);
}
////////////////////////////////////////////////////////////
// zindex on click
const ff = document.querySelectorAll(".ff");
ff.forEach((item) => item.addEventListener("mousedown", getElement));
function getElement(e) {
    const id = e.target.id;
    moveUp(id);
}
function moveUp(element) {
    if (element) {
        const aaa = document.querySelector(`#${element}${element.includes("cc") ? "" : "cc"}`);
        ff.forEach((item) => (item.style.zIndex = "1"));
        aaa.style.zIndex = "10";
    }
}
/////////////////////////////////////////////////////////////
// movable items
const docs = document.querySelectorAll(".folder_top");
docs.forEach((item) => item.addEventListener("mousedown", down));
const docs2 = document.querySelectorAll(".f");
docs2.forEach((item) => item.addEventListener("mousedown", down));
function down(e) {
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    const currentX = e.offsetX;
    const currentY = e.offsetY;
    const folder = document.querySelector(`#${e.target.id}cc`);
    function move(e) {
        e.preventDefault();
        folder.style.top = e.y - currentY + e.movementY + "px";
        folder.style.left = e.x - currentX + e.movementX + "px";
    }
    function up() {
        window.removeEventListener("mousemove", move);
    }
}
////////////////////////////////////////////////////////////////////
// resizible
const bodis = document.querySelectorAll(".bd");
bodis.forEach((item) => {
    item.addEventListener("mousemove", cursor);
    item.addEventListener("mousedown", resize);
});
// cursor change
function cursor(e) {
    const folder = document.querySelector(`#${e.target.id}`);
    const height = e.target.offsetHeight;
    const width = e.target.offsetWidth;
    const borderLeft = e.offsetX;
    const borderTop = e.offsetY;
    if (borderLeft > width - 10 &&
        borderLeft < width &&
        borderTop > height - 10 &&
        borderTop < height &&
        borderTop > 100) {
        folder.style.cursor = "nw-resize";
    }
    else if (borderLeft < 10 &&
        borderTop > height - 10 &&
        borderTop < height &&
        borderTop > 100) {
        folder.style.cursor = "ne-resize";
    }
    else if (borderLeft < 10 ||
        (borderLeft > width - 10 && borderLeft < width)) {
        folder.style.cursor = "e-resize";
    }
    else if (borderTop > height - 10 && borderTop < height && borderTop > 100) {
        folder.style.cursor = "n-resize";
    }
    else {
        folder.style.cursor = "default";
    }
}
// resize window
function resize(e) {
    const height = e.target.offsetHeight;
    const width = e.target.offsetWidth;
    const borderLeft = e.offsetX;
    const borderTop = e.offsetY;
    const pageX = e.pageX;
    const pageY = e.pageY;
    const folder = document.querySelector(`#${e.target.id}`);
    if (borderLeft > width - 10 && borderLeft < width) {
        window.addEventListener("mousemove", sizeX);
    }
    if (borderLeft < 10) {
        window.addEventListener("mousemove", sizeXleft);
    }
    if (borderTop > height - 10 && borderTop < height && borderTop > 100) {
        window.addEventListener("mousemove", sizeY);
    }
    window.addEventListener("mouseup", clearSize);
    function sizeY(ee) {
        ee.preventDefault();
        folder.style.height = ee.pageY - pageY + height + "px";
    }
    function sizeX(ee) {
        ee.preventDefault();
        folder.style.width = ee.pageX - pageX + width + "px";
    }
    function sizeXleft(ee) {
        ee.preventDefault();
        folder.style.left = ee.x - borderLeft + ee.movementX + "px";
        folder.style.width = pageX - ee.pageX + width + "px";
    }
    function clearSize() {
        window.removeEventListener("mousemove", sizeX);
        window.removeEventListener("mousemove", sizeXleft);
        window.removeEventListener("mousemove", sizeY);
    }
}
