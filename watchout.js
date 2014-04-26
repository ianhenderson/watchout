// start slingin' some d3 here.

var boardData = {
  width: window.innerWidth,
  height: window.innerHeight,
  enemySize: ((window.innerWidth * window.innerHeight) * .00001),
  playerSize: ((window.innerWidth * window.innerHeight) * .00001),
  numEnemies: 50,
  high: 0,
  current: 0,
  collisions: 0
};

var board = d3.select("body").append("svg").append('g');

var updateWindowData = function(){
  boardData.enemySize = ((window.innerWidth * window.innerHeight) * .00001);
  boardData.playerSize = ((window.innerWidth * window.innerHeight) * .00001);
  boardData.width = window.innerWidth;
  boardData.height = window.innerHeight;
  d3.select('g').attr("width", boardData.width)
                .attr("height", boardData.height);
};

d3.select(".collisions").select("span").text();



// var positions = [];
var randPosition = function(){
  var positions = [];
  for (var i = 0; i < boardData.numEnemies; i++){
    var triplet = [(Math.random() * boardData.width), (Math.random() * boardData.height), ((Math.random() * 1200) + 200)];
    positions.push(triplet);
  }
  return positions;
};
var positions = randPosition();
//viewport selection
// var board = d3.select("body").append("svg")
                // .attr("width", boardData.width)
                // .attr("height", boardData.height)
//                 .append("g");
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

var collisionCheck = function(){
  var px = d3.select(".player").attr("cx");
  var py = d3.select(".player").attr("cy");
  var r = d3.select(".player").attr("r");

  d3.selectAll(".enemy").each(function(x){
    d3.select(".collisions").select("span").text(Math.floor(boardData.collisions));
    d3.select(".current").select("span").text(Math.floor(boardData.current));
    d3.select(".high").select("span").text(Math.floor(boardData.high));
    var dx = x[0] - px;
    var dy = x[1] - py;
    var dr = 2*r; // Need to be changed to include enemy value.
    var distance = Math.sqrt( Math.pow(dx,2) + Math.pow(dy,2) );
    if ( distance < dr ){
      boardData.collisions = boardData.collisions + 0.1;
      boardData.current = 0;
    } else {
      boardData.current = boardData.current + 0.01;
      if (boardData.current > boardData.high) {
        boardData.high = boardData.current;
      }
    }
  });
};


// Define drag beavior
var dragmove = function (d) {
  var x = d3.event.x;
  var y = d3.event.y;
  d3.select(this).attr('cx', x).attr('cy',y);
  collisionCheck();
};

var drag = d3.behavior.drag()
    .on("drag", dragmove);


//player
board.append("circle")
  .style("fill", "blue")
  .attr("class", "player")
  .attr("r", boardData.playerSize)
  .attr("cx", (boardData.width/2))
  .attr("cy", (boardData.height/2))
  .call(drag);



var update = function(positions){
  updateWindowData();

  d3.select('.player').transition().attr('r', boardData.playerSize);

  d3.selectAll(".enemy").data(positions)
         .transition()
         .duration(function(d){return d[2];})
         .attr("cx", function(d){ return d[0];})
         .attr("cy", function(d){ return d[1];})
         .attr("r", boardData.enemySize);

  board.selectAll("circle").data(positions).enter().append('circle')
         .transition()
         .duration(function(d){return d[2];})
         .attr("cx", function(d){ return d[0];})
         .attr("cy", function(d){ return d[1];})
         .attr("r", boardData.enemySize)
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
