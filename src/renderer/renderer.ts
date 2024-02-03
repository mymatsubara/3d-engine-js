import { Model } from "../geometry/model";
import { Vec4 } from "../geometry/vector";
import { ImagePosition, setPixel } from "../utils/image";
import { Camera } from "./camera";

type RendererOptions = {
	width: number;
	height: number;
};

export class Renderer {
	constructor(private options: RendererOptions) {}

	render(models: Model[], camera: Camera) {
		let image = new ImageData(this.options.width, this.options.height);

		const viewMatrix = camera.getViewMatrix();
		const projectionMatrix = camera.getProjectionMatrix();

		for (let model of models) {
			const modelMatrix = model.getModelMatrix();
			const transformMatrix = projectionMatrix
				.mult(viewMatrix)
				.mult(modelMatrix);

			for (let vertex of model.vertices) {
				const { x, y, z } = transformMatrix
					.multVec(vertex.toVertex())
					.toEuclidian();

				// Clipping
				if (
					z < -1.0 ||
					z > 1.0 ||
					x < -1.0 ||
					x > 1.0 ||
					y < -1.0 ||
					y > 1.0
				) {
					continue;
				}

				// transform coordinates: [-1; 1] -> [0; width]; [-1, 1] -> [0; heigth]
				const position: ImagePosition = {
					x: (((x + 1) / 2) * this.options.width) >> 0,
					y: (((y + 1) / 2) * this.options.height) >> 0,
				};

				image = setPixel(image, position, new Vec4(1, 0, 0, 1));
			}
		}

		return image;
	}
}
