//See: https://github.com/pablojim/highcharts-ng
var myapp = angular.module('myapp', ["highcharts-ng"]);

myapp.controller('myctrl', function ($scope) {


  marks = generator(100, 145, 185, 20, 120);
  prepare = preparejson(marks);
  var start = 0;
  var end = 10;

    $scope.addPoints = function () {
        //alert("goes in");
        var some = [];
        var seriesArray = $scope.highchartsNG.series;

        var n = 0;
        var temp = new Array();
        temp = generator(10, 145, 185, 20, 120);
        for(var j = start; j < end; j++)
        {
          marks[j] = temp[n];
          n = n + 1;
        }

        start = start + 10;
        end = end + 10;
        if(end == 100)
        {
          start = 0;
          end = 10;
        }

        prepare = preparejson(marks);


        seriesArray[0].data = JSON.parse("[" + prepare + "]")

    };


    $scope.highchartsNG = {

      yAxis: {
          title: {
              text: 'y value'
          }
      },
      xAxis: {
          title: {
              enabled: true,
              text: 'x value'
          },
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true
      },
        options: {
            chart: {
                type: 'scatter'
            }
        },
        series: [{
            name: 'test dot',
            color: 'rgba(223, 83, 83, .5)',
            data: JSON.parse("[" + prepare + "]")
        }],
        title: {

            text: 'Test Scatter chart'
        },
        loading: false
    }

});

function preparejson(marks)
{
  var prepare = "";
  for (var i = 0; i < marks.length; i++)
  {
      if(i==99)
      {
        prepare = prepare.concat("[");
        prepare = prepare.concat(marks[i].x);
        prepare = prepare.concat(", ");
        prepare = prepare.concat(marks[i].y);
        prepare = prepare.concat("]");
        continue;
      }
      prepare = prepare.concat("[");
      prepare = prepare.concat(marks[i].x);
      prepare = prepare.concat(", ");
      prepare = prepare.concat(marks[i].y);
      prepare = prepare.concat("]");
      prepare = prepare.concat(", ");
  }
  return prepare;
}

//object type coordinate, single dot on a graph
function coordinate(index,x,y)
{
  this.index=index;
  this.x=x;
  this.y=y;
}

//random number generator from min to max
function randomIntFromInterval(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

//return coordinate data type
function generator(times, xmin, xmax, ymin, ymax)
{
  var points = new Array();
  xmin = xmin * 10;
  xmax = xmax * 10;

  //let's hard written this part temporarily.
  ymin = ymin * 10;
  ymax = ymax * 10;

  var i = 0;
  for (i = 0; i < times; i++)
  {
    var x = randomIntFromInterval(xmin, xmax);
    x = x / parseFloat(10);

    var y = randomIntFromInterval(ymin, ymax);
    y = y / parseFloat(10);

    points[i] = new coordinate(i,x,y);
  }
  return points;
}
