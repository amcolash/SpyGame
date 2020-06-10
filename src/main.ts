import * as Phaser from 'phaser';
import Scenes from './scenes';
import { DEBUG_GRAPHICS } from './helpers';

// Allow a singular tileset to be used for all tilemaps
import registerTiledJSONExternalLoader from 'phaser-tiled-json-external-loader';
registerTiledJSONExternalLoader(Phaser);

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',

  type: Phaser.AUTO,

  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },

  scene: Scenes,

  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG_GRAPHICS,
    },
  },

  parent: 'game',
  backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);

window.addEventListener('resize', () => {
  game.scale.refresh();
});
