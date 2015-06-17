var color = require("color");

var Radient = function(obj) {
  if (obj instanceof Radient) return obj;

  this.stops = [];

  if (Array.isArray(obj)) {
    for (var i = 0; i < obj.length; i++)
      this.stop(obj[i].color, obj[i].location);
  } else {
    for (var i = 0; i < arguments.length; i++)
      this.stops.push({ color: new color(arguments[i]), location: null });
  }

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

  if(isNaN(l)) throw new Error("Invalid stop location: " + l);

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

Radient.prototype.color = function(l, mix)
{
  if (this.stops.length < 2) throw new Error("Gradients must have at least two stops");

  l = parseFloat(l);
  mix = mix || this.rgbMix;

  if(isNaN(l) || l < 0 || l > 1)
    throw new Error("Invalid stop location: " + l);

  left = null;
  right = null;

  for (var i = 0; i < this.stops.length; i++)
  {
    if (this.stops[i].location == l)
      return this.stops[i].color;

    if (this.stops[i].location < l)
      left = this.stops[i];

    if (this.stops[i].location > l) {
      right = this.stops[i];
      break;
    }
  }

  if      (! left)  return right.color;
  else if (! right) return left.color;

  ratio = ( l - left.location ) / ( right.location - left.location);

  return mix(left.color, right.color, ratio);
}

Radient.prototype.rgbMix = function(c1, c2, ratio)
{
  c1 = c1.rgbArray();
  c2 = c2.rgbArray();

  mixed = [];

  for (var i = 0; i < c1.length; i++)
    mixed[i] = (c2[i] - c1[i]) * ratio + c1[i];

  return new color().rgb(mixed);
}

Radient.prototype.sassMix = function(c1, c2, ratio)
{
  return c1.mix(c2, ratio);
}

Radient.prototype.angle = function(deg, mix)
{
  return this.color(deg / 360, mix);
}

Radient.prototype.array = function(num, mix)
{
  if (this.stops.length < 2) throw new Error("Gradients must have at least two stops");

  a = [];
  num = num || 8;

  for (var i = 0; i < num; i++) {
    a.push(this.color(i / (num - 1), mix).hexString());
  }

  return a;
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

var json = [
  {
    color: "rgb(0, 0, 0)",
    location: 0.5
  },
  {
    color: "#2989cc",
    location: 0
  },
  {
    color: color("white"),
    location: 1
  }
];

g = new Radient("#fff", "#000");
console.log(g.array(5));
