import { combineReducers } from 'redux';

import portfolio from './portfolio';
import constituent from './constituent';

export default combineReducers({
  portfolio,
  constituent,
});
