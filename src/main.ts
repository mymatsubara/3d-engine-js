import { Mesh } from "./geometry/model";
import { Vec3 } from "./geometry/vector";
import { Camera } from "./renderer/camera";
import { Renderer } from "./renderer/renderer";
import "./style.css";

const canvasId = "canvas";

let camera = new Camera({
	position: new Vec3(0, 0, 10),
	target: Vec3.zero(),
	clip: {
		near: 0.01,
		far: 20.0,
	},
});

let models = [Mesh.cube(1)];

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <canvas style="background: black" height="300" width="500" id="${canvasId}" />
`;

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

function initListeners() {}

function render(context: CanvasRenderingContext2D) {
	const width = context.canvas.width;
	const height = context.canvas.height;

	context.clearRect(0, 0, width, height);

	const renderer = new Renderer({
		width,
		height,
	});

	const frame = renderer.render(models, camera);
	context.putImageData(frame, 0, 0);

	const deltaRotation = 0.01;
	for (let model of models) {
		model.rotate(new Vec3(deltaRotation, -deltaRotation, 0));
	}

	requestAnimationFrame(() => render(context));
}
