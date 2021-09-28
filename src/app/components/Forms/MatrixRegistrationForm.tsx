import { getMatrixClient, registerToMatrix } from 'app/utils/matrix/matrix';
import { Button, Form, FormField, TextInput } from 'grommet';
import React, { useState } from 'react';
import { BoxForm } from '../Boxs/index';

const MatrixRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleOnSubmit = async () => {
    const matrix = await getMatrixClient();
    await registerToMatrix(matrix, username, password);
  };
  return (
    <div>
      <h1>Matrix Registration Form</h1>
      <p>This is a form that is used to register a new matrix.</p>
      <Form
        onSubmit={(event) => {
          event.preventDefault();
          handleOnSubmit();
        }}
      >
        <BoxForm style={{ width: '30%', height: '40%' }}>
          <FormField name="username" label="username">
            <TextInput
              //   value={profile.name}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
          </FormField>
          <FormField name="description" label="Description">
            <TextInput
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </FormField>

          <Button primary type="submit" label="Submit" />
        </BoxForm>
      </Form>
    </div>
  );
};

export default MatrixRegistrationForm;
