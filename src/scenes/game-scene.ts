import { getGameWidth, getGameHeight } from '../helpers';
import { Player } from '../entities/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;

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

    this.foregroundLayer.setCollisionByProperty({ collide: true });

    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    new Player(this, getGameWidth(this) / 2, getGameHeight(this) / 2);
  }

  public create() {
    this.initMap();
  }

  public update() {}
}
