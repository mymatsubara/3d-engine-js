import { expect } from "vitest";

export function expectToBeCloseTo(a1: number[], a2: number[], delta: number) {
	expect(a1.length).toBe(a2.length);

	for (let i = 0; i < a1.length; i++) {
		expect(a1[i]).toBeCloseTo(a2[i], delta);
	}
}
