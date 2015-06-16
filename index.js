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

Radient.prototype.stop = function(c, l)
{
  l = parseFloat(l);

  if(isNaN(l)) throw new Error("Unable to determine stop location: " + l);

  if (stop = this.stopAt(l))
    stop.color = new color(c);
  else
    this.stops.push({ color: new color(c), location: l });

  this.sort();
}

Radient.prototype.stopAt = function(l)
{
  for (var i = 0; i < this.stops.length; i++)
    if (this.stops[i].location == l)
      return this.stops[i];
}

Radient.prototype.sort = function()
{
  this.stops.sort(function (a, b) {
    return a.location - b.location;
  });
}

Radient.prototype.color = function(location)
{
}

Radient.prototype.angle = function(degrees)
{
}

Radient.prototype.array = function(stops)
{
  if (this.stops.length < 2) throw new Error("Gradients must have at least two stops");
}

Radient.prototype.toString = function()
{
  if (this.stops.length == 0) return 'empty gradient';

  r = [];

  this.stops.forEach(function(element) {
    r.push(element.location + ' ' + element.color.hexString());
  });

  return r.join("\n");
}

module.exports = Radient;
