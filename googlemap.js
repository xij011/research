//global variables
var marks = new Array();
var start = 0;
var end = 10;
var gmarks = [];


//the method when you refresh 10% of the data
function trigger()
{
  var n = 0;
  var temp = new Array();
  temp = generator(10, 32.559443, 33.274042, -116.470811, -117.380338);
  console.log(temp);
  //alert("the value of start is " + start + "and the value of end is " + end);
  for(var j = start; j < end; j++)
  {
    gmarks[j].setPosition(temp[n]);
    n = n + 1;
  }

  start = start + 10;
  end = end + 10;
  if(end == 100)
  {
    start = 0;
    end = 10;
  }

}
var map;

//default random 100 marks on the map
function initMap() {
var myLatLng = {index: 1, lat: 32.881323, lng: -117.236593};

marks = generator(100, 32.559443, 33.274042, -116.470811, -117.380338);



map = new google.maps.Map(document.getElementById('map'), {
zoom: 10,
center: myLatLng
});

//looping through dots
for (var i = 0; i < marks.length; i++)
{

  var marker = new google.maps.Marker({
  position: marks[i],
  map: map,
  title: 'Hello World!'
  });

  gmarks.push(marker);

}

}

//random number generator
function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

//type for coordinate
function coordinate(index,x,y)
{
this.index=index;
this.lat=x;
this.lng=y;
}

//generate 100 random coordinate with random x and y values
function generator(times, xmin, xmax, ymin, ymax)
{
var points = new Array();
xmin = xmin * 1000000;
xmax = xmax * 1000000;

//let's hard written this part temporarily.
ymin = ymin * -1000000;
ymax = ymax * -1000000;

var i = 0;
for (i = 0; i < times; i++)
{
  var x = randomIntFromInterval(xmin, xmax);
  x = x / parseFloat(1000000);

  var y = randomIntFromInterval(ymin, ymax);
  y = y / parseFloat(-1000000);

  points[i] = new google.maps.LatLng(x,y);
}
return points;
}
