// Dimensions for Line Graph
var margin = {top: 20, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Selects HTML element to append.
var svg = d3.select("#line")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Book Ownership Data from 2013-2023
var data = [
  { date: "2013", value: 91.0 },
  { date: "2014", value: 90.4 },
  { date: "2015", value: 91.4 },
  { date: "2016", value: 90.6 },
  { date: "2017", value: 91.0 },
  { date: "2018", value: 91.0 },
  { date: "2019", value: 93.3 },
  { date: "2020", value: 94.3 },
  { date: "2021", value: 94.2 },
  { date: "2022", value: 93.5 },
  { date: "2023", value: 92.9 }
];

// Formats the data into Years if not the years would look like .013 .014 and so on
data.forEach(function(d) {
  d.date = d3.timeParse("%Y")(d.date);
});

// Add X axis in Date Format (referenced https://d3-graph-gallery.com/graph/line_basic.html)
var x = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.date; }))
  .range([0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Add Y axis scale from 90 to 95
var y = d3.scaleLinear()
  .domain([90, 95])
  .range([height, 0]);

svg.append("g")
  .call(d3.axisLeft(y)
  // axis ticks in increments of 1
    .ticks((100 - 90) / 1) 
  )
  
// X axis label
svg.append("text")
.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
.style("text-anchor", "middle")
.text("Year");

// Y axis label
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Ownership (%)");

// Graph Title
svg.append("text")
    .attr("x", (width / 2)) 
    .attr("y", 0 - (margin.top - 14)) 
    .attr("text-anchor", "middle")
    .style("font-size", "16px") 
    .text("Book Ownership Trends Over Time");

// Gridlines to make it easier to the value for each year
// X gridlines  
svg.append("g")
.attr("class", "grid")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x)
  .tickSize(-height)
  .tickFormat("")
);

// Add Y gridlines
svg.append("g")
.attr("class", "grid")
.call(d3.axisLeft(y)
  .ticks((100 - 90) / 1)
  .tickSize(-width)
  .tickFormat("")
);

// CSS for gridlines
svg.selectAll(".grid line")
.style("stroke", "#ddd")
.style("stroke-opacity", 0.7)
.style("shape-rendering", "crispEdges");

// The Line
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
  );
