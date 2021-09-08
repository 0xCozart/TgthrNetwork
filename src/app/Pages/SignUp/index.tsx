import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import IDXBasicProfile from 'app/components/Forms/IDXBasicProfile';

const IDXSignUp = () => {
  return (
    <div>
      <IDXBasicProfile />
    </div>
  );
};

export default IDXSignUp;
