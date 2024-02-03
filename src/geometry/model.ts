import { Mat4 } from "./matrix";
import { Vec3 } from "./vector";

type ModelConfig = {
	vertices: Vec3[];
	position?: Vec3;
	rotation?: Vec3;
	scale?: Vec3;
};

export class Model {
	vertices: Vec3[];
	position: Vec3;
	rotation: Vec3;
	scale: Vec3;

	constructor(config: ModelConfig) {
		this.vertices = config.vertices;
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

		return new Model({ vertices });
	}
}
