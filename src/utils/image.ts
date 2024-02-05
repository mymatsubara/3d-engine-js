import { Vec2, Vec4 } from "../geometry/vector";

export function drawLine(
	image: ImageData,
	p1: Vec2,
	p2: Vec2,
	color: Vec4 = new Vec4(1, 0, 0, 1)
) {
	let x1 = p1.x >> 0;
	let y1 = p1.y >> 0;
	const x2 = p2.x >> 0;
	const y2 = p2.y >> 0;
	const dx = Math.abs(x1 - x2);
	const dy = Math.abs(y1 - y2);
	const sx = x1 < x2 ? 1 : -1;
	const sy = y1 < y2 ? 1 : -1;
	let err = dx - dy;

	while (true) {
		image = drawPixel(image, new Vec2(x1, y1), color);

		if (x1 === x2 && y1 === y2) {
			break;
		}

		const e2 = 2 * err;
		if (e2 > -dy) {
			err -= dy;
			x1 += sx;
		}
		if (e2 < dx) {
			err += dx;
			y1 += sy;
		}
	}

	return image;
}

export function drawPixel(
	image: ImageData,
	pos: Vec2,
	color: Vec4 = new Vec4(1, 0, 0, 1)
) {
	const data = image.data;
	const index = ((pos.x >> 0) + (pos.y >> 0) * image.width) * 4;

	if (pos.x < 0 || pos.x > image.width || pos.y < 0 || pos.y > image.height) {
		return image;
	}

	data[index + 0] = color.x * 255;
	data[index + 1] = color.y * 255;
	data[index + 2] = color.z * 255;
	data[index + 3] = color.w * 255;

	return image;
}
