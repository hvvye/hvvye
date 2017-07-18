function CircleText(option){
	this._init(option);
}
CircleText.prototype = {
	_init : function(option){
		this.x = option.x,
		this.y = option.y,
		this.innerRadius = option.innerRadius,
		this.outerRadius = option.outerRadius,
		this.innerFill = option.innerFill,
		this.outerFill = option.outerFill
		this.text = option.text;
		this.fontSize = option.fontSize || 20;

		var cenCircle = new Konva.Circle({
			x : 0,
			y : 0,
			radius : this.innerRadius,
			fill : this.innerFill
		});

		var ring = new Konva.Ring({
			x : 0,
			y : 0,
			innerRadius : this.innerRadius,
			outerRadius : this.outerRadius,
			fill : this.outerFill
		});

		var text = new Konva.Text({
			x : -this.outerRadius,
			y : -this.fontSize/2,
			width : this.outerRadius*2,
			fontSize : this.fontSize,
			align : "center",
			fontWeight : "bold",
			fill : "#eff",
			text : this.text,
		});

		this.group = new Konva.Group({
			x : this.x,
			y : this.y,	
		});

		this.group.add(ring);
		this.group.add(cenCircle);
		this.group.add(text);
	},
	addToGroupOrLayer : function(arg){
		arg.add(this.group);
	}
}