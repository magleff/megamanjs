function Enemy (game) {
  this.game = game;
}

Enemy.prototype.create = function (target, bullets, layer, explosions) {
  this.target = target;
  this.bullets = bullets;
  this.layer = layer;
  this.explosions = explosions;
};