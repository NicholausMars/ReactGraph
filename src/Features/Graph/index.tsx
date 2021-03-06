import React, {useMemo,useEffect } from 'react';
import {  useSelector } from 'react-redux';
import ColorHash from 'color-hash';

import {Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { IState } from '../../store';

 
  const CustomTooltip = (props: any) => {
    let { active,  label } = props;
    if (active) {
      return (
        <div style={{width: "max-content", height:"max-content"}}>
          <p >{` time : ${label}`} </p>       
        </div>
      );
    }
  
    return null;
  };


  let getTime = (props: any) => {
    let date = new Date(props.time);
    let time = date.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  };


  
//   export default React.memo (({data: realdata, measurement, metrics}:any) => {
//     // console.log(realdata)
//     // const {  metric, measurement } = useSelector(getMetric);
//     // const data = manipulate(measurement, realdata);

//     if(metrics.length === 0) 
//     return null;

//   return (
//     <LineChart width={window.screen.width -200} height={window.screen.height - 300} data={realdata}>
//     <Legend />
//     <Tooltip  labelStyle={{color:"pink"}} content={<CustomTooltip/>}/>
//     <CartesianGrid strokeDasharray="3" fillOpacity={1} vertical={false} horizontal={false} />
  
//     {
//       metrics.map((items: string)=>(
//       <Line
//       key={items}
//       yAxisId={measurement[items].points[0].unit}
    
//       type="monotone"
//       dataKey={items}
      
//       stroke={new ColorHash().hex(items)}
//       strokeOpacity="1"
    
//       isAnimationActive={false}
//       dot={false}
//       />
       
//       ))
//     }
//     {
//       metrics.map((items: string)=>(
//         <YAxis  key={items + 1} yAxisId={measurement[items].points[0].unit}  dataKey={items} domain={[-80, 1500]} />
//       ))
//     }
//     <XAxis dataKey={getTime} />    
//   </LineChart>
// )
// });
class Graph extends React.Component<any>{
  shouldComponentUpdate(nextprops: any,nextstate:any){
    // console.log(nextprops.data.length, this.props.data.length);
    if(nextprops.data.length  === this.props.data.length)
      return false;
    return true;
  }
  render(){
    let {data: realdata, measurement, metrics}:any = this.props;
    // console.log(this.props.data.length);
    if(metrics.length === 0) 
    return null;

      return (
        <LineChart width={window.screen.width -200} height={window.screen.height - 300} data={realdata}>
        <Legend />
        <Tooltip  labelStyle={{color:"pink"}} content={<CustomTooltip/>}/>
        <CartesianGrid strokeDasharray="3" fillOpacity={1} vertical={false} horizontal={false} />
      
        {
          metrics.map((items: string)=>(
          <Line
          key={items}
          yAxisId={measurement[items].points[0].unit}
        
          type="monotone"
          dataKey={items}
          
          stroke={new ColorHash().hex(items)}
          strokeOpacity="1"
        
          isAnimationActive={false}
          dot={false}
          />
          
          ))
        }
        {
          metrics.map((items: string)=>(
            <YAxis  key={items + 1} yAxisId={measurement[items].points[0].unit}  dataKey={items} domain={[-80, 1500]} />
          ))
        }
        <XAxis dataKey={getTime} />    
      </LineChart>
      )
  }
}
export default Graph;

