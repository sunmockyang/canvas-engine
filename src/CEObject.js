function CEObject () {
	this.context = null;
	this.pos = new Vector();
	this.id = "random object";
	this.type = CEObject;

	// Only to be toggled by the destroy function.
	this.isToBeDestroyed = false;
};

CEObject.prototype.setCamera = function(camera) {
	this.context = camera.context;
};

CEObject.prototype.getID = function() {
	return this.id;
};

CEObject.prototype.setPos = function(x, y) {
	this.pos.x = x;
	this.pos.y = y;
};

CEObject.prototype.update = function() {};

CEObject.prototype.draw = function() {
	console.error("IMPLEMENT A DRAW FUNCTION");
	console.log("Draw the object centered at 0,0");
};

CEObject.prototype.postDraw = function () {};

CEObject.prototype.destroy = function() {
	this.isToBeDestroyed = true;
};

CEObject.prototype.onDestroy = function() {
	// This will be run when the destroy function is called. Override this and do any clean up here before the object gets removed.
};