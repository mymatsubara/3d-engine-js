import { describe, expect, it } from "vitest";
import { expectToBeCloseTo } from "../utils/tests";
import { Mat4 } from "./matrix";
import { Vec3, Vec4 } from "./vector";

const DELTA = 0.000001;

describe("Mat4", () => {
	it("should multiply 2 matrix", () => {
		const m1 = new Mat4([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 1, 2, 3],
			[4, 5, 6, 7],
		]);

		const m2 = new Mat4([
			[1, 5, 9, 4],
			[2, 6, 1, 5],
			[3, 7, 2, 6],
			[4, 8, 3, 7],
		]);

		expect(m1.mult(m2)).toStrictEqual(
			new Mat4([
				[30, 70, 29, 60],
				[70, 174, 89, 148],
				[29, 89, 95, 74],
				[60, 148, 74, 126],
			])
		);

		expect(m1.mult(Mat4.identity())).toStrictEqual(m1);
	});

	it("should multiply a matrix with a vector", () => {
		const matrix = new Mat4([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 1, 2, 3],
			[4, 5, 6, 7],
		]);

		const vec = new Vec4(1, 2, 3, 4);

		expect(matrix.multVec(vec)).toStrictEqual(new Vec4(30, 70, 29, 60));
	});

	it("should generate a correct scale matrix", () => {
		const vec = new Vec4(1, 2, 3, 1);
		const scale = Mat4.scale(2, 4, 6);

		expect(scale.multVec(vec)).toStrictEqual(new Vec4(2, 8, 18, 1));
	});

	it("should generate a correct translation matrix", () => {
		const vec = new Vec4(1, 2, 3, 1);
		const translate = Mat4.translate(2, 4, 6);

		expect(translate.multVec(vec)).toStrictEqual(new Vec4(3, 6, 9, 1));
		expect(Mat4.identity().multVec(vec)).toStrictEqual(vec);
	});

	it("should rotate over yxz correctly", () => {
		const vec = new Vec4(1, 1, 1, 1);
		const angle = Math.PI / 2;
		const rotate = Mat4.rotateYawPitchRoll(angle, angle, angle);
		const result = rotate.multVec(vec).values;

		expectToBeCloseTo(result, [1, 1, -1, 1], DELTA);
	});

	it("should make a view matrix correctly", () => {
		const p1 = new Vec4(0, 0, 0, 1);
		const view = Mat4.cameraLookAt(new Vec3(1, 1, 1), new Vec3(0, 0, 0));

		expectToBeCloseTo(
			view.multVec(p1).values,
			[0, 0, -Math.sqrt(3), 1],
			DELTA
		);
	});

	it("should make a projection matrix correctly", () => {
		const p1 = new Vec4(-2, 1, -1, 1);
		const p2 = new Vec4(20, -10, -10, 1);

		const perspective = Mat4.perspectiveProjection({
			fov: Math.PI / 2,
			aspectRatio: 2,
			near: 1,
			far: 10,
		});

		expectToBeCloseTo(
			perspective.multVec(p1).toEuclidian().values,
			[-1, 1, -1],
			DELTA
		);
		expectToBeCloseTo(
			perspective.multVec(p2).toEuclidian().values,
			[1, -1, 1],
			DELTA
		);
	});
});
