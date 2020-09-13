import React, {useMemo,useEffect } from 'react';
import {  useSelector } from 'react-redux';
import ColorHash from 'color-hash';

import {Legend, Tooltip, LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { IState } from '../../store';

  const getMetric = (state: IState) => {
    const { metric, measurement} = state;
  
    return {
      metric,
      measurement
    };
  };
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


  
  export default React.memo (({data: realdata}:any) => {
    // console.log(realdata)
    // const {  metric, measurement } = useSelector(getMetric);
    // const data = manipulate(measurement, realdata);

    // if(metric.metrics.length === 0) 
    // return null;

  return (
    <LineChart width={window.screen.width -200} height={window.screen.height - 300} data={realdata}>
    <Legend />
    <Tooltip  labelStyle={{color:"pink"}} content={<CustomTooltip/>}/>
    <CartesianGrid strokeDasharray="3" fillOpacity={1} vertical={false} horizontal={false} />
  
    {/* {
      // metric.metrics.map((items: string)=>(
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
    } */}
     <Line     
      yAxisId={'%'}
    
      type="monotone"
      dataKey={'flareTemp'}
      
      stroke={'#333'}
      strokeOpacity="1"
    
      isAnimationActive={false}
      dot={false}
      />
      <Line     
      yAxisId={'%'}
    
      type="monotone"
      dataKey={'waterTemp'}
      
      stroke={'#333'}
      strokeOpacity="1"
    
      isAnimationActive={false}
      dot={false}
      />
       <Line     
      yAxisId={'%'}
    
      type="monotone"
      dataKey={'oilTemp'}
      
      stroke={'#333'}
      strokeOpacity="1"
    
      isAnimationActive={false}
      dot={false}
      />
    <YAxis   yAxisId={'%'}  dataKey={'flareTemp'} domain={[-80, 1500]} />
    <YAxis   yAxisId={'%'}  dataKey={'waterTemp'} domain={[-80, 1500]} />
    <YAxis   yAxisId={'%'}  dataKey={'oilTemp'} domain={[-80, 1500]} />
    {/* <YAxis   yAxisId={'%'}  dataKey={'flareTemp'} domain={[-80, 1500]} /> */}
    {/* {
      metric.metrics.map((items: string)=>(
        <YAxis  key={items + 1} yAxisId={measurement[items].points[0].unit}  dataKey={items} domain={[-80, 1500]} />
      ))
    } */}
    <XAxis dataKey={getTime} />    
  </LineChart>
)
});


function manipulate(measurements:any, initialData: any): {[metric:string]: number, time:number} []{
  // console.log(initialData)
  let data: {[metric:string]: number, time:number}[] = [];
    for(let metric in measurements){
      let length = measurements[metric].points.length;
        for(let idx = 0; idx < length; idx++){
          if(data[idx] === undefined){
            // console.log(initia)
            data.push({[metric]:measurements[metric].points[idx].value,
              time:measurements[metric].points[idx].time});
              // data = []
          }else{
            data[idx]= {...data[idx],[metric]:measurements[metric].points[idx].value}
          }

        }
    }
  // console.log(data);
  return data;
}
// function maxUnit(measurements:any): {[unit:string]: number} {
//   let data:{[unit:string]: number} = {};
//     for(let metric in measurements){
//       let length = measurements[metric].points.length;
//         for(let idx = 0; idx < length; idx++){
//           // console.log(measurements[metric].points[idx].unit);
//           if(data[ measurements[metric].points[idx].unit ]  === undefined){
//             data[ measurements[metric].points[idx].unit ] = measurements[metric].points[idx].value ;
//           }else if( data[measurements[metric].points[idx].unit] < measurements[metric].points[idx].value){
//             data[ measurements[metric].points[idx].unit ] = measurements[metric].points[idx].value ;
//           }

//         }
//     }
//   console.log(data);
//   return data;
// }