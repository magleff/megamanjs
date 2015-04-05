MegaMan = function(game){
    console.log(this);
    startX = 40;
    startY = 10;
    
    nextFire = 0;
    fireRate = 10;
    this.game = game;
    
    this.power = 0;
    this.hitted = 0;
    this.fired = 0;
};

MegaMan.prototype = Object.create(Phaser.Sprite.prototype);

MegaMan.prototype.constructor = MegaMan;

MegaMan.prototype.preload = function() {
	this.game.load.atlas('megaman', 'assets/spritesheet/megaman/texture.png', 'assets/spritesheet/megaman/anim.json');
}

MegaMan.prototype.create = function(layer, cursors, bullets) {
    this.cursors = cursors;
    this.bullets = bullets;
    this.layer = layer;
    
    Phaser.Sprite.call(this, this.game, startX, startY, 'megaman');

    this.animations.add('run',  	Phaser.Animation.generateFrameNames('run'     , 1, 4, '', 2), 5, true);
    this.animations.add('idle',     Phaser.Animation.generateFrameNames('idle'    , 1,12, '', 2), 4, true);
    this.animations.add('shootrun', Phaser.Animation.generateFrameNames('shootrun',1,  4, '', 2), 5, true);
    this.animations.add('fall',     Phaser.Animation.generateFrameNames('fall'    , 1, 2, '', 2), 1, true);
    this.animations.add('up',       Phaser.Animation.generateFrameNames('up'      , 1, 2, '', 2), 1, true);
    this.animations.add('shoot',    Phaser.Animation.generateFrameNames('shoot'   , 0, 1, '', 2), 5, true);
    this.animations.add('sprite',   Phaser.Animation.generateFrameNames('sprite' , 23,23, '', 2), 1, true);
    this.animations.add('hit',      Phaser.Animation.generateFrameNames('damaged' , 1, 1, '', 2), 1, true);
    
    this.anchor.set(0.5);
    
    this.game.add.existing(this);
    this.game.camera.follow(this);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.layer.map.setTileIndexCallback([37],this.hitLadder,this);
}

MegaMan.prototype.update = function() {
	this.body.allowGravity = true;
    this.game.physics.arcade.collide(this, this.layer);
	this.body.velocity.x = 0;
	
	var up      = this.cursors.up.isDown;
	var down    = this.cursors.down.isDown;
	var left    = this.cursors.left.isDown;
	var right   = this.cursors.right.isDown;
	var gravity = this.body.allowGravity;
	var floor   = this.body.onFloor();
   	
    if (up) {
        if(floor) {
            this.power = 36;
            this.body.velocity.y = -10;
        }
        if (this.power > 0) {
            this.body.velocity.y -= this.power;
        }
    }
    
    if (down) {
        this.body.velocity.y -= 10;
        this.animations.play('fall');
    }

    if (left) {
        this.body.velocity.x = -100;
        this.scale.x = -1;
    }
    
    if (right) {
        this.body.velocity.x = 100;
        this.scale.x = 1;
    }
    
    if (!floor) {
        this.animations.play('fall');
    } else {
        if (this.hitted) {
            this.animations.play('hit');
        } else if ((right || left) && this.fired ) {
    		this.animations.play('shootrun');
    	} else if ( this.fired ) {
    		this.animations.play('shoot');
    	} else if( right || left ){
			this.animations.play('run');
		} else {
        	this.animations.play('idle');
    	}
    }

    if (!gravity) {
		this.animations.play('up');
    	this.body.velocity.y = 0;
    	if (up){
    		this.body.position.y -= 1;
    	} else if (down){
    		this.body.position.y += 1;
    	}
    }
    
    if (this.power > 0) {
        this.power -= 4;
    }
	if (this.fired > 0) {
        this.fired -= 1;
    }
    if (this.hitted >0) {
        this.hitted -= 1;
    }
    
    if (this.game.input.activePointer.isDown) {
        this.fire();
    }
    
	this.game.physics.arcade.overlap(
	    this.bullets.pool, 
	    this, 
	    this.hit, 
	    null,
	    this
	);
    
};

MegaMan.prototype.fire = function() {
    if (this.game.time.now > nextFire && this.bullets.pool.countDead() > 0) {
        nextFire = this.game.time.now + fireRate;
        var bullet = this.bullets.pool.getFirstDead();
        bullet.reset(this.x - 8, this.y - 8);
        bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 350);
        this.fired = 20;
    }
}

MegaMan.prototype.hit = function() {

}

MegaMan.prototype.hitLadder = function(sprite,tile){
    sprite.body.allowGravity = false;
    sprite.animations.play('up');
}