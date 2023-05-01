import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getMembers, createMember, updateMember } from '../../api/memberData';
// import { createBook, updateBook } from '../../api/bookData';

const initialState = {
  name: '',
  image: '',
  role: '',
  firebaseKey: '',
};

function MemberForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  // eslint-disable-next-line no-unused-vars
  const [member, setMembers] = useState([]);
  const router = useRouter();
  /* You use this to get your user credentials for getting your books and members. We can now do that to get our members from our dropdown. */
  const { user } = useAuth();

  useEffect(() => {
    /* On render, gets our members using our user.uid which is our { user } = useAuth(); right above */
    getMembers(user.uid).then(setMembers);

    /* If this is getting the proprty of object passed into the BookForm function and has a firebaseKey, then it is setting that member obj to our form input (setFormInput) for our edit */
    if (obj.firebaseKey) setFormInput(obj);

    /* I am checking and im going to use this useEffect if the object changes. And if the user changes, im also going to re-run this useEffect. */
  }, [obj, user]);

  const handleChange = (e) => {
    // using the name and the value of your input
    const { name, value } = e.target;
    // to set your form input
    setFormInput((prevState) => ({
    // a copy of prevState with all its keys and values
      ...prevState,
      /* to then set the [name] to "title" and whatever value you're typing into "value" */
      [name]: value,
      /* So in the form below you will have (name="title") and the handleChange will render the Name key to "title" in the form in the DOM in the object. Its relying on the name variable in this current scope to know which value to change in the initualState object above in the global scope. So when you add a value in the form input, the onChange={handleChange} will change the Name key to Title and the pair to the value you entered. So when you look at the object in the DOM, it will say (title="value"); By knowing which key you're affecting, you name it in the form: name="XXX". */
    }));
  };

  /* study this code so you know how to patch the firebaseKey after every submission into the database */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateMember(formInput)
        .then(() => router.push(`/members/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createMember(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateMember(patchPayload).then(() => {
          router.push('/members');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Member</h2>

      <FloatingLabel controlId="floatingInput1" label="Enter Full Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Full Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Add Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          // value is whatever key in your form input you adding value to
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Race Type" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Race Type"
          name="role"
          value={formInput.role}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Car Model" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Car Model"
          name="car"
          value={formInput.car}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON -  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Member</Button>
    </Form>
  );
}

MemberForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    car: PropTypes.string,
    name: PropTypes.string,
    role: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }),
};

MemberForm.defaultProps = {
  obj: initialState,
};

export default MemberForm;
