import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';

const IDXSignUp = () => {
  const idx = useSelector((state: RootState) => state.idx);

  return <div>SignUp:RootState</div>;
};

export default IDXSignUp;
