import {
  GET_TODOS,
  DELETE_TODO,
  ADD_TODO,
  UPDATE_TODO,
  FINISH_TODO,
} from '../actions/types';
const INITAL_STATE = {
  type: null,
  payload: [],
};

const todoReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case ADD_TODO:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case UPDATE_TODO:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    case FINISH_TODO:
      return {
        ...state,
        type: action.type,
        payload: action.payload,
      };
    default:
      return state;
  }
};
export default todoReducer;
