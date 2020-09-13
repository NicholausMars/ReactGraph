import React from 'react';
import { connect } from 'react-redux';
import { createClient } from 'urql';
import Graph from './index';
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const measurementQuery = `
query($input: [MeasurementQuery] ) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements{
      at,
      value,
      unit,
    }
  }
}
`;

class GraphData extends React.Component<any,any>{
  state: any ={initial: [],data: [], metrics: []};
  timer: number;
  constructor(props:any){
    super(props);
    // 4 second update data field
    this.timer = setInterval(this.fourSecondRule, 4000);
  }
  componentDidMount(){  }
  static async getDerivedStateFromProps(props:any, state:any){
    return null;
  }
  shouldComponentUpdate(nextProps: any, nextState: any ){
      return true;
  }
  render(){
    // console.log(this.state)
    return <Graph data={this.state.data}/>;
  }

  componentDidUpdate(){
    if(this.state.metrics.length < this.props.metrics.length){  
       this.ApiCall(this.props.metrics);
    }
  }

  fourSecondRule = () =>{
    // console.log(manipulate(this.props.measurement));
    this.setState({data : [...this.state.initial, ...manipulate(this.props.measurement)]})
  }


  ApiCall = (metrics: string []) =>{
    client.query(
      measurementQuery,{
      input: metrics.map(( metricName :string )=>{ 
        return {metricName, after:Number(new Date()) -(30*60*1000) , before: Number(new Date()) };
      })
    }).toPromise().then(({data : {getMultipleMeasurements}}:any) =>{
      let state: { 
        [metric:string]: {
            name: string,
            utc: boolean,
            columns: string[],
            points: {time:number, value:number, unit:string}[]
        } 
      }  = {};
      for(let metricdata of getMultipleMeasurements){
        state[metricdata.metric] = {
          name: metricdata.metric, 
          utc: true,
          columns: ["time", "value", "unit"], 
          points: metricdata.measurements.map(({at, value, unit}:any)=>{ return {time:at, value, unit}})
          }
      }
      let data = manipulate(state);
      this.setState({initial: data,data, metrics});
  
    });    
  }
}



export default connect(mapStateToProps)(GraphData);

function mapStateToProps(state:any){
  return {
      metrics: state.metric.metrics,
      measurement: state.measurement,
  }
}

function manipulate(measurements:any): {[metric:string]: number, time:number} []{
  let data: {[metric:string]: number, time:number}[] = [];
    for(let metric in measurements){
      let length = measurements[metric].points.length;
        for(let idx = 0; idx < length; idx++){
          if(data[idx] === undefined){
            data.push({[metric]:measurements[metric].points[idx].value,
              time:measurements[metric].points[idx].time});
          }else{
            data[idx]= {...data[idx],[metric]:measurements[metric].points[idx].value}
          }

        }
    }
  return data;
}









// async function  ApiCall(metrics: string []){
//   const {data : {getMultipleMeasurements}}: any = await client.query(
//     measurementQuery,{
//     input: metrics.map(( metricName :string )=>{ 
//       return {metricName, after:Number(new Date()) -(30*60*1000) , before: Number(new Date()) };
//     })
//   }).toPromise().then(({data : {getMultipleMeasurements}}:any) =>{
//     let state: { 
//       [metric:string]: {
//           name: string,
//           utc: boolean,
//           columns: string[],
//           points: {time:number, value:number, unit:string}[]
//       } 
//     }  = {};
//     for(let metricdata of getMultipleMeasurements){
//       state[metricdata.metric] = {
//         name: metricdata.metric, 
//         utc: true,
//         columns: ["time", "value", "unit"], 
//         points: metricdata.measurements.map(({at, value, unit}:any)=>{ return {time:at, value, unit}})
//         }
//     }
//     this.setState({data: state});

//   });

//   // return manipulate(state);
  
// }


// function manipulate(measurements:any): {[metric:string]: number, time:number} []{
//   // console.log(initialData)
//   let data: {[metric:string]: number, time:number}[] = [];
//     for(let metric in measurements){
//       let length = measurements[metric].points.length;
//         for(let idx = 0; idx < length; idx++){
//           if(data[idx] === undefined){
//             // console.log(initia)
//             data.push({[metric]:measurements[metric].points[idx].value,
//               time:measurements[metric].points[idx].time});
//               // data = []
//           }else{
//             data[idx]= {...data[idx],[metric]:measurements[metric].points[idx].value}
//           }

//         }
//     }
//   // console.log(data);
//   return data;
// }

// setState(state);
  
  // .toPromise().then( ({data : {getMultipleMeasurements}}:any) =>{
  //   //  console.log(getMultipleMeasurements);
  //    const state: { 
  //     [metric:string]: {
  //         name: string,
  //         utc: boolean,
  //         columns: string[],
  //         points: {time:number, value:number, unit:string}[]
  //     } 
  //   }  = {};
  // for(let metric of metrics)
    // for(let metricdata of getMultipleMeasurements){
    //   state[metricdata.metric] = {
    //     name: metricdata.metric, 
    //     utc: true,
    //     columns: ["time", "value", "unit"], 
    //     points: metricdata.measurements.map(({at, value, unit}:any)=>{ return {time:at, value, unit}})
    //     }
    // }
    // console.log(manipulate(state));
    // setState(state);
    // results=  manipulate(state);
  // });