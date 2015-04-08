Map = function(game){
    this.game = game;
};

Map.prototype = Object.create(Phaser.Sprite.prototype);

Map.prototype.constructor = Map;

Map.prototype.preload = function() {
    this.game.load.tilemap('tilemap_megamanboss', 'assets/tilemap/megamanboss.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tileset_metalman', 'assets/tilemap/metalman.png');
};

Map.prototype.create = function() {
    this.front = this.game.add.tilemap('tilemap_megamanboss');
    this.front.addTilesetImage('metalman', 'tileset_metalman');
    this.front.setCollisionByExclusion([27,8,9,10,18,19,20,27,28,29,30,36,37,38,39,40,46,47,48,49,50,56,57,58,59,60,45]);
    this.layer = this.front.createLayer('Ground');
    this.layer.resizeWorld();
};

Map.prototype.update = function() {
};