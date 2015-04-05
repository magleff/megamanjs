Enemies = function (game) {
    this.game = game;
};

Enemies.prototype.preload = function(){
    this.game.load.atlas('enemy',  'assets/spritesheet/tank/texture.png', 'assets/spritesheet/tank/anim.json');
}
Enemies.prototype.create = function(target, bullets,layer,explosions){
    this.pool = [];
    this.target = target;
    this.bullets = bullets;
    this.layer = layer;
    this.explosions = explosions

    this.enemiesTotal = this.enemiesAlive = 35;

    for (var i = 0; i < this.enemiesTotal; i++) {
        this.pool.push(new EnemyTank(i, this.game, this.target, this.bullets, this.layer, this.explosions));
    }

    this.pool.enableBody = true;
    this.pool.physicsBodyType = Phaser.Physics.ARCADE;


}

Enemies.prototype.update = function(){
    this.game.physics.arcade.collide(this.pool, this.layer);
    
    for (var i = 0; i < this.pool.length; i++) {
        this.pool[i].update();
        
    }
}