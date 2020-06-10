import { DEBUG_GRAPHICS } from '../helpers';
import { Player } from '../entities/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;

  private player: Player;

  private backgroundLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private foregroundLayer: Phaser.Tilemaps.StaticTilemapLayer;

  constructor() {
    super(sceneConfig);
  }

  private initMap() {
    this.map = this.make.tilemap({ key: 'level1' });
    // add our tileset and layers to our tilemap
    this.tileset = this.map.addTilesetImage('tiles');
    this.backgroundLayer = this.map.createStaticLayer('backgroundLayer', this.tileset, 0, 0);
    this.foregroundLayer = this.map.createStaticLayer('foregroundLayer', this.tileset, 0, 0);

    this.initObjects();
    this.initCollisions();

    if (DEBUG_GRAPHICS) {
      const debugGraphics = this.add.graphics().setAlpha(0.35);
      this.foregroundLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      });
    }
  }

  private initObjects() {
    const objects = this.map.getObjectLayer('objects').objects;
    objects.forEach((object: Phaser.Types.Tilemaps.TiledObject) => {
      if (object.type === 'player') {
        this.player = new Player(this, object.x, object.y);
      }
    });
  }

  private initCollisions() {
    this.foregroundLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, this.foregroundLayer);
  }

  public create() {
    this.initMap();
  }

  public update() {}
}
