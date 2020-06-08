import { Input } from 'phaser';
import { getGameWidth, getGameHeight } from '../helpers';
import { Player } from '../entities/player';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
  active: false,
  visible: false,
  key: 'Game',
};

export class GameScene extends Phaser.Scene {
  constructor() {
    super(sceneConfig);
  }

  public create() {
    // Add a player sprite that can be moved around. Place him in the middle of the screen.
    new Player(this, getGameWidth(this) / 2, getGameHeight(this) / 2);
  }

  public update() {}
}
