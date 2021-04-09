import { GLOBALTYPES } from "./globalTypes";
import { getDataAPI } from "../../utils/fetchData";

export const NOTIFY_TYPES = {
  LOADING: "LOADING_NOTIFICATIONS",
  GET_NOTIFICATIONS: "GET_NOTIFICATIONS",
  CLEAR_NOTIFICATIONS: "CLEAR_NOTIFICATIONS",
};

export const getNotifications = (token) => async (dispatch) => {
  try {
    dispatch({ type: NOTIFY_TYPES.LOADING, payload: true });

    const res = await getDataAPI(`get_user_notifications`, token);


    dispatch({ type: NOTIFY_TYPES.GET_NOTIFICATIONS, payload: res.data.notifications });

    dispatch({ type: NOTIFY_TYPES.LOADING, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const clearNotifications = (token) => async (dispatch) => {
  try {
    dispatch({ type: NOTIFY_TYPES.LOADING, payload: true });

    const res = await getDataAPI(`clear_user_notifications`, token);

    dispatch({
      type: NOTIFY_TYPES.CLEAR_NOTIFICATIONS
    });

    dispatch({ type: NOTIFY_TYPES.LOADING, payload: false });
    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};
