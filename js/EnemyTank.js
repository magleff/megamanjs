EnemyTank = function (index, game, player, bullets, layer, explosions) {

    var x = game.world.randomX;
    var y = game.world.randomY;

    this.game = game;
    this.layer = layer;
    this.health = 10;
    this.player = player;
    this.bullets = bullets;
    this.explosions = explosions;
    this.fireRate = 1000;
    this.nextFire = 0;
    this.alive = true;
    this.name = index.toString();

    this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
    this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
    this.turret = game.add.sprite(x, y, 'enemy', 'turret');

    this.tank.scale = new PIXI.Point(0.5,0.5);
    this.shadow.anchor.set(0.5);
    this.tank.anchor.set(0.5);
    this.turret.anchor.set(0.3, 0.5);

    this.tank.name = index.toString();

    game.physics.enable(this.tank, Phaser.Physics.ARCADE);

    this.tank.body.immovable = false;
    //this.tank.body.collideWorldBounds = true;

    this.tank.angle = game.rnd.angle();

    game.physics.arcade.velocityFromRotation(this.tank.rotation, 100, this.tank.body.velocity);
    
    this.text = this.game.add.text(10,10, "FPS", {
        font: "16px Arial",
        fill: "#ffffff",
        align: "center"
    });
	this.text.anchor.setTo(0.5, 0.5);
    
    

};


EnemyTank.prototype.hit = function(tata,bullet) {
 if(bullet.name != this.name){
     
     bullet.kill();
     this.damage();
 }
    
}

EnemyTank.prototype.damage = function() {

    this.health -= 1;

    if (this.health <= 0)
    {
        this.alive = false;

        this.shadow.kill();
        this.tank.kill();
        this.turret.kill();

        return true;
    }else{
        
        var explosionAnimation = this.explosions.getFirstExists(false);

        explosionAnimation.reset(this.tank.x, this.tank.y);
        explosionAnimation.play('kaboom', 30, false, true);
    }
    return false;
}

EnemyTank.prototype.update = function() {
    if (this.alive) {
    	this.shadow.x = this.tank.x;
		this.shadow.y = this.tank.y;
		this.shadow.rotation = this.tank.rotation;
		
		this.turret.x = this.tank.x;
		this.turret.y = this.tank.y;
		this.turret.rotation = this.game.physics.arcade.angleBetween(this.tank, this.player);
		
		if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 300)
		{
		    if (this.game.time.now > this.nextFire && this.bullets.pool.countDead() > 0)
		    {
		        this.nextFire = this.game.time.now + this.fireRate;
		
		        var bullet = this.bullets.pool.getFirstDead();
		
		        bullet.reset(this.turret.x, this.turret.y);
		
		        bullet.rotation = this.game.physics.arcade.moveToObject(bullet, this.player, 200);
		        bullet.name = this.tank.name;
		    }
		}
		
		
		this.game.physics.arcade.collide(this.player, this.tank);
		this.game.physics.arcade.collide(this.layer, this.tank);

		
		this.game.physics.arcade.overlap(
		    this.bullets.pool, 
		    this.tank, 
		    this.hit, 
		    null,
		    this
		);
		
		this.text.setText('BOB');
        this.text.position.x = this.tank.position.x+30;
        this.text.position.y = this.tank.position.y+30;
		
    }

};
   