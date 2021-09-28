import MatrixRegistrationForm from 'app/components/Forms/MatrixRegistrationForm';
import React from 'react';
import { withRouter } from 'react-router-dom';

const IDXSignUp = () => {
  return (
    <div>
      <MatrixRegistrationForm />
    </div>
  );
};

export default withRouter(IDXSignUp);
