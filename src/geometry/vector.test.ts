import { describe, expect, it } from "vitest";
import { Vec3, Vec4 } from "./vector";

describe("Vec4", () => {
	it("should add vectors correctly", () => {
		const v1 = new Vec4(1, 2, 3, 4);
		const v2 = new Vec4(2, 3, 4, 5);

		expect(v1.add(v2)).toStrictEqual(new Vec4(3, 5, 7, 9));
	});

	it("should subtract vectors correctly", () => {
		const v1 = new Vec4(1, 2, 3, 4);
		const v2 = new Vec4(2, 3, 4, 5);

		expect(v1.sub(v2)).toStrictEqual(new Vec4(-1, -1, -1, -1));
	});

	it("should calculate length correctly", () => {
		const v1 = new Vec4(1, 1, 1, 1);

		expect(v1.length()).toEqual(2);
	});

	it("should multiply by a scalar correctly", () => {
		const v1 = new Vec4(1, 1, 1, 1);

		expect(v1.mult(5)).toEqual(new Vec4(5, 5, 5, 5));
	});

	it("should normalize correctly", () => {
		const v1 = new Vec4(1, 1, 1, 1);

		expect(v1.normalize()).toEqual(new Vec4(1 / 2, 1 / 2, 1 / 2, 1 / 2));
	});
});

describe("Vec3", () => {
	it("should add vectors correctly", () => {
		const v1 = new Vec3(1, 2, 3);
		const v2 = new Vec3(2, 3, 4);

		expect(v1.add(v2)).toStrictEqual(new Vec3(3, 5, 7));
	});

	it("should subtract vectors correctly", () => {
		const v1 = new Vec3(1, 2, 3);
		const v2 = new Vec3(2, 3, 4);

		expect(v1.sub(v2)).toStrictEqual(new Vec3(-1, -1, -1));
	});

	it("should calculate length correctly", () => {
		const v1 = new Vec3(1, 1, 1);

		expect(v1.length()).toEqual(Math.sqrt(3));
	});

	it("should multiply by a scalar correctly", () => {
		const v1 = new Vec3(1, 1, 1);

		expect(v1.mult(5)).toEqual(new Vec3(5, 5, 5));
	});

	it("should normalize correctly", () => {
		const v1 = new Vec3(1, 1, 1);
		const v = 1 / Math.sqrt(3);

		expect(v1.normalize()).toEqual(new Vec3(v, v, v));
	});

	it("should calculated cross product correctly", () => {
		const v1 = new Vec3(1, 2, 3);
		const v2 = new Vec3(4, 5, 6);

		expect(v1.cross(v2)).toStrictEqual(new Vec3(-3, 6, -3));
	});
});
