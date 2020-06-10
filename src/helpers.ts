import * as Phaser from 'phaser';

export const DEBUG = true;
export const DEBUG_GRAPHICS = false;

export const getGameWidth = (scene: Phaser.Scene) => {
  return scene.game.scale.width;
};

export const getGameHeight = (scene: Phaser.Scene) => {
  return scene.game.scale.height;
};
