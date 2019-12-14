
import {colorLegend} from './colorLegend.js'
const svg=d3.select('svg');
const height= +svg.attr('height');
const width =+svg.attr('width');
const margin={top:20,right:10,bottom:10,left:10};
const tParser = "%M:%S"
const tFormat=d3.timeFormat("%M:%S")
let parseY;

const myTitle=(id,txt,x)=>d3.selectAll('div')
     .append("text")
     
     .attr('y',margin.top+x)
     .html(txt +"<br/>")
     .attr('id',id);
     
   myTitle('title','Doping in Professional Bicycle Racing',10)
   myTitle('subTitle',"35 Fastest times up Alpe d'Huez",30)
/*load data */
let  xArray=[];
let  yArray=[];
let  xMin;
let  xMax;
let data=[];

const innerHeight = height - margin.top - margin.bottom;
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
 .then(response=>response.json())
 .then(d=>
     {
          for(let i=0;i<d.length;i++ ){
               xArray.push(d[i].Year);
               yArray.push(d[i].Time);
               data.push([xArray[i],
                    yArray[i],
                    d[i].Name+': '+d[i].Nationality,
                    d[i].Doping])
                    } 
     parseY= yArray.map(function(d) {
          return d3.timeParse(tParser)(d)
        });
xMin=d3.min(xArray);
xMax=d3.max(xArray);

render(data)// should be here to work with the above values
     }
 )
 const colorScale= d3.scaleOrdinal()
 .domain(['Riders with doping allegations',
 'No doping allegations'])
 .range(['#194d33','#ff6600'])
 const render=(data)=>{
  
      /* x-axis*/
let xScale = d3.scaleLinear()
     .domain([xMin-1, xMax])
     .range([0, width - 150]);
let xAxis=d3.axisBottom(xScale)
     .tickFormat(d3.format("d"))// will remove coma from years
     .tickPadding(10);
svg.append('g')
     .attr('id','x-axis')
     .attr('transform',`translate(125,${height-100})`)
     .call(xAxis)
     .attr('class','tick');
     /*y-axis */
let yScale = d3.scaleTime()
 
.domain(d3.extent(parseY))   
.range([0, height-110]);
let y_axis = d3.axisLeft()

  .tickFormat(d3.timeFormat("%M:%S"))
  .scale(yScale);
    svg.append("g")
       .attr('id','y-axis')
       .attr("transform", "translate(125, 10)")
       .call(y_axis)
       .attr('class','tick');
       /************************************************************** */
/*************************************DOTs*************************************** */
let gDot=svg.selectAll('g')
.enter()
.append('g')
.data(data);

 const cirDot= gDot
     .enter()
     .append('circle')
          .transition().duration(2000)//dot movement
          .delay((d,i) => i * 5)//dot movement
          .attr("cx",d=>xScale(d[0])+125)
          .attr("cy",d=>yScale(d3.timeParse(tParser)(d[1])))
          .attr("r", 7)
          .attr('class','dot')
          .attr('fill', d=>d[3]==''? colorScale('No doping allegations')
          :colorScale('Riders with doping allegations'))
          .attr('data-xValue',d=>d[0])
          .attr('data-yValue',d=>d3.timeParse(tParser)(d[1]))
          .attr("transform", "translate(0, 10)");

gDot
.merge(cirDot)
      .append('title')
      .text(d=>{return( d[2] +
          '\nYear: '+ d[0]+', Time: '+d[1]+
          '\n\n'+d[3]
      )}) 
      .attr('data-year',d=>d[0])
      .attr('id','tooltip');
/********************* */
    // to align over the shape
    
  // y-text
  svg.append('text')
     .attr('x',-innerHeight/2)
     .attr('y',-99)
     .text('Time in Minutes')
     .attr("transform", `translate(180,-70)rotate(-90)`)
     .attr('text-anchor', 'middle')
     .attr('id','y-txt');
svg.call(
colorLegend,{
    colorScale,
    circleRadius:10,
    spacing:5,
    textOffset:25,
    backRectWidth:210,
    backRectHeight:60,
    marginY:20,
    fullWidth:width
     }
)

 }
