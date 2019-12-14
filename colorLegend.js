

export const colorLegend=(selection,props)=>{
const {
    colorScale,
    circleRadius,
    spacing,
    textOffset,
    backRectWidth,
    backRectHeight,
    marginY,
    fullWidth

}=props

const theRect= selection.selectAll('rect')
    .data([null]);
const n= colorScale.domain().length
theRect.enter().append('rect')
.merge(theRect)
.attr('x',fullWidth-backRectWidth)
.attr('y',spacing+circleRadius*n-marginY)
.attr('rx',circleRadius)
.attr('width',backRectWidth)
.attr('height',backRectHeight)
.attr('id','rectK')


const groups =    selection.selectAll('.gk')
    .data(colorScale.domain())
    .attr('id','legend');
   
const groupEnter=  groups
   .enter().append('g');
          
groupEnter // we should statrt it here to avoid overlap
   .merge(groups )
     .attr('transform',(d, i)=>`translate(${fullWidth-backRectWidth+15},
        ${i*(spacing+circleRadius*n)+marginY})`);      
groups.exit().remove();

groupEnter
    .append('circle')          
     .merge(groups.select('.k') )
        .attr('fill',colorScale)
        .attr('r',circleRadius)
        .attr('class','k')
groupEnter
        .append('text')          
         .merge(groups.select('text') )
         .text(d=>d)
         .attr('x', textOffset)
         .attr('class','txtK')
}