function PieChart( option ) {
	this._init( option );
}

PieChart.prototype = {
	_init: function( option ) {
		this.x = option.x || 0;
		this.y = option.y || 0;
		this.r = option.r || 0;
		this.data = option.data || [];

		this.group = new Konva.Group({
			x: this.x,
			y: this.y
		});

		this.wedgeGroup = new Konva.Group({
			x: 0,
			y: 0
		});

		this.textGroup = new Konva.Group({
			x: 0,
			y: 0
		});

		this.group.add( this.wedgeGroup );
		this.group.add( this.textGroup );

		var _this = this;
		var tempAngel = -90;

		this.data.forEach(function(item, index ) {
			var angle = 360 * item.value;
			var wedge = new  Konva.Wedge({
				x: 0,		
				y: 0,
				angle: angle ,	
				radius: _this.r,	
				fill: item.color,	
				rotation: tempAngel 
			});

			_this.wedgeGroup.add( wedge );

			var textAngle = tempAngel + 1/2 * angle;

			var text = new Konva.Text({
				x: (_this.r+20) * Math.cos(Math.PI/ 180 * textAngle ),
				y: (_this.r+20) * Math.sin(Math.PI/ 180 * textAngle ),
				text: item.value*100 +'%',
				fill: item.color
			});

			if(  textAngle > 90 && textAngle < 270 ) {
				text.x( text.x() - text.getWidth() );
			}

			_this.textGroup.add( text );
			
			tempAngel += angle;
		});
		
		var cir = new Konva.Circle({
			x: 0,
			y: 0,
			radius: this.r+10,
			stroke: '#ccc',
			strokeWidth: 2
		});

		this.group.add( cir );

		this._animateIndex = 0;
	},
	playAnimate: function() {

		var _this = this;
		
		if( this._animateIndex == 0 ) {
			this.wedgeGroup.getChildren().each(function(item, index ){
				item.angle(0);
			});
		}

	 	var item = this.wedgeGroup.getChildren()[this._animateIndex];
	 	item.to({
	 		angle: this.data[this._animateIndex].value * 360,
	 		duration: 2 * this.data[this._animateIndex].value,
	 		onFinish: function() {
	 			_this._animateIndex ++;
	 			if( _this._animateIndex >= _this.data.length) {

	 				_this._animateIndex = 0;
	 				return;
	 			}
	 			_this.playAnimate();
	 		}
	 	});
	},
	addToGroupOrLayer: function( arg ) {
		arg.add( this.group );
	}
}