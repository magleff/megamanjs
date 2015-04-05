HeatMap = function(game){
    this.game = game;
};

HeatMap.prototype = Object.create(Phaser.Sprite.prototype);

HeatMap.prototype.constructor = Map;

HeatMap.prototype.preload = function() {
    this.game.load.tilemap('tilemap_heatman', 'assets/tilemap/heatman.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tileset_heatman', 'assets/tilemap/heatman.png');
};

HeatMap.prototype.create = function() {
    this.front = this.game.add.tilemap('tilemap_heatman');

    this.front.addTilesetImage('heatman', 'tileset_heatman');
    this.front.setCollisionByExclusion([1,3,5,6,7,8,9,10,11,15,16,17,18,19,20,24,21,27,28,29,31,32,33,34,39]);
    this.layer = this.front.createLayer('Ground');
    this.colle = this.front.createLayer('Collectibles');
    console.log(this.colle);
    this.layer.resizeWorld();

};

HeatMap.prototype.update = function() {
    
};