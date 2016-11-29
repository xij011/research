var myapp = angular.module('myapp', ['uiGmapgoogle-maps']);
myapp.controller('myctrl', function ($scope) {
  var start = 0;
  var end = 10;

  $scope.addPoints = function () {

    for(var j = start; j < end; j++)
    {
      var tmp = createRandomMarker(j, $scope.map.bounds);
      markers[j] = tmp;
      //alert("goes in");
    }

    start = start + 10;
    end = end + 10;

    if(end == 100)
    {
      start = 0;
      end = 10;
    }

    $scope.randomMarkers = markers;

  };

  $scope.map = {
  center: {
    latitude: 32.881323,
    longitude: -117.236593
  },
  zoom: 9,
  bounds: {
    northeast: {
      latitude: 32.559443,
      longitude: -116.470811
    },
    southwest: {
      latitude: 33.274042,
      longitude: -117.380338
    }
  }
};

$scope.options = {
  scrollwheel: false
};

var createRandomMarker = function(i, bounds, idKey) {
  var lat_min = bounds.southwest.latitude,
    lat_range = bounds.northeast.latitude - lat_min,
    lng_min = bounds.southwest.longitude,
    lng_range = bounds.northeast.longitude - lng_min;

  if (idKey == null) {
    idKey = "id";
  }

  var latitude = lat_min + (Math.random() * lat_range);
  var longitude = lng_min + (Math.random() * lng_range);
  var ret = {
    latitude: latitude,
    longitude: longitude,
    title: 'm' + i
  };
  ret[idKey] = i;
  return ret;
};

var markers = [];
for (var i = 0; i < 100; i++) {
  markers.push(createRandomMarker(i, $scope.map.bounds))
}

$scope.randomMarkers = markers;

});
