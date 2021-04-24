import React, { useState } from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field } from 'formik';
import ipfsUpload from '../../utils/ipfs/ipfsUpload';

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

interface SubmitProps {
  onSubmit: any;
}

const IdxBasicProfileInnerForm = (props: SubmitProps & FormikProps<FormValues>) => {
  const { profilePicture, setProfilePicture } = useState('');
  const { profileBanner, setProfileBanner } = useState('');

  const { touched, errors, isSubmitting } = props;

  const onProfilePictureChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    try {
      const ipfsDID = await ipfsUpload([event.target.files]);
      setProfilePicture(ipfsDID);
    } catch (err) {
      console.log(err);
    }
  };

  const onProfileBannerChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    try {
      const ipfsDID = await ipfsUpload([event.target.files]);
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
      <Field
        name="profilePicture"
        as="input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onProfilePictureChange(e);
        }}
      />
      {/* {touched.profilePicture && errors.profilePicture && <div>{errors.profilePicture}</div>} */}
      <Field
        name="profileBanner"
        as="input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onProfileBannerChange(e);
        }}
      />
      {/* {touched.profileBanner && errors.profileBanner && <div>{errors.profileBanner}</div>} */}

      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </Form>
  );
};

const IdxBasicProfileForm = withFormik({
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
    let errors: FormikErrors<FormValues> = {};
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things
  }
})(InnerForm);

export default IdxBasicProfileForm;
