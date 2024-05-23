
function PieChart (pos,posV,neg, negV) {
 // set the dimensions and margins of the graph
 var width = 450;
 height = 450;
 margin = 40;

 // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
 var radius = Math.min(width, height) / 2 - margin;

 // append the svg object to the div called 'my_dataviz'
 var svg = d3
   .select("#clothes")
   .append("svg")
   .attr("width", width)
   .attr("height", height)
   .append("g")
   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

 // Create dummy data
 
 var data = {};
 data[pos] = posV;
 data[neg] = negV;

 // set the color scale
 var color = d3
   .scaleOrdinal()
   .domain(data)
   .range([
     "#5CE1E6",
     "#ff0099",
   ]);
 // Compute the position of each group on the pie:
 var pie = d3.pie().value(function (d) {
   return d.value;
 });
 var data_ready = pie(d3.entries(data));
 // Now I know that group A goes from 0 degrees to x degrees and so on.

 // shape helper to build arcs:
 var arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);

 // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
 svg
   .selectAll("mySlices")
   .data(data_ready)
   .enter()
   .append("path")
   .attr("d", arcGenerator)
   .attr("fill", function (d) {
     return color(d.data.key);
   })
   .attr("stroke", "black")
   .style("stroke-width", "2px")
   .style("opacity", 0.7)
   .append("title") // Add title element for tooltip
   .text(function (d) {
     return d.data.key + ": " + d.data.value; // Display key and value
   });

 // Now add the annotation. Use the centroid method to get the best coordinates
 svg
   .selectAll("mySlices")
   .data(data_ready)
   .enter()
   .append("text")
   .text(function (d) {
     return d.data.key;
   })
   .attr("transform", function (d) {
     return "translate(" + arcGenerator.centroid(d) + ")";
   })
   .style("text-anchor", "middle")
   .style("font-size", 20);

}

PieChart("do have a book", 92.9, "don't have a book", 7.1)

PieChart("book owning kids enjoy reading", 46.6, "non book owning kids enjoy reading", 14.8)