import { useState, useEffect } from 'react';
import { auth } from '../../../firebase';
import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { LoginContext } from './../../../Contexts/LoginContexts';


const useFormLogin=(validate)=>{

  const history=useHistory();
  const {setUsername}=useContext(LoginContext);
    const [values, setValues] = useState({
        email: '',
        password: ''
      });

      const handleChange = e => {
        const { name, value } = e.target;
       setValues({
          ...values,
          [name]: value
        });
        
      };

      const [errors,setErrors]=useState();
      const handleSubmit = e => {
        e.preventDefault();
    
        setErrors(validate(values));
        //setIsSubmitting(true);
 
      //Firebase stuff to login
    auth
    .signInWithEmailAndPassword(values.email,values. password)
    .then((auth) => {
     // alert(auth);
     // console.log(auth);
      setUsername(values.email); 
      history.push("/Booking");
    })
    .catch((error) => alert(error.message));


      };
      


      return { handleChange, handleSubmit, values, errors };

};

export default useFormLogin;