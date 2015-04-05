Bullets = function (game) {
    this.game = game;
};

Bullets.prototype = Object.create(Phaser.Group.prototype);

Bullets.prototype.constructor = Bullets;

Bullets.prototype.preload = function(){
    this.game.load.image('bullet', '../assets/sprite/bullet.png');
}
Bullets.prototype.create = function(){
    this.pool = this.game.add.group();
    this.pool.enableBody = true;
    //this.pool.physicsBodyType = Phaser.Physics.ARCADE;
    this.pool.createMultiple(50, 'bullet');
    this.pool.scale.x = 1;
    this.pool.scale.y = 1;
    this.pool.setAll('checkWorldBounds', true);
    this.pool.setAll('outOfBoundsKill', true);
    this.pool.setAll('anchor.x', 0.1);
    this.pool.setAll('anchor.y', 0.1);
    this.pool.gravity = 0.1;
}

Bullets.prototype.update = function(){
    this.pool.forEachAlive(function(bullet) {
        bullet.rotation = Math.atan2(bullet.body.velocity.y, bullet.body.velocity.x);
        bullet.scale = new PIXI.Point(0.5,0.5);
    }, this);
}