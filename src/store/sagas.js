import { spawn } from 'redux-saga/effects';
// import weatherSaga from '../Features/Weather/saga';
import MetricSaga from './Reducers/saga';
export default function* root() {
  yield spawn(MetricSaga);
}
