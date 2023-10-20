import React, { useEffect, useState } from "react";
import Container from "../Container";
import Title from "../form/Title";
import FormInput from "../form/FormInput";
import Submit from "../form/Submit";
import CustomLink from "../CustomLink";
import FormContainer from "../form/FormContainer";
import { commonFormClasses } from "../../utils/theme";
import { createUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks";

export default function Signup({toast}) {
  
  const navigate = useNavigate()
  
  const { authInfo } = useAuth()
  const { isLoggedIn } = authInfo

  useEffect(() => {
    if(isLoggedIn) return navigate('/')
  }, [isLoggedIn])



  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });


  const validUserId = ({name, email, password}) => {
    if (!name.trim()) return {ok: false, error: "Name is missing"}
    if (!/^[a-z A-Z]+$/.test(name)) return {ok: false, error: "Invalid Name"}
    if (!email.trim()) return {ok: false, error: "Email is missing"}
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return {ok: false, error: "Invalid email"}
    if (!password.trim()) return {ok: false, error: "Password is missing"}
    if (password.length < 8) return {ok: false, error: "Password must be greater than 8 characters"}
    return {ok: true, error: "No error"}

  }

  const { name, email, password } = userInfo;

  const handleChange = ({target}) => {
    const {name, value} = target
    setUserInfo({...userInfo, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {ok, error} = validUserId(userInfo)
    if(!ok) return toast.error(error)
    
    const response = await createUser(userInfo)
    if (response.error) return toast.error(response.error)
    navigate('/auth/emailverification', {
      state: {user: response.user, through: "login"},
      replace: true
    })
  }

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses + " w-96"}>
          <Title>Sign Up</Title>
          <FormInput
            name="name"
            label="Name : "
            placeholder="John Cena"
            type="text"
            value={name}
            onChange={handleChange}
          />
          <FormInput
            name="email"
            label="Email : "
            placeholder="john@gmail.com"
            type="text"
            value={email}
            onChange={handleChange}
          />
          <FormInput
            name="password"
            label="Password : "
            placeholder="*********"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <Submit value="Submit" />
          <div className="flex justify-center">
            <span className="dark:text-dark-subtle text-light-subtle">
              Have an account?{" "}
              <CustomLink to="/auth/signin" className="underline">
                Sign In
              </CustomLink>
            </span>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
}
