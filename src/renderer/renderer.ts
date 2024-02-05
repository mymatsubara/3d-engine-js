import { Mesh } from "../geometry/model";
import { Vec2, Vec4 } from "../geometry/vector";
import { drawLine } from "../utils/image";
import { Camera } from "./camera";

type RendererOptions = {
	width: number;
	height: number;
};

export class Renderer {
	constructor(private options: RendererOptions) {}

	render(models: Mesh[], camera: Camera) {
		let image = new ImageData(this.options.width, this.options.height);

		const viewMatrix = camera.getViewMatrix();
		const projectionMatrix = camera.getProjectionMatrix();

		for (let model of models) {
			const modelMatrix = model.getModelMatrix();
			const transformMatrix = projectionMatrix
				.mult(viewMatrix)
				.mult(modelMatrix);

			const transformedVertices = model.vertices
				.map((vertex) =>
					transformMatrix.multVec(vertex.toVertex()).toEuclidian()
				)
				.map(
					({ x, y }) =>
						new Vec2(
							(((x + 1) / 2) * this.options.width) >> 0,
							(((y + 1) / 2) * this.options.height) >> 0
						)
				);

			const color = new Vec4(1, 0, 0, 1);

			for (let face of model.faces) {
				const v1 = transformedVertices[face.A];
				const v2 = transformedVertices[face.B];
				const v3 = transformedVertices[face.C];

				image = drawLine(image, v1, v2, color);
				image = drawLine(image, v2, v3, color);
				image = drawLine(image, v3, v1, color);
			}
		}

		return image;
	}
}
