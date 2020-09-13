import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';

import Wrapper from './components/Wrapper';

import DropDown from './Features/DropDown';
// import SimpleCard from './components/Card';
import SimpleCard from './Features/Cards';
import GraphData from './Features/Graph/GraphData';
import {  createClient } from 'urql';
import { IState } from './store';
import "./global.css";

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


const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});
const getMetric = (state: IState) => {
  const { metric, measurement} = state;

  return {
    metric,
    measurement
  };
};

function App (){

      return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Wrapper>
             {/*<Header />*/}
             <div className="top__container">
              <div className="cards">
              {/*to be dynamically inserted into the applicaiton*/}
                {/*<SimpleCard metric={"flareTemp"} value={90.32}/>*/}
                <SimpleCard />
              
              </div>
              <div className="search">
               <DropDown/>
    
               {/*<CustomizedHook/>*/}
               </div>
             </div>
             <div>
                  <GraphData />
             </div>
            <ToastContainer />
          </Wrapper>
        </Provider>
      </MuiThemeProvider>
    );
    

}


export default App;


 // state = {data: [], loading: false};
    // componentDidMount(){
    //   let metrics: string[] = [
    //     "flareTemp",
    //     "waterTemp",
    //     "casingPressure",
    //     "oilTemp",
    //     "tubingPressure",
    //     "injValveOpen"
    //   ];
    //   client.query(
    //     measurementQuery,{
    //     input: metrics.map(( metricName :string )=>{ 
    //       return {metricName, after:Number(new Date()) -(30*60*1000) , before: Number(new Date()) };
    //     })
    //   }).toPromise().then( ({data : {getMultipleMeasurements}}:any) =>{
    //     //  console.log(getMultipleMeasurements);
    //      const state: { 
    //       [metric:string]: {
    //           name: string,
    //           utc: boolean,
    //           columns: string[],
    //           points: {time:number, value:number, unit:string}[]
    //       } 
    //     }  = {};
    //      setData(getMultipleMeasurements);
    //   for(let metric of metrics)
    //     for(let metricdata of getMultipleMeasurements){
    //       state[metricdata.metric] = {
    //         name: metricdata.metric, 
    //         utc: true,
    //         columns: ["time", "value", "unit"], 
    //         points: metricdata.measurements.map(({at, value, unit}:any)=>{ return {time:at, value, unit}})
    //         }
    //     }
    //     // console.log(manipulate(state))
    //     this.setState({data: manipulate(state), loading: true});
    //   });
    // }