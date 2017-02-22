var data = [
  {
    className: 'germany', // optional can be used for styling
    axes: [
      {axis: "strength", value: 13}, 
      {axis: "intelligence", value: 6}, 
      {axis: "charisma", value: 5},  
      {axis: "dexterity", value: 9},  
      {axis: "luck", value: 2},
      {axis: "dumb", value: 7}
    ]
  },
  {
    className: 'argentina',
    axes: [
      {axis: "strength", value: 6}, 
      {axis: "intelligence", value: 7}, 
      {axis: "charisma", value: 10},  
      {axis: "dexterity", value: 13},  
      {axis: "luck", value: 9},
      {axis: "dumb", value: 7}
    ]
  }
];

var dataset = [];
init();

function init() {
  d3.csv("data/data_test1.csv", function(data) {
    data.forEach(function(d) {  
      for (var prop in d) {
        if(isNaN(d[prop])){ // makes sure we only convert the numbers 
        } else {
          d[prop] = +d[prop]; // makes sure numbers are numbers and not strings 
        };
      };
    });
    dataset = mycsv2json(data);
    var myLegend = createLegend(dataset);
    RadarChart.draw(".chart-container", dataset);
  });
}

function createLegend(data) {
  var legend = [];
  data.forEach(function(d) {
    // d3.select("#legend")
    //   .append("div")
    //     .attr('class', 'checkbox')
    //   .append("label")
    //     .text(d.className)
    //   .append("input")
    //     .attr("checked", true)
    //     .attr('type','checkbox')
    //     .attr('value',d.className);
    $("#legend").append("<div class='checkbox'>\n<label>\n<input name='' onClick='updateSpider(this)' type='checkbox' checked='true' value='"+d.className+"'/>"+d.className+"</label></div>");
    legend.push(d.className);
  });
  return legend; 
};

function updateSpider(input) {
  console.log(input.value);
};

function mycsv2json(csv) {
  var data = []; // the array we will be filling
  csv.forEach(function(value,i){
    var group = csv[i];
    var newGroup = new Object();
    var axes = new Array(); 
    for (var prop in group) {
      var obj = new Object();
      obj.axis = prop;
      obj.value = group[prop];
      axes.push(obj);
    }
    axes.splice(0,1); // remove first item of array (the name of business unit)
    //console.log(axes);
    newGroup.className = group.unités; 
    newGroup['axes'] = axes;
    // console.log(newGroup);
    data.push(newGroup);
  });
  return data;
};
