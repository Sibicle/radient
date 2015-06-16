# radient

Radient makes it easy to take a series of colors and extrapolate information it,
whether it be an evenly spaced array of colors, or a color at a specific point.
Radient uses [Color](https://github.com/brehaut/color-js) classes to represent
gradient stops.

## Install

```console
$ npm install radient
```

## Usage

Passing an Array of colors will generate a gradient with evenly spaced stops
(i.e. a three color gradient will have a stop a 0, 50% and 100%)

```js
var gradient = Radient("#00ffff", #ff00ff, #ffff00);

```

Radient uses the ```color``` library to represent colors, so all ```color```
representations will work

```js
var gradient = Radient(
  "rgb(225, 241, 101)",
  Color().hsl([56, 60, 88]),
  Color("25b34b"),
  {c: 100, y: 100, m: 0, k: 0}
);
```

Alternatively, color stops can be set one at a time

```js
var gradient = Radient();
gradient.stop("#ffb90d");
gradient.stop("#cc0045");
gradient.stop("#009980");
```

Gradients are 1 unit long, so gradient stops should be between 0 and 1

```js
var gradient = Radient();
gradient.stop("#6abfeb", 0);
gradient.stop("#b9d3c3", 0.25);
gradient.stop("#f7e998", 0.5);
gradient.stop("#f4bcac", 0.75);
gradient.stop("#f495b3", 1);
```

Gradients can also be loaded from a JSON object

```js
var arr = [
  {
    color: "rgb(255, 255, 255)",
    location: 0.5
  },
  {
    color: "#2989cc",
    location: 0
  },
  {
    color: Color("white"),
    location: 1
  },
  {
    color: Color().rgb(144, 106, 0),
    location: 0.52
  },
  {
    color: Color().cymk([16, 37, 100, 1]),
    location: 0.64
  }
];

var gradient = Radient(arr);
```

### Colors

To retrieve information from Radient, you can get a `color` object from any stop
along the gradient.

```js
var gradient = Radient("black", "white");
gradient.color(0.5).rgb(); // {r: 128, g: 128, b: 128}
```

You can also get a color 'angle' in degrees

```js
gradient.angle(180);
```

### Arrays

You can also get an array of evenly spaced color stops. The default number of
stops is 8. Note that this function may result in a loss of precision in your
gradient.

```js
var gradient = Radient("#7e11a7", "#55ed20");
gradient.array(5);

/* [
  '#7e11a7',
  '#763d8b',
  '#697f63',
  '#5dc13b',
  '#55ed20'
] */
```
