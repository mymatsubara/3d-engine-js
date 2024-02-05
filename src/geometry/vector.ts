export class Vec4 {
	public values: number[];

	constructor(x: number, y: number, z: number, w: number) {
		this.values = [x, y, z, w];
	}

	get x() {
		return this.values[0];
	}

	set x(value: number) {
		this.values[0] = value;
	}

	get y() {
		return this.values[1];
	}

	set y(value: number) {
		this.values[1] = value;
	}

	get z() {
		return this.values[2];
	}

	set z(value: number) {
		this.values[2] = value;
	}

	get w() {
		return this.values[3];
	}

	set w(value: number) {
		this.values[3] = value;
	}

	length() {
		const [x, y, z, w] = this.values;
		return Math.sqrt(x * x + y * y + z * z + w * w);
	}

	add(vec: Vec4) {
		const v1 = this.values;
		const v2 = vec.values;

		return new Vec4(
			v1[0] + v2[0],
			v1[1] + v2[1],
			v1[2] + v2[2],
			v1[3] + v2[3]
		);
	}

	sub(vec: Vec4) {
		const v1 = this.values;
		const v2 = vec.values;

		return new Vec4(
			v1[0] - v2[0],
			v1[1] - v2[1],
			v1[2] - v2[2],
			v1[3] - v2[3]
		);
	}

	mult(value: number) {
		const v = this.values;
		return new Vec4(v[0] * value, v[1] * value, v[2] * value, v[3] * value);
	}

	normalize() {
		const scale = 1 / this.length();
		return this.mult(scale);
	}

	toEuclidian() {
		const v = this.values;
		const w = v[3];
		return new Vec3(v[0] / w, v[1] / w, v[2] / w);
	}

	static fromVertex(x: number, y: number, z: number) {
		return new Vec4(x, y, z, 1);
	}

	static fromDirection(x: number, y: number, z: number) {
		return new Vec4(x, y, z, 0);
	}

	static zero() {
		return new Vec4(0, 0, 0, 0);
	}
}

export class Vec3 {
	public values: number[];

	constructor(x: number, y: number, z: number) {
		this.values = [x, y, z];
	}

	get x() {
		return this.values[0];
	}

	set x(value: number) {
		this.values[0] = value;
	}

	get y() {
		return this.values[1];
	}

	set y(value: number) {
		this.values[1] = value;
	}

	get z() {
		return this.values[2];
	}

	set z(value: number) {
		this.values[2] = value;
	}

	length() {
		const [x, y, z] = this.values;
		return Math.sqrt(x * x + y * y + z * z);
	}

	add(vec: Vec3) {
		const v1 = this.values;
		const v2 = vec.values;

		return new Vec3(v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]);
	}

	sub(vec: Vec3) {
		const v1 = this.values;
		const v2 = vec.values;

		return new Vec3(v1[0] - v2[0], v1[1] - v2[1], v1[2] - v2[2]);
	}

	mult(value: number) {
		const v = this.values;
		return new Vec3(v[0] * value, v[1] * value, v[2] * value);
	}

	normalize() {
		const scale = 1 / this.length();
		return this.mult(scale);
	}

	cross(vec: Vec3) {
		const v1 = this.values;
		const v2 = vec.values;

		const x = v1[1] * v2[2] - v1[2] * v2[1];
		const y = v1[2] * v2[0] - v1[0] * v2[2];
		const z = v1[0] * v2[1] - v1[1] * v2[0];

		return new Vec3(x, y, z);
	}

	toVertex() {
		const v = this.values;
		return new Vec4(v[0], v[1], v[2], 1);
	}

	toDirection() {
		const v = this.values;
		return new Vec4(v[0], v[1], v[2], 0);
	}

	static zero() {
		return new Vec3(0, 0, 0);
	}
}

export class Vec2 {
	public values: number[];

	constructor(x: number, y: number) {
		this.values = [x, y];
	}

	get x() {
		return this.values[0];
	}

	set x(value: number) {
		this.values[0] = value;
	}

	get y() {
		return this.values[1];
	}

	set y(value: number) {
		this.values[1] = value;
	}

	length() {
		const [x, y] = this.values;
		return Math.sqrt(x * x + y * y);
	}

	add(vec: Vec2) {
		const v1 = this.values;
		const v2 = vec.values;

		return new Vec2(v1[0] + v2[0], v1[1] + v2[1]);
	}

	sub(vec: Vec2) {
		const v1 = this.values;
		const v2 = vec.values;

		return new Vec2(v1[0] - v2[0], v1[1] - v2[1]);
	}

	mult(value: number) {
		const v = this.values;
		return new Vec2(v[0] * value, v[1] * value);
	}

	normalize() {
		const scale = 1 / this.length();
		return this.mult(scale);
	}

	static zero() {
		return new Vec2(0, 0);
	}
}
