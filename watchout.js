// start slingin' some d3 here.

var boardData = {
  width: 750,
  height: 750,
  numEnemies: 5
};



// var positions = [];
var randPosition = function(){
  var positions = [];
  for (var i = 0; i < boardData.numEnemies; i++){
    var tuple = [(Math.random() * boardData.width), (Math.random() * boardData.height)];
    positions.push(tuple);
  }
  return positions;
};
var positions = randPosition();
//viewport selection
var board = d3.select("body").append("svg")
                .attr("width", 750)
                .attr("height", 750)
                .append("g");
//scale for axis
var axes = {
  x: d3.scale.linear().domain([0,100]).range([0, board.width]),
  y: d3.scale.linear().domain([0,100]).range([0, board.height]),
};

//create the axis
var createAxis = {
  x: d3.svg.axis().scale(axes.x),
  y: d3.svg.axis().scale(axes.y)
};

// var enemies = d3.select("svg").selectAll("circle").data(positions, function (d) {return d;});

// d3.select("svg").selectAll("circle")



// enemies.enter().append("circle")
//        .attr("cx", function(d){ return d[0];})
//        .attr("cy", function(d){ return d[1];})
//        .attr("r", 25)
//        .style("fill", "pink");

var update = function(positions){
  console.log(positions);
  //data join
  // var enemies = d3.select("svg").selectAll("circle").data(positions, function (d) {return d;});
  var enemies = board.selectAll("circle").data(positions, function (d) {return d;});

  // debugger;
  enemies
         .attr("cx", function(d){ return d[0];})
         .attr("cy", function(d){ return d[1];})
         .attr("r", 25)
         .style("fill", "pink");

  enemies.enter().append('circle')
         .transition()
         .duration(750)
         .attr("cx", function(d){ return d[0];})
         .attr("cy", function(d){ return d[1];})
         .attr("r", 25)
         .style("fill", "pink");

 enemies.exit()
        .remove();

};

setInterval(function () {update(randPosition());}, 1500);


// create container
// create enemies
//   create initial positions for enemies
// create player
//  initialize player position
//
//  update function:
//    place enemies in their positions
//    player stuff??
//    repeat
//
