var player,cursors;

var Application = {
		preload: function () {
			game.load.image('background', 'assets/sky.png');
			game.load.image('floor', 'assets/grassGround.png');
			game.load.image('player', 'assets/materia.png');
		},
		
		create: function () {
			
	        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	        this.scale.updateLayout(true);
	        
			game.add.sprite(0, 0, 'background');
			
			floor = game.add.sprite(0,GAME_VIEW_HEIGHT-80,'floor');
			game.physics.arcade.enable(floor);
			floor.body.immovable = true;
			
			player = game.add.sprite(50, game.world.height - 200, 'player');
			game.physics.arcade.enable(player);
			player.body.bounce.y = 0;
		    player.body.gravity.y = 1700;
		    player.body.collideWorldBounds = true;
		    
		    cursors = game.input.keyboard.createCursorKeys();
		},
		
		update: function () {
			player.body.velocity.x = 0;
			game.physics.arcade.collide(player, floor);
			
			if (cursors.left.isDown)
		    {
		        player.body.velocity.x = -350;
		    }
		    else if (cursors.right.isDown)
		    {
		        player.body.velocity.x = 350;
		    }
			
			if (cursors.up.isDown && player.body.touching.down)
		    {
		        player.body.velocity.y = -600;
		    }
		},
		
		render: function () {
			
		}
}
