import IDXBasicProfile from 'app/components/Forms/IDXBasicProfile';
import { matrixClient } from 'app/components/Rooms/Rooms';
import React from 'react';
import { withRouter } from 'react-router-dom';

const IDXSignUp = () => {
  console.log({ matrixClient });
  return (
    <div>
      <IDXBasicProfile />
    </div>
  );
};

export default withRouter(IDXSignUp);
