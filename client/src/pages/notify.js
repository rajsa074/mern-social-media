import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../components/Notifications";
import LoadIcon from "../images/loading.gif";
import { getNotifications, clearNotifications } from '../redux/actions/notificationAction';

const Notify = () => {
    const { auth, notify } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getNotifications(auth.token));
    }, [dispatch, auth.token]);

    const handleClear = () => {
        dispatch(clearNotifications(auth.token));
    }

    return (
      <div>
        <div className="notification_header d-flex justify-content-between">
          <h2>Notifications</h2>
          <button onClick={handleClear} className="me-5 btn-1 outer-shadow hover-in-shadow">
            Clear Notifications
          </button>
        </div>
        
        {notify.loading && (
          <img src={LoadIcon} alt="Loading" className="mx-auto d-block my-3" />
        )}

        <div >
          {notify.notifications.length === 0 ? (
            <h2 className="text-center text-muted my-4">
              No Notifications
            </h2>
          ) : (
            <Notifications src={notify.notifications} />
          )}
        </div>
      </div>
    );
}

export default Notify;
