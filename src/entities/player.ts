export class Player extends Phaser.GameObjects.Sprite {
  // Since there are physics, make TS know about it
  public body: Phaser.Physics.Arcade.Body;

  public speed: number = 100;
  private cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;
  private lastVelocity: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'player');

    this.createAnimation('left-walk', [3, 7, 11]);
    this.createAnimation('right-walk', [1, 5, 9]);
    this.createAnimation('up-walk', [2, 6, 10]);
    this.createAnimation('down-walk', [0, 4, 8]);

    // This is a nice helper Phaser provides to create listeners for some of the most common keys.
    this.cursorKeys = scene.input.keyboard.createCursorKeys();

    // Make the camera follow the player
    this.scene.cameras.main.startFollow(this);
    this.scene.cameras.main.setZoom(2);

    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }

  private createAnimation(name: string, frames: number[]) {
    const anims = this.anims.animationManager;
    anims.create({
      key: `player-${name}`,
      frames: anims.generateFrameNumbers('player', { frames }),
      frameRate: 10,
      repeat: -1,
    });
  }

  public preUpdate(time, delta) {
    super.preUpdate(time, delta);

    // Every frame, we create a new velocity for the sprite based on what keys the player is holding down.
    const velocity = new Phaser.Math.Vector2(0, 0);

    if (this.cursorKeys.left.isDown) {
      velocity.x = -1;
      this.anims.play('player-left-walk', true);
    }
    if (this.cursorKeys.right.isDown) {
      velocity.x = 1;
      this.anims.play('player-right-walk', true);
    }
    if (this.cursorKeys.up.isDown) {
      velocity.y = -1;
      this.anims.play('player-up-walk', true);
    }
    if (this.cursorKeys.down.isDown) {
      velocity.y = 1;
      this.anims.play('player-down-walk', true);
    }

    if (velocity.lengthSq() === 0) this.anims.stop();

    this.lastVelocity.setFromObject(velocity);

    // We normalize the velocity so that the player is always moving at the same speed, regardless of direction.
    const normalizedVelocity = velocity.normalize();
    this.body.setVelocity(normalizedVelocity.x * this.speed, normalizedVelocity.y * this.speed);
  }
}
