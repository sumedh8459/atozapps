var priceChart = {};

function drawPriceGraph(timeFrame) {
  $.get("https://www.albion-online-data.com/api/v2/stats/gold", function (data) {
  
  timestamps = [];
  prices = [];
  
  for (var i = data.length - 1; i > (data.length - timeFrame) - 1; i--) {
    timestamps.push(data[i].timestamp);
    prices.push(data[i].price);
  }
  
  var ctx = document.getElementById('priceChart').getContext('2d');
    
  priceChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: timestamps,
          datasets: [{
              label: 'Gold Price (silver)',
              backgroundColor: '#aaddcc99',
              borderColor: '#aaddcc',
              lineTension: 0,
              data: prices,
              borderWidth: 3
          }]
      },
			options: {
				responsive: true,
				tooltips: {
          enabled: false,
          custom: function(tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table></table>';
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity === 0) {
              tooltipEl.style.opacity = 0;
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);

              var innerHtml = '<thead>';

              titleLines.forEach(function(title) {
                innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';

              bodyLines.forEach(function(body, i) {
                var colors = tooltipModel.labelColors[i];
                var style = 'background:' + colors.backgroundColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px';
                var span = '<span style="' + style + '"></span>';
                innerHtml += '<tr><td>' + span + body + '</td></tr>';
              });
              innerHtml += '</tbody>';

              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = 1;
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            tooltipEl.style.pointerEvents = 'none';
            tooltipEl.style.backgroundColor = '#000000aa';
            }
				},
        legend: {
          labels: {
            fontColor: "#fff"
          }
        },
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					xAxes: [{
						display: true,
            gridLines: {
              display: false
            },
						scaleLabel: {
							display: true,
							labelString: 'Time',
              fontColor: "#fff"
						},
            ticks: {
              display: false
            }
					}],
					yAxes: [{
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Price',
              fontColor: "#fff"
						},
            ticks: {
              fontColor: "#fff"
            }
					}]
				}
			}
  });
});
}

$("#timeInputText").change(function() {
  console.log($("#timeInputText")[0].value);
  drawPriceGraph($("#timeInputText")[0].value);
});

drawPriceGraph($("#timeInputText")[0].value);
