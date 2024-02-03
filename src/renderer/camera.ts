import { Mat4 } from "../geometry/matrix";
import { Vec3 } from "../geometry/vector";

type CameraOptions = {
	position?: Vec3;
	target?: Vec3;
	up?: Vec3;
	aspectRatio?: number;
	fov?: number;
	clip?: {
		near: number;
		far: number;
	};
};

export class Camera {
	position: Vec3;
	target: Vec3;
	up: Vec3;
	aspectRatio: number;
	fov: number;
	clip: {
		near: number;
		far: number;
	};

	constructor(options?: CameraOptions) {
		this.position = options?.position ?? Vec3.zero();
		this.target = options?.target ?? Vec3.zero();
		this.aspectRatio = options?.aspectRatio ?? 16 / 9;
		this.up = options?.up ?? new Vec3(0, 1, 0);
		this.fov = options?.fov ?? 0.78 / 2;
		this.clip = options?.clip ?? {
			near: 0.01,
			far: 1.0,
		};
	}

	getViewMatrix() {
		return Mat4.cameraLookAt(this.position, this.target, this.up);
	}

	getProjectionMatrix() {
		return Mat4.perspectiveProjection({
			aspectRatio: this.aspectRatio,
			fov: this.fov,
			near: this.clip.near,
			far: this.clip.far,
		});
	}
}
