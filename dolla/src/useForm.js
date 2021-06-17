import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LoginContext } from '././Contexts/LoginContexts';
import { auth } from './firebase';
import { useHistory } from 'react-router-dom';



const useForm = (callback, validate) => {
  const {setUsername}=useContext(LoginContext);

  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
   
    /*if(name=='username')
    {
      setUsername(value); 
    }
    */

  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
    //Do register from Firebase
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((auth) => {
        //succesfully cretaed user email and password
        console.log(auth);
        setUsername(values.username); 
        return auth.user.updateProfile({ displayName: values.username });

        if (auth) {
          useHistory.push("/");
        }
      })
      .catch((error) => alert(error.message));
      

  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;