import React, { useState } from 'react'

const Form = () => {

    const [formField, setFormField] = useState({
        fname: "", lname: "", email: "", pass: "", cnfpass: ""
    });

    const [errors, setErrors] = useState({
        emailErr: "", passErr: "", cnfpassErr: ""
    });

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("inside handle submit")
        if(validateForm(e)){
            console.log("form submitted successfully");
            // const msg = document.createElement("div", {}, "Form Submitted successfully");
            document.getElementById("succfail").innerHTML = "Form Submitted successfully"
        }
        else{
            document.getElementById("succfail").innerHTML = "Something went wrong"
        }
    }

    const validateForm = (e) => {
        const {email, pass, cnfpass} = formField;
        console.log("validate form")
        console.log(formField)
        console.log(cnfpass)

        let valid = true;
        if(!validateEmail(email)){
            setErrors((prevErrors) => ({...prevErrors, emailErr: "Invalid Email "}));
            valid = false;
        }
        else if(pass.length <= 4){
            setErrors((prevErrors) => ({...prevErrors, passErr: "Invalid Pass"}));
            valid = false;
        }
        else if(pass !== cnfpass){
            console.log(pass)
            console.log(cnfpass)
            setErrors((prevErrors) => ({...prevErrors, cnfpassErr: "Password donot match"}));
            valid = false;
        }
        
        return valid;
    }

    const handleInput = (e) => {
        // console.log("inside handle Input fxn ")
        // console.log(e.target.id)

        const {id, value} = e.target;
        // console.log(id);
        // console.log(value);
        setFormField({...formField, [id]: value});

        if(id === "email" && !validateEmail(value)){
            setErrors((prevErrors) => ({...prevErrors, emailErr: "Invalid Email Address"}))
        }
        else if(id === "pass" && value.length <= 4){
            setErrors((prevErrors) => ({...prevErrors, passErr: "Password must be more than 4 characters"}))
        }
        else if(id === "cnfpass" && formField.pass !== value){
            setErrors((prevErrors) => ({...prevErrors, cnfpassErr: "Password is not matched"}))
        }
        else{
            setErrors((prevErrors) => ({...prevErrors, [`${id}Err`]: ""}));
        }
    }


  return (
    <div className='form'>
        <form onSubmit={handleSubmit}>
            <label htmlFor='fname'>First Name</label>
            <input type='text' placeholder='Sajal' id='fname' value={formField.fname} onChange={handleInput} />


            <label htmlFor='lname'>Last Name</label>
            <input type='' placeholder='Gupta' id='lname' value={formField.lname} onChange={handleInput} />


            <label htmlFor='email'>Email</label>
            <input type='email' placeholder='abc@gmail.com' id='email' value={formField.email} onChange={handleInput} />
            <div>{errors.emailErr}</div>

            <label htmlFor='pass'>Password</label>
            <input type='password' placeholder='Password' id='pass' value={formField.pass} onChange={handleInput} />
            <div>{errors.passErr}</div>

            <label htmlFor='cnfpass'>Confirm Password</label>
            <input type='password' placeholder='Confirm Password' id='cnfpass' value={formField.cnfpass} onChange={handleInput} />
            <div>{errors.cnfpassErr}</div>

            <button type='submit'>Register</button>
            <div id='succfail'></div>
        </form>
    </div>
  )
}

export default Form