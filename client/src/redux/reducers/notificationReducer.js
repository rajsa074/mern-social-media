import { NOTIFY_TYPES } from "../actions/notificationAction";

const initialState = {
  loading: false,
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFY_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case NOTIFY_TYPES.GET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...action.payload],
      };

    case NOTIFY_TYPES.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };

    default:
      return state;
  }
};

export default notificationReducer;
