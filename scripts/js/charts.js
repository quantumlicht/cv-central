// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

   // Create the data table.
   var data = new google.visualization.DataTable();
   data.addColumn('string', 'Topping');
   data.addColumn('number', 'Slices');
   data.addRows([
      ['Javascript', 4 ],
      ['Python', 3],
      ['Apache', 0.5],
      ['Shell script', 1],
      ['HTML/CSS', 1.5]
   ]);

  // Set chart options
   var options = {
      'chartArea': {
         top: 0,
         left: 0,
         widht: '100%',
         height: '100%',
      },
      'backgroundColor': 'transparent',
      'tooltip': {
         text: 'percentage'
      },
      'legend': {
         alignment: 'center',
         position:'left',
         textStyle: {
            color: 'red',
            fontSize: '1em'
         }
      },
      'pieSliceBorderColor': 'white',
      'pieSliceText': 'percentage',
      'pieSliceTextStyle': {
         fontSize: '1em'
      }

   };

   // Instantiate and draw our chart, passing in some options.
   var chart = new google.visualization.PieChart(document.getElementById('chart'));
   chart.draw(data, options);
}
