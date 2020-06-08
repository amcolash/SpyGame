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

    const objects = this.map.getObjectLayer('objects').objects;
    objects.forEach((object: Phaser.Types.Tilemaps.TiledObject) => {
      if (object.type === 'player') {
        this.player = new Player(this, object.x, object.y);
      }
    });

    this.foregroundLayer.setCollisionByProperty({ collide: true });
    this.physics.add.collider(this.player, this.foregroundLayer);
  }

  public create() {
    this.initMap();
  }

  public update() {}
}
