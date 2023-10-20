import React, { useEffect, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormInput from '../form/FormInput'
import Submit from '../form/Submit'
import FormContainer from '../form/FormContainer'
import { commonFormClasses } from '../../utils/theme'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ImSpinner3 } from 'react-icons/im'
import { resetPassword, verifyPasswordResetToken } from '../../api/auth'

export default function ConfirmPassword({toast}) {

  const navigate = useNavigate()

  const [isVerifying, setIsVerifying] = useState(true)
  const [isValid, setIsValid] = useState(true)
  const [password, setPassword] = useState({
    newPassword: "", confirmPassword: ""
  })

  const { newPassword, confirmPassword } = password

  const handleChange = ({ target }) => {
    const { value, name } = target
    setPassword({ ...password, [name]: value })
  }

  const [searchParams] = useSearchParams()

  const token = searchParams.get('token')
  const id = searchParams.get('id')

  const isValidToken = async () => {
    const { error, valid } = await verifyPasswordResetToken(token, id)
    setIsVerifying(false)

    if (error) {
      setIsValid(false)
      navigate("/auth/resetpassword", { replace: true })
      return toast.error("Invalid Request !")
    }

    if (!valid) {
      setIsValid(false)
      return navigate("/auth/resetpassword", { replace: true })
    }

    setIsValid(true)

  }

  useEffect(() => {
    isValidToken()
  }, [])

  const isValidPassword = (pass, cPass) => {

    if (!pass.trim()) return { status: false, error: "Password is missing" }
    if (pass.trim().length < 8) return { status: false, error: "Password must have 8 characters" }
    if (pass !== cPass) return { status: false, error: "Password does not match" }
    return { status: true, error: "no error" }

  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    const { status, error } = isValidPassword(newPassword, confirmPassword)

    if (!status) return toast.error(error)

    const { error: errorMessage, message } = await resetPassword({ newPassword, userId: id, token })

    if (errorMessage) return toast.error(errorMessage)
    toast.success(message)
    setTimeout(() => {
      navigate('/auth/signin', { replace: true })
    }, 3000)

  }


  if (isVerifying) return (
    <FormContainer>
      <Container className="flex justify-center text-4xl dark:text-white text-primary space-x-6">
        <h1>Please wait while we verify</h1>
        <div><ImSpinner3 className='animate-spin' /></div>
      </Container>
    </FormContainer>
  )

  if (!isValid) return (
    <FormContainer>
      <Container className="text-4xl dark:text-white text-primary space-x-6">
        <h1>Sorry, token is invalid !</h1>
      </Container>
    </FormContainer>
  )

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses}>
          <Title>Enter New Password</Title>
          <FormInput className="mb-5" name="newPassword" value={newPassword} onChange={handleChange} label="Password : " placeholder="********" type="password" />
          <FormInput className="mb-5" name="confirmPassword" value={confirmPassword} onChange={handleChange} label="Confirm Password : " placeholder="John@123" type="text" />
          <Submit value="Reset Password" />
        </form>
      </Container>
    </FormContainer>
  )
}
