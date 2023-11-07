import React, { useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import CustomLink from '../CustomLink'
import FormContainer from '../form/FormContainer'
import { commonFormClasses } from '../../utils/theme'
import { useAuth } from '../../hooks'

export default function Signin({toast}) {

  const { handleLogin, authInfo } = useAuth()
  const { isPending } = authInfo

  // creating a state of email, password
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });


  const { email, password } = userInfo;

  // validation process of email, password
  const validUserId = ({email, password}) => {
    if (!email.trim()) return {ok: false, error: "Email is missing"}
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) return {ok: false, error: "Invalid email"}
    if (!password.trim()) return {ok: false, error: "Password is missing"}
    if (password.length < 8) return {ok: false, error: "Password must be greater than 8 characters"}
    return {ok: true, error: "No error"}

  }

  const handleChange = ({target}) => {
    const {name, value} = target
    setUserInfo({...userInfo, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const {ok, error} = validUserId(userInfo)
    if(!ok) return toast.error(error)
    
    const {email, password} = userInfo
    await handleLogin(email, password)
  }


  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses + " w-96"}>
          <Title>Sign In</Title>
          <FormInput value={email} onChange={handleChange} name="email" label="Email : " placeholder="john@email.com" type="text"/>
          <FormInput value={password} onChange={handleChange} name="password" label="Password : " placeholder="*********" type="password"/>
          <Submit value="Submit" busy={isPending}/>
          <div className="flex justify-between">
            {/* CustomLinks are the link with some customization */}
            <CustomLink to="/auth/forgetpassword">Forgot Password</CustomLink>
            <CustomLink to="/auth/signup">Sign Up</CustomLink>
          </div>
        </form>
      </Container>
    </FormContainer>
  )
}
