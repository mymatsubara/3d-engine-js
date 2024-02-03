import { Vec3, Vec4 } from "./vector";

type PerspectiveOptions = {
	fov: number;
	aspectRatio: number;
	near: number;
	far: number;
};

type FrustumOptions = {
	left: number;
	right: number;
	bottom: number;
	top: number;
	near: number;
	far: number;
};

export class Mat4 {
	constructor(public values: number[][]) {
		if (values.length !== 4 && values[0].length !== 4) {
			throw new Error(`Not a valid Mat4: ${values}`);
		}
	}

	mult(mat: Mat4) {
		const result = Mat4.zero();
		const rows = 4;
		const cols = 4;

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				for (let k = 0; k < rows; k++) {
					result.values[i][j] += this.values[i][k] * mat.values[k][j];
				}
			}
		}

		return result;
	}

	multVec(vec: Vec4) {
		const result = Vec4.zero();
		const rows = 4;
		const cols = 4;

		for (let i = 0; i < rows; i++) {
			const row = this.values[i];

			for (let j = 0; j < cols; j++) {
				result.values[i] += row[j] * vec.values[j];
			}
		}

		return result;
	}

	static identity() {
		return new Mat4([
			[1, 0, 0, 0],
			[0, 1, 0, 0],
			[0, 0, 1, 0],
			[0, 0, 0, 1],
		]);
	}

	static zero() {
		return new Mat4([
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
		]);
	}

	static scale(x: number, y: number, z: number) {
		return new Mat4([
			[x, 0, 0, 0],
			[0, y, 0, 0],
			[0, 0, z, 0],
			[0, 0, 0, 1],
		]);
	}

	static translate(x: number, y: number, z: number) {
		return new Mat4([
			[1, 0, 0, x],
			[0, 1, 0, y],
			[0, 0, 1, z],
			[0, 0, 0, 1],
		]);
	}

	/// https://www.songho.ca/opengl/gl_anglestoaxes.html
	static rotateYawPitchRoll(y: number, x: number, z: number) {
		const cosA = Math.cos(x);
		const sinA = Math.sin(x);
		const cosB = Math.cos(y);
		const sinB = Math.sin(y);
		const cosC = Math.cos(z);
		const sinC = Math.sin(z);

		return new Mat4([
			[
				cosA * cosB,
				cosA * sinB * sinC - sinA * cosC,
				cosA * sinB * cosC + sinA * sinC,
				0,
			],
			[
				sinA * cosB,
				sinA * sinB * sinC + cosA * cosC,
				sinA * sinB * cosC - cosA * sinC,
				0,
			],
			[-sinB, cosB * sinC, cosB * sinC, 0],
			[0, 0, 0, 1],
		]);
	}

	// https://www.songho.ca/opengl/gl_camera.html
	static cameraLookAt(pos: Vec3, target: Vec3, up: Vec3 = new Vec3(0, 1, 0)) {
		const translate = Mat4.translate(-pos.x, -pos.y, -pos.z);

		const f = pos.sub(target).normalize();
		const l = up.cross(f).normalize();
		const u = f.cross(l);

		const rotate = new Mat4([
			[l.x, l.y, l.z, 0],
			[u.x, u.y, u.z, 0],
			[f.x, f.y, f.z, 0],
			[0, 0, 0, 1],
		]);

		return rotate.mult(translate);
	}

	static perspectiveProjection(options: PerspectiveOptions) {
		const tanFov = Math.tan(options.fov / 2);

		const height = options.near * tanFov;
		const width = options.aspectRatio * height;

		return this.perspectiveProjectionFrustum({
			top: height,
			bottom: -height,
			left: -width,
			right: width,
			near: options.near,
			far: options.far,
		});
	}

	static perspectiveProjectionFrustum(options: FrustumOptions) {
		const {
			top: t,
			bottom: b,
			right: r,
			left: l,
			far: f,
			near: n,
		} = options;

		return new Mat4([
			[(2 * n) / (r - l), 0, (r + l) / (r - l), 0],
			[0, (2 * n) / (t - b), (t + b) / (t - b), 0],
			[0, 0, -(f + n) / (f - n), (-2 * f * n) / (f - n)],
			[0, 0, -1, 0],
		]);
	}
}
