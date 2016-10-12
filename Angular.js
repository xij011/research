var cities = [
    {
        city : 'Toronto',
        desc : 'This is the best city in the world!',
        lat : 43.7000,
        long : -79.4000
    },
    {
        city : 'New York',
        desc : 'This city is aiiiiite!',
        lat : 40.6700,
        long : -73.9400
    },
    {
        city : 'Chicago',
        desc : 'This is the second best city in the world!',
        lat : 41.8819,
        long : -87.6278
    },
    {
        city : 'Los Angeles',
        desc : 'This city is live!',
        lat : 34.0500,
        long : -118.2500
    },
    {
        city : 'Las Vegas',
        desc : 'Sin City...\'nuff said!',
        lat : 36.0800,
        long : -115.1522
    }
];

function randomIntFromInterval(min,max)
{
  return Math.floor(Math.random()*(max-min+1)+min);
}

//type for coordinate
function coordinate(index,x,y)
{
this.city=index;
this.lat=x;
this.long=y;
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

  points[i] = new coordinate(i,x,y);
}
return points;
}

function outside()
{
  alert("something");
}

marks = generator(100, 32.559443, 33.274042, -116.470811, -117.380338);
//Angular App Module and Controller
angular.module('mapsApp', [])
.controller('MapCtrl', function ($scope) {

  var start = 0;
  var end = 10;

  $scope.myFunction = function() {
    //alert("goes in");
    var n = 0;
    var temp = new Array();
    temp = generator(10, 32.559443, 33.274042, -116.470811, -117.380338);

    //console.log(temp);
    //alert("the value of start is " + start + "and the value of end is " + end);

    for(var j = start; j < end; j++)
    {
      $scope.markers[j].setPosition( new google.maps.LatLng(temp[j%10].lat,temp[j%10].long));
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

    var mapOptions = {
        zoom: 10,
        center: new google.maps.LatLng(32.881323, -117.236593),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    $scope.markers = [];
    var infoWindow = new google.maps.InfoWindow();
    var createMarker = function (info){

        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });

        $scope.markers.push(marker);

    }

    //alert(marks);
    for (i = 0; i < marks.length; i++){
        createMarker(marks[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

});
