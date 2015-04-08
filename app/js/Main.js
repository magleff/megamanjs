function Main() {
    
	var game = new Phaser.Game(
	    360, 
	    220, 
	    Phaser.WEBGL, 
	    'phaser-example', 
	    {
	        preload: preload,
	        create: create,
	        update: update,
	        render: render
	    }
	),
	megaman = new MegaMan(game),
	bullets = new Bullets(game),
	enemies = new Enemies(game),
	map 	= new HeatMap(game);
	var background;
	
	var tilesprite;
	var explosions;
	
	function preload() {
		megaman.preload();
			map.preload();
		bullets.preload();
		enemies.preload();
		
    	game.load.image('star', 'assets/sprite/starfield.jpg');
    	game.load.image('far', 'assets/landscape/bg-far.png');
    	game.load.image('mid', 'assets/landscape/bg-mid.png');
    	
    	game.load.image('chunk', 'assets/sprite/chunk.png');
        game.load.spritesheet('kaboom', 'assets/sprite/explosion.png', 64, 64, 23);
        
        // objects = load_objects_from_tiled_map('assets/tilemaps/heatman.json','Collectibles');
        // console.log(objects);
	}
	var cursors;

	function create() {
	    game.time.advancedTiming = true
	    game.physics.arcade.gravity.y = 400;
	    
	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

	    cursors = game.input.keyboard.createCursorKeys();

	    fullscreen = game.input.keyboard.addKey(Phaser.Keyboard.F);

	    fullscreen.onDown.add(goFull, this);
	
        star = this.game.add.tileSprite(0, 0, 360, 220, 'star');
    	star.fixedToCamera = true;
    	/*
        far = this.game.add.tileSprite(0, 0, 512, 256, 'far');
    	far.fixedToCamera = true;
        mid = this.game.add.tileSprite(0, 0, 512, 256, 'mid');
    	mid.fixedToCamera = true;
    	
    	mid.cameraOffset.y = 100; */
	
        //  Explosion pool
        explosions = game.add.group();
    
        for (var i = 0; i < 10; i++)
        {
            var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
            explosionAnimation.anchor.setTo(0.5, 0.5);
            explosionAnimation.animations.add('kaboom');
        }
	
		map.create();
	    bullets.create();
	    megaman.create(map.layer, cursors, bullets,background);
		enemies.create(megaman, bullets, map.layer,explosions);
		
		//explosions.bringToTop();
		
	    text = game.add.text(10,10, "FPS", {
	        font: "16px Arial",
	        fill: "#ffffff",
	        align: "center"
	    });
		text.anchor.setTo(0.5, 0.5);
		
	}
	
	function update() {
			bullets.update();
			enemies.update();
			
	        text.setText(game.time.fps+' '+megaman.fired);
	        text.position.x = megaman.position.x+30;
	        text.position.y = megaman.position.y+30;

	        star.tilePosition.x = -megaman.x*0.1;
	        star.tilePosition.y = -megaman.y*0.01;
	        /*
	        far.tilePosition.x = -megaman.x*0.2;
	        far.tilePosition.y = -megaman.y*0.02;
	        
	        mid.tilePosition.x = -megaman.x*0.3;
	        mid.tilePosition.y = -megaman.y*0.03;*/
	}
	
	function render() {
		game.debug.cameraInfo(game.camera, 32, 32);
		game.debug.bodyInfo(megaman, 32, 32);
        game.debug.body(megaman);
	}
	
	function goFull(){
	    if (game.scale.isFullScreen){
	        game.scale.stopFullScreen();
	    }else{
	        game.scale.startFullScreen(false);
	    }
	}
}