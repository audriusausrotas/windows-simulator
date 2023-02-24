const time = document.querySelector(".time") as HTMLElement;
const images = document.querySelector(".images") as HTMLElement;
const audio = document.querySelector(".audio") as HTMLElement;
const video = document.querySelector(".video") as HTMLElement;
const images_s = document.querySelector(".images_s") as HTMLElement;
const audio_s = document.querySelector(".audio_s") as HTMLElement;
const video_s = document.querySelector(".video_s") as HTMLElement;
const start = document.querySelector(".start") as HTMLElement;
const programs = document.querySelector(".programs") as HTMLElement;
const body = document.querySelector(".body") as HTMLElement;
const startMenu = document.querySelector(".startMenu") as HTMLElement;
const images_folder = document.querySelector(".images_folder") as HTMLElement;
const folder_close = document.querySelector(".folder_close") as HTMLElement;
const video_close = document.querySelector(".video_close") as HTMLElement;
const audio_close = document.querySelector(".audio_close") as HTMLElement;
const bg1 = document.querySelector(".bg1") as HTMLElement;
const bg2 = document.querySelector(".bg2") as HTMLElement;
const bg3 = document.querySelector(".bg3") as HTMLElement;
const audio_folder = document.querySelector(".audio_folder") as HTMLElement;
const video_folder = document.querySelector(".video_folder") as HTMLElement;
const shutdown = document.querySelector(".shutdown") as HTMLElement;
const shutdown_item = document.querySelector(".shutdown_item") as HTMLElement;

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

bg1.addEventListener("dblclick", (e: MouseEvent) => {
  setBackground((e.target as HTMLInputElement).src);
});

bg2.addEventListener("dblclick", (e) => {
  setBackground((e.target as HTMLInputElement).src);
});

bg3.addEventListener("dblclick", (e: MouseEvent) => {
  setBackground((e.target as HTMLInputElement).src);
});

bg1.addEventListener("click", (e: MouseEvent) => {
  moveUp("i1cc");
});

bg2.addEventListener("click", (e: MouseEvent) => {
  moveUp("i1cc");
});

bg3.addEventListener("click", (e: MouseEvent) => {
  moveUp("i1cc");
});

let startOpen: boolean = false;

function setBackground(src: string): void {
  body.style.backgroundImage = `url(${src}) `;
}

function showAudio(): void {
  audio_folder.classList.remove("hide");
}

function hideAudio(): void {
  audio_folder.classList.add("hide");
}

function showVideo(): void {
  video_folder.classList.remove("hide");
}

function hideVideo(): void {
  video_folder.classList.add("hide");
}

function showImages(): void {
  images_folder.classList.remove("hide");
}

function hideImages(): void {
  images_folder.classList.add("hide");
}

function getDate(): void {
  time.innerHTML = new Date().toLocaleString();
}
setInterval(getDate, 1000);

function startHandler(): void {
  if (startOpen) {
    startOpen = false;
    hideStart();
  } else {
    startOpen = true;
    showStart();
  }
}

function showStart(): void {
  startMenu.classList.remove("hide");
}

function hideStart(): void {
  startMenu.classList.add("hide");
}

function shutdownHandler(): void {
  shutdown_item.classList.remove("hide");
  hideAudio();
  hideImages();
  hideVideo();
  hideStart();
}

function windowsStart(): void {
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

const ff = document.querySelectorAll<HTMLElement>(".ff");
ff.forEach((item) => item.addEventListener("mousedown", getElement));

function getElement(e: MouseEvent): void {
  const id = (e.target as HTMLElement).id;
  moveUp(id);
}

function moveUp(element: string): void {
  if (element) {
    const aaa = document.querySelector(
      `#${element}${element.includes("cc") ? "" : "cc"}`
    ) as HTMLElement;

    ff.forEach((item) => (item.style.zIndex = "1"));

    aaa.style.zIndex = "10";
  }
}

/////////////////////////////////////////////////////////////
// movable items
const docs = document.querySelectorAll<HTMLElement>(".folder_top");
docs.forEach((item) => item.addEventListener("mousedown", down));
const docs2 = document.querySelectorAll<HTMLElement>(".f");
docs2.forEach((item) => item.addEventListener("mousedown", down));

function down(e: MouseEvent): void {
  window.addEventListener("mousemove", move);
  window.addEventListener("mouseup", up);
  const currentX: number = e.offsetX;
  const currentY: number = e.offsetY;

  const folder = document.querySelector(
    `#${(e.target as HTMLInputElement).id}cc`
  ) as HTMLElement;

  function move(e: MouseEvent): void {
    e.preventDefault();
    folder.style.top = e.y - currentY + e.movementY + "px";
    folder.style.left = e.x - currentX + e.movementX + "px";
  }
  function up(): void {
    window.removeEventListener("mousemove", move);
  }
}

////////////////////////////////////////////////////////////////////
// resizible

const bodis = document.querySelectorAll<HTMLElement>(".bd");
bodis.forEach((item) => {
  item.addEventListener("mousemove", cursor);
  item.addEventListener("mousedown", resize);
});
// cursor change
function cursor(e: MouseEvent): void {
  const folder = document.querySelector(
    `#${(e.target as HTMLInputElement).id}`
  ) as HTMLElement;
  const height: number = (e.target as HTMLInputElement).offsetHeight;
  const width: number = (e.target as HTMLInputElement).offsetWidth;
  const borderLeft: number = e.offsetX;
  const borderTop: number = e.offsetY;

  if (
    borderLeft > width - 10 &&
    borderLeft < width &&
    borderTop > height - 10 &&
    borderTop < height &&
    borderTop > 100
  ) {
    folder.style.cursor = "nw-resize";
  } else if (
    borderLeft < 10 &&
    borderTop > height - 10 &&
    borderTop < height &&
    borderTop > 100
  ) {
    folder.style.cursor = "ne-resize";
  } else if (
    borderLeft < 10 ||
    (borderLeft > width - 10 && borderLeft < width)
  ) {
    folder.style.cursor = "e-resize";
  } else if (borderTop > height - 10 && borderTop < height && borderTop > 100) {
    folder.style.cursor = "n-resize";
  } else {
    folder.style.cursor = "default";
  }
}

// resize window
function resize(e: MouseEvent): void {
  const height: number = (e.target as HTMLElement).offsetHeight;
  const width: number = (e.target as HTMLElement).offsetWidth;
  const borderLeft: number = e.offsetX;
  const borderTop: number = e.offsetY;
  const pageX: number = e.pageX;
  const pageY: number = e.pageY;

  const folder = document.querySelector(
    `#${(e.target as HTMLElement).id}`
  ) as HTMLElement;

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

  function sizeY(ee: MouseEvent): void {
    ee.preventDefault();
    folder.style.height = ee.pageY - pageY + height + "px";
  }

  function sizeX(ee: MouseEvent): void {
    ee.preventDefault();
    folder.style.width = ee.pageX - pageX + width + "px";
  }

  function sizeXleft(ee: MouseEvent): void {
    ee.preventDefault();
    folder.style.left = ee.x - borderLeft + ee.movementX + "px";
    folder.style.width = pageX - ee.pageX + width + "px";
  }

  function clearSize(): void {
    window.removeEventListener("mousemove", sizeX);
    window.removeEventListener("mousemove", sizeXleft);
    window.removeEventListener("mousemove", sizeY);
  }
}
