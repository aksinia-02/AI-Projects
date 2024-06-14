class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;

    this.maxSpeed = 3;
    this.friction = 0.05;
    this.angle = 0;

    this.controls = new Controls();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    ctx.restore();
  }

  update() {
    this.#updateSpeed();
    this.#applyFriction();
    this.#updateAngle();
    this.#updatePosition();
  }

  #updateSpeed() {
    if (this.controls.forward) this.speed += this.acceleration;
    if (this.controls.reverse) this.speed -= this.acceleration;

    this.speed = Math.min(
      this.maxSpeed,
      Math.max(this.speed, -this.maxSpeed / 2)
    );
  }

  #applyFriction() {
    if (this.speed > 0) this.speed = Math.max(0, this.speed - this.friction);
    else if (this.speed < 0)
      this.speed = Math.min(0, this.speed + this.friction);
  }

  #updateAngle() {
    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) this.angle += 0.03 * flip;
      if (this.controls.right) this.angle -= 0.03 * flip;
    }
  }

  #updatePosition() {
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }
}
