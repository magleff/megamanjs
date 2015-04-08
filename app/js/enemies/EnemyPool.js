function EnemyPool(game) {
  this.pool = [];
  this.game = game;
}

EnemyPool.prototype.create = function(layer) {
  this.layer = layer;
  this.pool.enableBody = true;
  this.pool.physicsBodyType = Phaser.Physics.ARCADE;
};

EnemyPool.prototype.update = function() {
  this.game.physics.arcade.collide(this.pool, this.layer);

  for (var i = 0; i < this.pool.length; i++) {
    this.pool[i].update();
  }
};

EnemyPool.prototype.subscribe = function(enemy) {
  this.pool.push(enemy);
};
