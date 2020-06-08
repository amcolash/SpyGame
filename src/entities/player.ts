export class Player extends Phaser.GameObjects.Image {
  // Since there are physics, make TS know about it
  public body: Phaser.Physics.Arcade.Body;

  public speed: number = 200;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    // this.image = this.physics.add.sprite(getGameWidth(this) / 2, getGameHeight(this) / 2, 'man');

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = scene.input.keyboard.createCursorKeys();

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  preUpdate(time, delta) {
    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.cursorKeys.left.isDown) {
      velocity.x -= 1;
    }
    if (this.cursorKeys.right.isDown) {
      velocity.x += 1;
    }
    if (this.cursorKeys.up.isDown) {
      velocity.y -= 1;
    }
    if (this.cursorKeys.down.isDown) {
      velocity.y += 1;
    }

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.body.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
