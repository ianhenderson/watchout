// start slingin' some d3 here.

var boardData = {
  width: 750,
  height: 750,
  numEnemies: 30
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
// Define drag beavior
var dragmove = function (d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('cx', x).attr('cy',y);
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);


//player
board.append("circle")
  .style("fill", "blue")
  .attr("class", "player")
  .attr("r", 25)
  .attr("cx", (boardData.width/2))
  .attr("cy", (boardData.height/2))
  .call(drag);


var update = function(positions){
  d3.selectAll(".enemy").data(positions)
         .transition()
         .duration(750)
         .attr("cx", function(d){ return d[0];})
         .attr("cy", function(d){ return d[1];});

  board.selectAll("circle").data(positions).enter().append('circle')
         .transition()
         .duration(750)
         .attr("cx", function(d){ return d[0];})
         .attr("cy", function(d){ return d[1];})
         .attr("r", 25)
         .style("fill", "pink")
         .attr("class", "enemy");
};
update(randPosition());
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
