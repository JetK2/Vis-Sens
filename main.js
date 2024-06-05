// Pie Chart Carousel Function
function createPieChartCarousel(containerId, pieId, dotsId, prevButtonId, nextButtonId, dataSets) {
    // Keeps track of which data set os being displayed
    var currentIndex = 0;

// Builds Pie Chart Function
    function PieChart(containerId, title, pos, posV, neg, negV) {
        // Dimensions of pie chart
        var width = 450,
            height = 450,
            margin = 40;

        // Radius
        var radius = Math.min(width, height) / 2 - margin;

        // Select the container appends for the Title
        var container = d3.select("#" + containerId);
        container.append("h1").text(title).attr("class", "chart-title");

        // Append div to turn into svg object
        var svg = container
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        // Data
        var data = {};
        data[pos] = posV;
        data[neg] = negV;

        // total value for percentage calculation
        var total = posV + negV;

        // Colours for Pie Chart
        var color = d3.scaleOrdinal()
            .domain(Object.keys(data))
            .range(["#3EEF6B", "#ff0099"]);

        // Computes the the angles for the charts
        var pie = d3.pie().value(function (d) { return d.value; });
        var data_ready = pie(d3.entries(data));

        // Shapes pie slices
        var arcGenerator = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        // Builds the pie chart
        svg.selectAll("mySlices")
            .data(data_ready)
            .enter()
            .append("path")
            .attr("d", arcGenerator)
            .attr("fill", function (d) { return color(d.data.key); })
            .style("stroke-width", "2px")
            .append("title") 
            .text(function (d) { return d.data.key + ": " + d.data.value; });

        // Annotations
        svg.selectAll("mySlices")
            .data(data_ready)
            .enter()
            .append("foreignObject")
            .attr("width", 100) 
            .attr("height", 50) 
            // centers the annotations
            .attr("transform", function (d) { 
                var [x, y] = arcGenerator.centroid(d);
                return "translate(" + (x - 50) + "," + (y - 25) + ")"; 
            })
            .append("xhtml:div")
            .style("text-align", "center")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .style("font-family", "Verdana")
            .style("background-color", "rgba(255, 255, 255, 0.8)")
            .style("border-radius", "5%")
            .style("line-height", "1.2")
            .style("padding", "2px") 
            .text(function (d) {
                // Calculate percentage for each annotation
                var percentage = ((d.data.value / total) * 100).toFixed(1) + "%";
                return d.data.key + "\n(" + percentage + ")";
            });
    }

// Dots to show how many pie charts there and which pie chart the user is on
    function updateDots() {
        var dotsContainer = d3.select("#" + dotsId);
        dotsContainer.html(""); 

        // Generates number of dots based on dataset length
        for (var i = 0; i < dataSets.length; i++) {
            dotsContainer
                .append("span")
                .attr("class", "dot")
                .classed("active-dot", i === currentIndex)
                // Click event because why not
                .on("click", (function(index) {
                    return function() {
                        currentIndex = index;
                        displayChart(currentIndex);
                    };
                })(i));
        }
    }
// Pie Chart Function
    function displayChart(index) {
        // Clear existing chart
        d3.select("#" + pieId).html("");

        // Grabs current data set
        var ds = dataSets[index];

        // Draws chart
        PieChart(pieId, ds.title, ds.pos, ds.posV, ds.neg, ds.negV);

        // Update dots
        updateDots();
    }

    // Display the first pie chart
    displayChart(currentIndex);

    // Click Event listeners for carousel navigation buttons
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

// Data sets for not owning books
var dataSets1 = [
    { title: "Children who don't own books and enjoy reading", pos: "enjoy", posV: 14.8, neg: "don't enjoy", negV: 85.2 },
    { title: "Children who don't own books and read daily", pos: "read daily", posV: 10.3, neg: "don't read daily", negV: 89.7 },
    { title: "Children who don't own books and self-describe as confident readers", pos: "confident", posV: 47.7, neg: "not confident", negV: 52.3 }
];

// Data sets for owning books
var dataSets2 = [
    { title: "Children who own books and enjoy reading", pos: "enjoy", posV: 46.6, neg: "don't enjoy", negV: 53.4 },
    { title: "Children who own books and read daily", pos: "read daily", posV: 20.3, neg: "don't read daily", negV: 69.7 },
    { title: "Children who own books and self-describe as confident readers", pos: "confident", posV: 80.5, neg: "not confident", negV: 19.5 }
];

// Data set for Book Ownership 2023
var dataSets3 = [
    { title: "How many children own books in 2023", pos: "own books", posV: 92.9, neg: "don't own books", negV: 7.1 }
];

// Call Pie Chart function for Data sets
createPieChartCarousel("carousel1", "pie1", "dots1", "prev1", "next1", dataSets1);
createPieChartCarousel("carousel2", "pie2", "dots2", "prev1", "next1", dataSets2);
createPieChartCarousel("carousel3", "pie3", "dots3", "prev3", "next3", dataSets3);
