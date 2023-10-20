import React, { useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonFormClasses } from "../../utils/theme";
import Submit from "../form/Submit";
import { forgotPassword } from "../../api/auth";

export default function ForgetPassword({toast}) {
  const [email, setEmail] = useState("");

  const isValidEmail = (email) => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return false
    return true
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    if (!isValidEmail(email)) return toast.error("Invalid Email!")

    const { error, message } = await forgotPassword(email)

    if (error) return toast.error(error)
    
    return toast.success(message)
  }

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses + " w-96"}>
          <Title>Enter Your Email</Title>
          <FormInput
            className="mb-5"
            name="email"
            label="Email : "
            placeholder="john@email.com"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Submit value="Send Link" />
          <div className="flex justify-between">
            <CustomLink to="/auth/signin">Sign In</CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
