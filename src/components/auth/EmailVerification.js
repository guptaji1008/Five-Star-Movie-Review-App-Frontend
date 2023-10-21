import React, { useEffect, useRef, useState } from 'react'
import Container from '../Container'
import Title from '../form/Title'
import FormContainer from '../form/FormContainer'
import { commonFormClasses } from '../../utils/theme'
import { useLocation, useNavigate } from 'react-router-dom'
import { resendEmailVerificationToken, verifyUserEmail } from '../../api/auth'
import Submit from '../form/Submit'
import { useAuth } from '../../hooks'

const OTP_LENGTH = 6

export default function EmailVerification({toast}) {

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''))
  const [activeOtpIndex, setActiveOtpIndex] = useState(0)
  const [busy, setBusy] = useState(false)

  const { isAuth, authInfo } = useAuth()
  const { isLoggedIn, profile } = authInfo
  const isVerified = profile?.isVerified

  const inputRef = useRef()
  const navigate = useNavigate()

  const {state} = useLocation()
  const user = state?.user
  const through = state?.through

  
  useEffect(() => {
    if(isVerified) return navigate("/", {state: {message: "Verified successfully"}})
  }, [isVerified])

useEffect(() => {
  if(!user) return navigate("/*")
  if(isLoggedIn && isVerified) return navigate("/", {state: {message: "Verified and Logged In successfully"}})
}, [user, isLoggedIn, isVerified])

  useEffect(() => {
    if (through === "verify") {
      resendOtpButton()
    }
    else if (through === "login") {
      toast.success("OTP has been sent to your email account")
    }
  }, [through])

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1)
  }

  const focusPrevInputField = (index) => {
    if (index === 0) {
      setActiveOtpIndex(0)
    }else {
      setActiveOtpIndex(index - 1)
    }
  }

  const handleOtpChange = ({target}, index) => {
    const {value} = target
    const newOtpArr = otp.map((elem, ind) => ind === index ? elem = value.substring(value.length-1, value.length) : elem)
    setOtp(newOtpArr)
    if (!value) focusPrevInputField(index)
    else focusNextInputField(index)
  }

  const handleKeyDown = ({key}, index) => {
    if (key === "backspace") {
      focusPrevInputField(index)
    }
  }

  const isValidOtp = (arrOtp) => {
    let validOtp
    for (let val of arrOtp) {
      validOtp = !isNaN(parseInt(val))
      if (!validOtp) break
    }
    return validOtp
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    if (!isValidOtp(otp)) {
      setBusy(false)
      return toast.error("Invalid OTP!")
    }
    // Submit Otp : 
    const response = await verifyUserEmail({OTP: otp.join(""), userId: user.id})
    setBusy(false)
    if (response.error) return toast.error(response.error)
    toast.success(response.message)

    localStorage.setItem("auth-token", response.user.token)
    isAuth()
  }

  const resendOtpButton = async () => {
    const {error, message} = await resendEmailVerificationToken(user.id)
    
    if (error) return toast.error(error)

    toast.success(message)

  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [activeOtpIndex])

  return (
    <FormContainer>
      <Container>
        <form onSubmit={handleSubmit} className={commonFormClasses}>
          <div>
            <Title className="mb-2">Enter the OTP to verify your account</Title>
            <p className='text-center dark:text-dark-subtle text-light-subtle mb-2'>OTP has been sent to your email</p>
          </div>
          <div className='flex justify-center items-center space-x-4'>
            {
              otp.map((_, index) => {
                return (
                  <input key={index} type="number"
                  ref={activeOtpIndex === index ? inputRef : null}
                  value={otp[index]}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className='w-12 h-12 border-2 dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-black rounded bg-transparent outline-none text-center dark:text-white text-black font-semibold spin-button-none text-xl'
                  />
                )
              })
            }
          </div>
          <Submit value="Verify Email" busy={busy} />
          <button type='button' onClick={resendOtpButton} className='dark:text-white text-blue-600 hover:underline w-full text-center'>Resend OTP</button>
        </form>
      </Container>
    </FormContainer>
  )
}
