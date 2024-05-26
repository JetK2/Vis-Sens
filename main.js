function createPieChartCarousel(containerId, pieId, dotsId, prevButtonId, nextButtonId, dataSets) {
    var currentIndex = 0;

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

        // Calculate the total value for percentage calculation
        var total = posV + negV;

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
            .style("stroke-width", "2px")
            .append("title") // Add title element for tooltip
            .text(function (d) { return d.data.key + ": " + d.data.value; });

        // Now add the annotation using foreignObject for text wrapping
        svg.selectAll("mySlices")
            .data(data_ready)
            .enter()
            .append("foreignObject")
            .attr("width", 100) // Adjust the width as needed
            .attr("height", 50) // Adjust the height as needed
            .attr("transform", function (d) { 
                var [x, y] = arcGenerator.centroid(d);
                return "translate(" + (x - 50) + "," + (y - 25) + ")"; // Center the foreignObject
            })
            .append("xhtml:div")
            .style("text-align", "center")
            .style("font-size", "14px")
            .style("font-family", "Verdana")
            .style("background-color", "rgba(255, 255, 255, 0.8)")
            .style("border-radius", "5%")
            .style("line-height", "1.2")
            .style("padding", "2px") // Add padding for better text spacing
            .text(function (d) {
                // Calculate percentage
                var percentage = ((d.data.value / total) * 100).toFixed(1) + "%";
                return d.data.key + "\n(" + percentage + ")";
            });
    }

    function updateDots() {
        var dotsContainer = d3.select("#" + dotsId);
        dotsContainer.html(""); // Clear existing dots

        for (var i = 0; i < dataSets.length; i++) {
            dotsContainer
                .append("span")
                .attr("class", "dot")
                .classed("active-dot", i === currentIndex)
                .on("click", (function(index) {
                    return function() {
                        currentIndex = index;
                        displayChart(currentIndex);
                    };
                })(i));
        }
    }

    function displayChart(index) {
        // Clear existing chart
        d3.select("#" + pieId).html("");

        // Get the current data set
        var ds = dataSets[index];

        // Draw the chart
        PieChart(pieId, ds.title, ds.pos, ds.posV, ds.neg, ds.negV);

        // Update dots
        updateDots();
    }

    // Display the first chart initially
    displayChart(currentIndex);

    // Event listeners for navigation buttons
    document.getElementById(prevButtonId).addEventListener('click', function () {
        if (currentIndex > 0) {
            currentIndex--;
            displayChart(currentIndex);
        }
    });

    document.getElementById(nextButtonId).addEventListener('click', function () {
        if (currentIndex < dataSets.length - 1) {
            currentIndex++;
            displayChart(currentIndex);
        }
    });
}

// Data sets for the first carousel
var dataSets1 = [
    { title: "Children who don't own books and enjoy reading", pos: "enjoy", posV: 14.8, neg: "don't enjoy", negV: 85.2 },
    { title: "Children who don't own books and read daily", pos: "read daily", posV: 10.3, neg: "don't read daily", negV: 89.7 },
    { title: "Children who don't own books and self-describe as confident readers", pos: "confident", posV: 47.7, neg: "not confident", negV: 52.3 }
];

// Data sets for the second carousel
var dataSets2 = [
    { title: "Children who own books and enjoy reading", pos: "enjoy", posV: 46.6, neg: "don't enjoy", negV: 53.4 },
    { title: "Children who own books and read daily", pos: "read daily", posV: 20.3, neg: "don't read daily", negV: 69.7 },
    { title: "Children who own books and self-describe as confident readers", pos: "confident", posV: 80.5, neg: "not confident", negV: 19.5 }
];

var dataSets3 = [
    { title: "How many children own books in 2023", pos: "own books", posV: 92.9, neg: "don't own books", negV: 7.1 }
];

// Initialize both pie chart carousels
createPieChartCarousel("carousel1", "pie1", "dots1", "prev1", "next1", dataSets1);
createPieChartCarousel("carousel2", "pie2", "dots2", "prev2", "next2", dataSets2);
createPieChartCarousel("carousel3", "pie3", "dots3", "prev3", "next3", dataSets3);
