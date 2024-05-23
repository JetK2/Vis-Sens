var chartTitle = document.getElementById('title');

function PieChart(containerId, title, pos, posV, neg, negV) {
    // Set the dimensions and margins of the graph
    var width = 450,
        height = 450,
        margin = 40;

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin;

    // Select the container and append an h1 element for the title
    var container = d3.select("#" + containerId);
    container.append("h1").text(title).attr("class", "chart-title");

    // Append the svg object to the div with the provided containerId
    var svg = container
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // Create data object with dynamic keys
    var data = {};
    data[pos] = posV;
    data[neg] = negV;

    // Set the color scale
    var color = d3.scaleOrdinal()
        .domain(Object.keys(data))
        .range(["#5CE1E6", "#ff0099"]);

    // Compute the position of each group on the pie:
    var pie = d3.pie().value(function (d) { return d.value; });
    var data_ready = pie(d3.entries(data));

    // Shape helper to build arcs:
    var arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg.selectAll("mySlices")
        .data(data_ready)
        .enter()
        .append("path")
        .attr("d", arcGenerator)
        .attr("fill", function (d) { return color(d.data.key); })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .append("title") // Add title element for tooltip
        .text(function (d) { return d.data.key + ": " + d.data.value; });

    // Now add the annotation. Use the centroid method to get the best coordinates
    svg.selectAll("mySlices")
        .data(data_ready)
        .enter()
        .append("text")
        .text(function (d) { return d.data.key; })
        .attr("transform", function (d) { return "translate(" + arcGenerator.centroid(d) + ")"; })
        .style("text-anchor", "middle")
        .style("font-size", 20);
}

// Data sets and titles
var dataSets = [
    { title: "Book ownership aged 8-18", pos: "do have a book", posV: 92.9, neg: "don't have a book", negV: 7.1 },
    { title: "Book ownership and reading enjoyment aged 8-18 2023", pos: "of book owning kids enjoy reading", posV: 46.6, neg: "of non book owning kids enjoy", negV: 14.8 },
    { title: "Book ownership and reading daily aged 8-18 2023", pos: "of book owning kids read daily", posV: 30.3, neg: "of non book owning kids read daily", negV: 10.3 },
    { title: "Book ownership and describing themselves as confident readers aged 8-18 2023", pos: "of book owning kids", posV: 80.5, neg: "of non book owning kids", negV: 47.7 },
    { title: "Book ownership and rarely reading 8-18 2023", pos: "of book owning kids rarely read", posV: 12.6, neg: "of non book owning kids rarely read", negV: 50.5 }
];

// Current chart index
var currentIndex = 0;

// Function to display a chart based on index
function displayChart(index) {
    // Clear existing chart
    d3.select("#clothes").html("");

    // Get the current data set
    var ds = dataSets[index];

    

    // Draw the chart
    PieChart("clothes", ds.title, ds.pos, ds.posV, ds.neg, ds.negV);
}

// Display the first chart initially
displayChart(currentIndex);

// Event listeners for navigation buttons
document.getElementById('prev').addEventListener('click', function () {
    if (currentIndex > 0) {
        currentIndex--;
        displayChart(currentIndex);
    }
});

document.getElementById('next').addEventListener('click', function () {
    if (currentIndex < dataSets.length - 1) {
        currentIndex++;
        displayChart(currentIndex);
    }
});


// var title = ["Book ownership aged 8-18", 'Book ownership and reading enjoyment aged 8-18 2023', 'Book ownership and reading daily aged 8-18 2023', 'Book ownership and describing themselves as confident readers aged 8-18 2023', 'Book ownership and rarely reading 8-18 2023']
// for (var i = 0; i < title.length; i++) {
//     var ds = dataSets[i];
// chartTitle.textContent = ds;
// }