import { Mat4 } from "./matrix";
import { Vec3 } from "./vector";

type Face = {
	A: number;
	B: number;
	C: number;
};

type ModelConfig = {
	vertices: Vec3[];
	faces: Face[];
	position?: Vec3;
	rotation?: Vec3;
	scale?: Vec3;
};

export class Mesh {
	vertices: Vec3[];
	faces: Face[];
	position: Vec3;
	rotation: Vec3;
	scale: Vec3;

	constructor(config: ModelConfig) {
		this.vertices = config.vertices;
		this.faces = config.faces;
		this.position = config.position ?? Vec3.zero();
		this.rotation = config.rotation ?? Vec3.zero();
		this.scale = config.scale ?? new Vec3(1, 1, 1);
	}

	getModelMatrix() {
		const translationMatrix = Mat4.translate(
			this.position.x,
			this.position.y,
			this.position.z
		);
		const rotationMatrix = Mat4.rotateYawPitchRoll(
			this.rotation.x,
			this.rotation.y,
			this.rotation.z
		);
		const scaleMatrix = Mat4.scale(
			this.scale.x,
			this.scale.y,
			this.scale.z
		);

		return translationMatrix.mult(rotationMatrix).mult(scaleMatrix);
	}

	rotate(rotation: Vec3) {
		this.rotation = this.rotation.add(rotation);
	}

	static cube(size: number) {
		const vertices = [
			new Vec3(size, size, size),
			new Vec3(-size, size, size),
			new Vec3(-size, size, -size),
			new Vec3(size, size, -size),
			new Vec3(size, -size, size),
			new Vec3(-size, -size, size),
			new Vec3(-size, -size, -size),
			new Vec3(size, -size, -size),
		];

		const faces: Face[] = [
			{ A: 0, B: 1, C: 3 },
			{ A: 1, B: 2, C: 3 },

			{ A: 0, B: 3, C: 4 },
			{ A: 3, B: 4, C: 7 },

			{ A: 0, B: 1, C: 4 },
			{ A: 1, B: 4, C: 5 },

			{ A: 2, B: 1, C: 5 },
			{ A: 2, B: 5, C: 6 },

			{ A: 3, B: 6, C: 7 },
			{ A: 3, B: 3, C: 7 },

			{ A: 4, B: 5, C: 6 },
			{ A: 4, B: 6, C: 7 },
		];

		return new Mesh({ vertices, faces });
	}
}
