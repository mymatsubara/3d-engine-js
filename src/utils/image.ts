import { Vec4 } from "../geometry/vector";

export type ImagePosition = {
	x: number;
	y: number;
};

export function setPixel(image: ImageData, pos: ImagePosition, color: Vec4) {
	const data = image.data;
	const index = ((pos.x >> 0) + (pos.y >> 0) * image.width) * 4;

	data[index + 0] = color.x * 255;
	data[index + 1] = color.y * 255;
	data[index + 2] = color.z * 255;
	data[index + 3] = color.w * 255;

	return image;
}
