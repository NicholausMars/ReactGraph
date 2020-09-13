import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
// import ReactSelect, { ValueType } from 'react-select';
import Select, {ValueType, ActionMeta, OptionTypeBase} from 'react-select';
import LinearProgress from '@material-ui/core/LinearProgress';
import { actions } from '../../store/Reducers/metric.reducer';
import { actions as actionsMeasurement } from '../../store/Reducers/measurement.reducer';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const query = `
   query{
     getMetrics
   }
`;


// {
//   getMultipleMeasurements(input:[{
//     metricName:"oilTemp",
//     after:1599837838126,
//     before:1599839656836
//   }]){
//     metric,
//     measurements{
//     		at,
//         value
//   	}
//   }
// }
export default () => {
  return (
    <Provider value={client}>
      <Selector />
    </Provider>
  );
};
type OptionType ={
  value: string,
  label:string
}
const Selector = () => {
  // const [selected, setSelectedOption] = React.useState<string>();
  const [{ fetching, error ,data }] = useQuery({query});
  // const [result] = useQuery({
  //   query:measurementQuery,
  //   variables: {
  //     input: []// data["getMetrics"].map(( metricName :string )=>{
  //       // return {metricName, after: Number(new Date()) -(30*60*1000), before: Number(new Date()) };
  //     // })
  //     ,
  //   },
  //   // if we havent recieve the infromation from the first query we dont get the information from the second query
  //   pause: true 
  // });
  const dispatch = useDispatch();

  // const { fetching, error ,data } = result;
  if(fetching) return <LinearProgress/>;


  if(error) return <h1>COULD NO FIND DATA</h1>;

 

  let options: OptionType []= [];
  for(let metric of data.getMetrics){
    options.push({value:metric , label:metric});
  }


  const onChange = (value: ValueType<OptionTypeBase>, actionMeta: ActionMeta<OptionTypeBase>) =>{
    // use dispatch here 
  
  
    switch (actionMeta.action) {
      case'select-option':
        if(actionMeta.option !== undefined)
          dispatch(actions.addMetric(actionMeta.option.label));
            // console.log(actionMeta.option.label)
      
      break;
      // when select the x button
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue !== undefined) {
          dispatch(actions.removeMetric(actionMeta.removedValue.label));
          // console.log(actionMeta.removedValue.label)
        }
        break;
      // remove all from the store
      case 'clear':
       dispatch(actions.removeAllMetric());
        break;
    }
  }
  
  return (
      <Select 
      options={options}
      isMulti
      onChange={onChange}
      />
  );
};

 

