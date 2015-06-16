var color = require("color");

var Radient = function(obj) {
  if (obj instanceof Radient) return obj;

  this.stops = [];

  for (var i = 0; i < arguments.length; i++)
    this.stops.push({ color: new color(arguments[i]), location: null });

  this.distribute();
}

Radient.prototype.distribute = function()
{
  n = 1 / (this.stops.length - 1);

  for (var i = 0; i < this.stops.length; i++)
    this.stops[i].location = i * n;
}

Radient.prototype.stop = function(color, location)
{
}

Radient.prototype.color = function(location)
{
}

Radient.prototype.angle = function(degrees)
{
}

Radient.prototype.array = function(stops)
{
}

Radient.prototype.toString = function()
{
  if (this.stops.length == 0) throw new Error("Gradients must have at least two stops");

  r = [] ;

  this.stops.forEach(function(element) {
    r.push(element.location + ' ' + element.color.hexString());
  });

  return r.join("\n");
}

module.exports = Radient;
