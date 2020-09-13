// import { reducer as weatherReducer } from '../Features/Weather/reducer';
// import { reducer as DropDownReducer } from '../Features/DropDown/reducer';
// import { reducer as CardsReducer } from '../Features/Cards/reducer';
import  {reducer as metric} from './Reducers/metric.reducer';
import  {reducer as measurement} from './Reducers/measurement.reducer';

export default {
  metric,
  measurement
  // // weather: weatherReducer,
  // // dropdown: DropDownReducer,
  // cards: CardsReducer
};
