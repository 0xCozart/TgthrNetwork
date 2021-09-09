import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import IDXBasicProfile from 'app/components/Forms/IDXBasicProfile';
import { withRouter } from 'react-router-dom';

const IDXSignUp = () => {
  return (
    <div>
      <IDXBasicProfile />
    </div>
  );
};

export default withRouter(IDXSignUp);
