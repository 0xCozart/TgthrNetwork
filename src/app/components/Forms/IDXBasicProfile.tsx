import { ImageSources } from '@ceramicstudio/idx-constants';
import { updateIdx } from 'app/redux/idx/idxSlice';
import { RootState } from 'app/redux/rootReducer';
import { ipfsUploadImage } from 'app/utils/ipfs/ipfsUtils';
import { Button, FileInput, Form, FormField, TextInput } from 'grommet';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BoxForm } from '../Boxs/index';

const IDXBasicProfile = () => {
  const dispatch = useDispatch();
  const idx = useSelector((state: RootState) => state.idx);
  const [name, setName] = useState<string>(idx.name || '');
  const [description, setDescription] = useState<string>(idx.description || '');
  const [image, setImage] = useState<ImageSources>(idx.image);
  const [background, setBackground] = useState<ImageSources>(idx.background || '');

  const handleOnSubmit = () => {
    console.log({ name, description, image, background });
    dispatch(updateIdx({ definition: 'basicProfile', data: { name, description, image, background } }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, type: 'image' | 'background') => {
    try {
      const fileList = e.target.files;
      if (fileList && fileList.length > 0) {
        const file = fileList[0];

        const { cid, metadata } = await ipfsUploadImage(file);
        if (type === 'image') {
          setImage(metadata);
        }
        if (type === 'background') {
          setBackground(metadata);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form
      onSubmit={() => {
        handleOnSubmit();
      }}
    >
      <BoxForm style={{ width: '30%', height: '40%' }}>
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
              await handleImageUpload(event, 'image');
            }}
          />
        </FormField>
        <FormField name="background" label="Background">
          <FileInput
            name="background"
            onChange={async (event) => {
              await handleImageUpload(event, 'background');
            }}
          />
        </FormField>
        <Button primary type="submit" label="Submit" />
      </BoxForm>
    </Form>
  );
};

export default IDXBasicProfile;
