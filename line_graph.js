// set the dimensions and margins of the graph
var margin = {top: 20, right: 30, bottom: 30, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#line")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Read the data
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

// Format the data
data.forEach(function(d) {
  d.date = d3.timeParse("%Y")(d.date);
  d.value = +d.value;
});

// Add X axis --> it is a date format
var x = d3.scaleTime()
  .domain(d3.extent(data, function(d) { return d.date; }))
  .range([0, width]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x))

// Add Y axis
var y = d3.scaleLinear()
  .domain([90, 95])
  .range([height, 0]);

svg.append("g")
  .call(d3.axisLeft(y)
    .ticks((100 - 90) / 1) // Number of ticks to get 0.1 increments
    .tickFormat(d3.format(".1f")) // Format the ticks to one decimal place
  )
  


  
  // Add X axis label
svg.append("text")
.attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
.style("text-anchor", "middle")
.text("Year");

// Add Y axis label
svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 0 - margin.left)
.attr("x", 0 - (height / 2))
.attr("dy", "1em")
.style("text-anchor", "middle")
.text("Ownership (%)");

svg.append("text")
    .attr("x", (width / 2)) // Position the title at the center horizontally
    .attr("y", 0 - (margin.top - 14)) // Position the title above the chart, adjust margin.top as needed
    .attr("text-anchor", "middle")
    .style("font-size", "16px") // Adjust font size as needed
    .text("Book Ownership Trends Over Time"); // Your title text here

    // Add X gridlines
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

// CSS for styling gridlines
svg.selectAll(".grid line")
.style("stroke", "#ddd")
.style("stroke-opacity", 0.7)
.style("shape-rendering", "crispEdges");

// Add the line
svg.append("path")
  .datum(data)
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.value); })
  );
