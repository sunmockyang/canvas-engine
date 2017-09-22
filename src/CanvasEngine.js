function CanvasEngine(canvas) {
	// Set up canvas
	this.canvas = canvas;
	this.context = canvas.getContext("2d");

	this.ceObjectList = [];
	this.camera = new CECamera(this.context, this.getObjectList.bind(this));

	// Mouse input
	this.mouse = new LibraryMouse(this.canvas);
	this.mouse.addEventListener("mousemove", this.onMouseMove.bind(this));
	this.mouse.addEventListener("mouseover", function(){});
	this.mouse.addEventListener("mouseout", this.onMouseOut.bind(this));
	this.mouse.addEventListener("mousedown", function(){});
	this.mouse.addEventListener("mouseup", function(){});
	this.mouse.addEventListener("click", this.onMouseClick.bind(this));
	this.mouse.addEventListener("doubleclick", function(){});

	document.onkeypress = this.keyPress.bind(this);

	this.init();
};

//Main framework functions
CanvasEngine.prototype.init = function() {
	console.log("Runs once at the start of initialization of the class. Initialize all app specific entities here.");
};

CanvasEngine.prototype.run = function(){
	this.update();
	this.draw();
	this.postDraw();
	this.cleanUp();
	window.requestAnimationFrame(this.run.bind(this));
};

CanvasEngine.prototype.update = function() {
	console.log("Main update. Runs each frame before draw. Should be overriden and call update() on all elements in ceObjectList");
};
 
CanvasEngine.prototype.draw = function() {
	this.camera.draw();
};

CanvasEngine.prototype.postDraw = function() {
	console.log("Post draw update. Runs each frame after the draw. Should be overriden and call postDraw() on all elements in ceObjectList");
};

CanvasEngine.prototype.cleanUp = function() {
	// Cleaning up any destroyed objects
	var objectsToDestroy = [];
	for (var i = 0; i < this.ceObjectList.length; i++) {
		if (this.ceObjectList[i].isToBeDestroyed) {
			objectsToDestroy.push(this.ceObjectList[i]);
		}
	}

	for (var i = 0; i < objectsToDestroy.length; i++) {
		this.objectsToDestroy[i].onDestroy();
		this.removeObject(objectsToDestroy[i]);
	}
};

// Engine object functions
CanvasEngine.prototype.addObject = function(obj, addToTopOfDrawStack) {
	obj.setCamera(this);

	// by default add items to the front
	if (addToTopOfDrawStack !== true) {
		this.ceObjectList.unshift(obj)
	}
	else {
		this.ceObjectList.push(obj);
	}
};

CanvasEngine.prototype.removeObject = function(obj) {
	for (var i = 0; i < this.ceObjectList.length; i++) {
		if (this.ceObjectList[i] == obj) {
			this.ceObjectList.splice(i, 1);
			break;
		}
	};
};

CanvasEngine.prototype.getObjectList = function() {
	return this.ceObjectList;
};

// Event handlers
CanvasEngine.prototype.onMouseMove = function() {};
CanvasEngine.prototype.onMouseClick = function() {};
CanvasEngine.prototype.onMouseOut = function() {}
CanvasEngine.prototype.keyPress = function(e) {};
