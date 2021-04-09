import React from 'react';
import UserCard from "./UserCard";
import moment from 'moment';

const Notifications = ({src}) => {
    return (
      <div style={{ overflowY: "scroll", maxHeight: "520px" }}>
        {src.map((item) => (
          <div
            className="inner-shadow my-3 mx-auto"
            style={{ width: "97%", borderRadius: "5px" }}
          >
            <UserCard notification={item.data} user={item.user}>
              <span className="text-muted">{moment(item.time).fromNow()}</span>
            </UserCard>
          </div>
        ))}
      </div>
    );
}

export default Notifications
