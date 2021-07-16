import React, { useState } from 'react';
import { withFormik, FormikProps, Form, Field } from 'formik';
import { ipfsUpload } from '../../utils/ipfs/ipfsUtils';
import IDXConnect from 'app/utils/IDX/IDXConnect/IDXConnect';

// Component will take in object
// Object key will determine name : value will determine type of field
// what do we do with the logic ->>

// technically only need a basicProfile form and a form to Post on pods

interface FormValues {
  name: string;
  description: string;
  profilePicture: string;
  profileBanner: string;
}

interface FormProps {
  onUpload: typeof ipfsUpload;
  isAuth: boolean;
}

const IdxBasicProfileInnerForm = (props: FormProps & FormikProps<FormValues>) => {
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [profileBanner, setProfileBanner] = useState<string>('');

  const { isSubmitting, onUpload } = props;

  const onProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const image = Array.from(event.target.files);

    try {
      const ipfsDID = await onUpload(image[0]);
      setProfilePicture(ipfsDID);
    } catch (err) {
      console.log(err);
    }
  };

  const onProfileBannerChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    try {
      const ipfsDID = await onUpload(event.target.files);
      setProfileBanner(ipfsDID);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form>
      <Field name="name" />
      {/* {touched.name && errors.name && <div>{errors.name}</div>} */}
      <Field name="description" as="textarea" />
      {/* {touched.description && errors.description && <div>{errors.description}</div>} */}
      <input
        name="profilePicture"
        type="file"
        onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
          await onProfilePictureChange(e);
        }}
        accept="image/png, image/jpeg"
        value={profilePicture}
      />
      {/* {touched.profilePicture && errors.profilePicture && <div>{errors.profilePicture}</div>} */}
      <input
        name="profileBanner"
        // as="input"
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onProfileBannerChange(e);
        }}
        accept="image/png, image/jpeg"
        value={profileBanner}
      />
      {/* {touched.profileBanner && errors.profileBanner && <div>{errors.profileBanner}</div>} */}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

const IdxBasicProfileForm = withFormik<FormProps, FormValues>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    return {
      name: '',
      description: '',
      profilePicture: '',
      profileBanner: ''
    };
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: FormValues) => {
    console.log(values);
    // let errors: FormikErrors<FormValues> = {};
    // return errors;
  },

  handleSubmit: async (values, { props }) => {
    if (props.isAuth)
      // do submitting things
      try {
        const idx = await IDXConnect();
        const basicProfile = idx?.get('basicProfile');
        await idx?.set('basicProfile', {
          name: values.name,
          description: values.description,
          // image: values.profilePicture,
          // background: values.profileBanner,
          ...basicProfile
        });
        console.log('Submitting...');
        console.log({ values });
      } catch (err) {
        console.log(err);
      }
  }
})(IdxBasicProfileInnerForm);

export default IdxBasicProfileForm;
