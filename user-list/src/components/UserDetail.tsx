import React from "react";
import { User } from "../App";
import "../UserDetail.css";

interface Props {
  user: User;
  onClose: () => void;
}

const UserDetails: React.FC<Props> = ({ user, onClose }) => {
  return (
    <div className="user-details">
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Company: {user.company.name}</p>
      <p>
        Address: {user.address.street}, {user.address.city},{" "}
        {user.address.zipcode}
      </p>
    </div>
  );
};

export default UserDetails;
