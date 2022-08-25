import React, { useState } from "react"
import { motion } from "framer-motion"
import { AppWrap, MotionWrap } from "../../wrapper"
import { urlFor, client } from "../../cleint"
import { images } from "../../constants"
import "./Footer.scss"

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const { name, email, message } = formData

  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = ({ target: { name: _name, value } }) => {
    setFormData({
      ...formData,
      [_name]: value,
    })
  }

  const handleSubmit = (e) => {
    setLoading(true)

    const contact = {
      _type: "contact",
      name,
      email,
      message,
    }

    client.create(contact).then(() => {
      setLoading(false)
      setIsFormSubmitted(true)
    })
  }

  return (
    <>
      <h2 className='head-text'> Take a coffee & chat with me</h2>

      <div className='app__footer-cards'>
        <div className='app__footer-card'>
          <img src={images.email} alt='email' />
          <a href='mailto:adeyemijohndaniels@gmail.com' className='p-text'>
            {" "}
            adeyemijohndaniels@gmail.com
          </a>
        </div>

        <div className='app__footer-card'>
          <img src={images.mobile} alt='mobile' />
          <a href='tel:+2349025649213' className='p-text'>
            {" "}
            +2349025649213
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <div className='app__footer-form  app__flex'>
          <div className='app__flex'>
            <input
              className='p-text'
              type='text'
              name='name'
              value={name}
              placeholder='Your Name'
              onChange={handleChange}
            />
          </div>

          <div className='app__flex'>
            <input
              className='p-text'
              type='email'
              name='email'
              value={email}
              placeholder='Your Email'
              onChange={handleChange}
            />
          </div>

          <div>
            <textarea
              className='p-text'
              placeholder='Your Message'
              value={message}
              name='message'
              onChange={handleChange}
            ></textarea>
          </div>

          <button type='button' className='p-text' onClick={handleSubmit}>
            {loading ? "Sending" : "Send Message"}
          </button>
        </div>
      ) : (
        <div>
          <h3 className='head-text'>Thank You for getting in touch</h3>
        </div>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
)
