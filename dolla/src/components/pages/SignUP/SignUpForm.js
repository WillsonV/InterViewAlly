import React, { useState } from 'react';
import SignUp from './SignUp';
import FormSuccessSignUp from './FormSuccessSignUp';

const SignUpForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <>
      <div className=''>
        
        <div >
          
        </div>
        {!isSubmitted ? (
          <SignUp submitForm={submitForm} />
        ) : (
          <FormSuccessSignUp />
        )}
      </div>
    </>
  );
};

export default SignUpForm;






















