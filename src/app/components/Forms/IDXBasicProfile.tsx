import React, { useState } from 'react';
import { Button, FileInput, Form, FormField, TextInput } from 'grommet';
import { useSelector } from 'react-redux';
import { RootState } from 'app/redux/rootReducer';
import { IDXBasicProfile } from 'app/redux/idx/idx';
import { ipfsUpload } from 'app/utils/ipfs/ipfsUtils';
import { useDispatch } from 'react-redux';
import { updateIdxDefintion } from 'app/redux/idx/idxSlice';

const IDXBasicProfile = () => {
  const dispatch = useDispatch();
  const idx = useSelector((state: RootState) => state.idx);
  const [name, setName] = useState<string>(idx.name || '');
  const [description, setDescription] = useState<string>(idx.description || '');
  const [image, setImage] = useState<string>(idx.image || '');
  const [background, setBackground] = useState<string>(idx.background || '');
  const handleOnSubmit = () => {
    console.log({ name, description, image, background });
    dispatch(updateIdxDefintion({ definition: 'basicProfile', profile: { name, description, image, background } }));
  };

  return (
    <Form
      onSubmit={() => {
        handleOnSubmit();
      }}
    >
      <FormField name="name" label="Name">
        <TextInput
          //   value={profile.name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
      </FormField>
      <FormField name="description" label="Description">
        <TextInput
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </FormField>
      <FormField name="image" label="Avatar">
        <FileInput
          name="image"
          onChange={async (event) => {
            try {
              const fileList = event.target.files;
              if (fileList && fileList.length > 0) {
                const file = fileList[0];
                const ipfsUrl = await ipfsUpload(file);
                setImage(ipfsUrl);
              }
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </FormField>
      <FormField name="background" label="Background">
        <FileInput
          name="background"
          onChange={async (event) => {
            try {
              const fileList = event.target.files;
              if (fileList && fileList.length > 0) {
                const file = fileList[0];
                const ipfsUrl = await ipfsUpload(file);
                setBackground(ipfsUrl);
              }
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </FormField>
      <Button primary type="submit" label="Submit" />
    </Form>
  );
};

export default IDXBasicProfile;
