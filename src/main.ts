import './style.css';

const canvasId = "canvas";
let circle = {x: 0, y: 0, radius: 300};

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <canvas height="1000" width="600" id="${canvasId}" />
`

init(canvasId);

function init(canvasId: string) {
  const context = initCanvas(canvasId);
  initListeners();

  requestAnimationFrame(() => render(context));
 }

function initCanvas(canvasId: string) {
  const canvas = document.getElementById(canvasId);

  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    throw new ReferenceError(`Canvas with id '${canvasId}' was not found`);
  }

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Could not create canvas context");
  }

  return context;
}

function initListeners() {
  document.addEventListener("mousemove", (e) => {
    circle.x = e.x;
    circle.y = e.y;
  });

  document.addEventListener("wheel", (e) => {
    circle.radius = Math.max(circle.radius - e.deltaY / 20, 0);
    console.log(e.deltaY);
  })
}

function render(context: CanvasRenderingContext2D) {
  const width = context.canvas.width;
  const height = context.canvas.height;

  context.clearRect(0, 0, width, height);

  context.beginPath();
  context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
  context.strokeStyle = "red";
  context.stroke();

  requestAnimationFrame(() => render(context));
}
