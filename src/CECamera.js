// CECamera.js
// CECamera takes three arguments
// context             - html canvas context
// getObjectList       - function that will return all objects in the app.
// defaultFollowObject - the default object to follow if there's no object set to be followed

function CECamera(context, getObjectList, defaultFollowObject) {
	this.context = context;
	this.getObjectList = getObjectList;

	this.center = new Vector();
	this.defaultFollowObject = defaultFollowObject;
	this.followObject = null;
	this.followStrength = 0.05;

	this.backgroundColor = null;

	this.context.canvas.addEventListener('onresize', this.draw.bind(this));
};

CECamera.prototype.setBackgroundColor = function(backgroundColor) {
	this.backgroundColor = backgroundColor;
};

CECamera.prototype.setDefaultFollowObject = function(defaultFollowObject) {
	this.defaultFollowObject = defaultFollowObject;
};

CECamera.prototype.setFollowObject = function(obj, skipLerp) {
	if (obj) {
		this.followObject = obj;
		if (skipLerp) {
			this.lookAt(obj.pos);
		}
	}
};

// Determines how closely it should follow the object to follow based on t.
// 1 being follow 1:1, 0 being follow 0:1. Value is used to lerp in every frame.
CECamera.prototype.setFollowStrength = function(t) {
	this.followStrength = t;
};

CECamera.prototype.lookAt = function(vec) {
	this.center.x = vec.x;
	this.center.y = vec.y;
};

CECamera.prototype.getBounds = function() {
	var width = this.context.canvas.width;
	var height = this.context.canvas.height;
	return new Bounds(this.center.x - width/2, this.center.y - height/2, width, height);
};

CECamera.prototype.convertWorldToCameraSpace = function(vec) {
	var width = this.context.canvas.width;
	var height = this.context.canvas.height;
	return vec.sub(this.center).add(new Vector(width/2, height/2));
};

CECamera.prototype.convertCameraToWorldSpace = function(vec) {
	var width = this.context.canvas.width;
	var height = this.context.canvas.height;
	return this.center.add(vec.sub(new Vector(width/2, height/2)));
};

CECamera.prototype.draw = function() {
	if (this.backgroundColor != null) {
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(0,0,this.context.canvas.width, this.context.canvas.height);
	}
	else {
		this.context.clearRect(0,0,this.context.canvas.width, this.context.canvas.height);
	}

	if (this.followObject) {
		this.center = Vector.Lerp(this.center, this.followObject.pos, this.followStrength);
	}

	var viewOrigin = this.center.sub(new Vector(this.context.canvas.width/2, this.context.canvas.height/2));

	var drawObjects = this.getObjectList();
	for (var i = 0; i < drawObjects.length; i++) {
		this.context.save();
		this.context.translate(drawObjects[i].pos.x - viewOrigin.x, drawObjects[i].pos.y - viewOrigin.y)
		drawObjects[i].draw();
		this.context.restore();
	};
};
