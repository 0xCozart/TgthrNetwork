import React, { useState } from 'react';
import { Form, FormField, TextInput } from 'grommet';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import { IDXBasicProfile } from 'app/redux/idx/idx';
import { ipfsUpload } from 'app/utils/ipfs/ipfsUtils';
import { getCeramicIdx } from 'app/utils/IDX/IDXConnect/IDXConnect';
import { useDispatch } from 'react-redux';
import { authorizeIDX } from 'app/redux/idx/idxSlice';

const IDXBasicProfile = () => {
  const dispatch = useDispatch();
  const idx = useSelector((state: RootState) => state.idx);
  const [profile, setProfile] = useState<IDXBasicProfile>({ ...idx });
  const handleOnSubmit = () => {
    dispatch(authorizeIDX({ connect: true }));
  };

  return (
    <Form value={profile}>
      <FormField name="name" label="Name">
        <TextInput value={profile.name} />
      </FormField>
      <FormField name="description" label="Description" />
      <FormField name="phone" label="Phone" />
      <FormField name="address" label="Address" />
    </Form>
  );
};
