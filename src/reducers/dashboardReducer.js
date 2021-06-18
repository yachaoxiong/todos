import { GET_DASHBOARD } from '../actions/types';
const INITAL_STATE = {
  type: null,
  charts: [],
  cards: [],
};

const dashboardReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case GET_DASHBOARD:
      return {
        ...state,
        type: action.type,
        charts: action.charts,
        cards: action.cards,
      };
    default:
      return state;
  }
};
export default dashboardReducer;
