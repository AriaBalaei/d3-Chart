const canvas = d3.select('.canva')

var widthOfSVG = window.innerWidth;
var heightOfSVG = window.innerHeight;

const svg = canvas.append('svg')
                  .attr('width', widthOfSVG)
                  .attr('height', heightOfSVG)

const margin = {top:20 ,bottm:70 ,right:20 ,left:70 }

graphWidth = widthOfSVG - margin.left - margin.right
graphHeight = heightOfSVG - margin.top - margin.bottm

//Main canvas
const mainCanvas = svg.append('g')
                      .attr('width', graphWidth / 2)
                      .attr('height', graphHeight / 2) 
                      .attr('transform', `translate(${margin.left},${margin.top + 120})`)

function getCSVData(){
  d3.csv('/Quarterly_All_Forms_FY2023.csv', function(d){
    return d;
  }).then(function(data){
    var nodes = d3.range(data.length)
    .map(function(d){
      var numberOfBaseTypesScale = d3.scaleOrdinal()
                                      .domain(data.map(d => d.category_code))

      var distinctTypesScale =  numberOfBaseTypesScale.domain().length                                            
      var clusters = new Array(distinctTypesScale)

      let i = data[d].category_code
      let r = data[d].received
      d= {
        cluster: i,
        radius: r,
        base_type: data[d].base_type,
        form_type: data[d].form_type,
        description: data[d].description,
        received: data[d].received,
        denied: data[d].denied,
        approved: data[d].approved,
        pending: data[d].pending,
        x: Math.cos(d / data.length * 2 * Math.PI) * 200 + graphWidth / 2 + Math.random(),
        y: Math.sin(d / data.length * 2 * Math.PI) * 200 + graphHeight / 2 + Math.random(),
      };
      if(!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;

      return d;
    })
    console.log(nodes)
  })
}

getCSVData();

