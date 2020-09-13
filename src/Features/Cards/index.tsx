import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { actions } from '../../store/Reducers/measurement.reducer';
import { Provider, createClient,  useSubscription,  subscriptionExchange } from 'urql';
import SimpleCard from '../../components/Card';
import { IState } from '../../store';

/**
 *
 * API from vender
 *
  */
 const subscriptionClient = new SubscriptionClient('ws://react.eogresources.com/graphql', {});

 const client = createClient({
   url: 'https://react.eogresources.com/graphql',
   exchanges: [subscriptionExchange({ forwardSubscription: subs => subscriptionClient.request(subs) })],
 });
 
 const measurement_subscription_query = `
subscription{
    newMeasurement{
        metric
        value
        unit
        at
    }
}
`;

export default () => {
  return (
    <Provider value={client}>
      <Cards    />
    </Provider>
  );
};

const handleSubscription = (measurements: any = [], response: any) => {
  // console.log(measurements)
  return [ ...measurements, response.newMeasurement];
};

const getMetric = (state: IState) => {
  const { metric, measurement} = state;

  return {
    metric,
    measurement
  };
};
// {collectDataValue}:any
const Cards = ():JSX.Element => {

  const {  metric, measurement } = useSelector(getMetric);
  const dispatch = useDispatch();

  const [{data, error}] = useSubscription({ query: measurement_subscription_query }, handleSubscription);
  useEffect(() => {
    if (error) {
      dispatch(actions.ErrorReceived({ error: error.message }));
      return;
    }
    if (!data)return;
    //pass data to parent element 
    
      dispatch(actions.addLatestMetric( data[data.length - 1]));
  }, [dispatch, data, error]);

  return (<>
  {metric.metrics.map((one_metric, key)=>
  <SimpleCard key={key}  metric={one_metric} 
  value={(measurement[one_metric] !== undefined)?
   measurement[one_metric]
   .points[measurement[one_metric].points.length -1].value: 0 }/>)}
  </>);
};
