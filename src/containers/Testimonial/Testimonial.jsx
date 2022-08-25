import React, { useState, useEffect } from "react"
import { HiChevronLeft, HiCheveronRight, HiChevronRight } from "react-icons/hi"
import { motion } from "framer-motion"

import { AppWrap, MotionWrap } from "../../wrapper"
import { urlFor, client } from "../../cleint"
import "./Testimonial.scss"
import { images } from "../../constants"

const _testimonials = [
  {
    name: "Sarah",
    company: "Netflix",
    imageUrl: images.css,
    feedBack: "John is an awesome developer",
  },
  {
    name: "Tobi",
    company: "Texxalabs",
    imageUrl: images.amazon,
    feedBack: "John is an awesome developer",
  },
  {
    name: "Sarah",
    company: "Netflix",
    imageUrl: images.css,
    feedBack: "John is an awesome developer",
  },
]

const _brands = [
  {
    name: "Sarah",
    _id: "Netflix",
    imageUrl: images.css,
    feedBack: "John is an awesome developer",
  },
  {
    name: "Tobi",
    _id: "Texxalabs",
    imageUrl: images.amazon,
    feedBack: "John is an awesome developer",
  },
  {
    name: "Sarah",
    _id: "asdf",
    imageUrl: images.css,
    feedBack: "John is an awesome developer",
  },
]

const Testimonial = () => {
  const [brands, setBrands] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const query = '*[_type == "testimonials"]'
    const brandsQuery = '*[_type == "brands"]'

    client
      .fetch(query)
      .then((data) => setTestimonials(data))
      .catch((e) => setTestimonials(_testimonials))

    client.fetch(brandsQuery).then((data) => {
      setBrands(data)
    })
    // .catch((e) => setBrands(_brands))
  }, [])

  const testIndex = testimonials[currentIndex]

  const handleClick = (index) => setCurrentIndex(index)

  const getImage = (uri) => urlFor(uri)

  return (
    <>
      {testimonials.length > 0 && (
        <>
          <div className='app__testimonial-item app__flex'>
            <img src={urlFor(testIndex.imageUrl)} alt='testimonial' />

            <div className='app__testimonial-content'>
              <p className='p-text'>{testIndex.feedback}</p>

              <div>
                <h4 className='bold-text'>{testIndex.name}</h4>
                <h5 className='bold-text'>{testIndex.company}</h5>
              </div>
            </div>
          </div>

          <div className='app__testimonial-btns app__flex'>
            <div
              className='app__flex'
              onClick={() =>
                handleClick(
                  currentIndex === 0
                    ? testimonials.length - 1
                    : currentIndex - 1
                )
              }
            >
              <HiChevronLeft />
            </div>

            <div
              className='app__flex'
              onClick={() =>
                handleClick(
                  currentIndex === testimonials.length - 1
                    ? 0
                    : currentIndex + 1
                )
              }
            >
              <HiChevronRight />
            </div>
          </div>

          <div className='app__testimonial-brands app__flex'>
            {brands.map((brand) => (
              <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, type: "tween" }}
                key={brand._id}
              >
                <img src={urlFor(brand.imageUrl)} alt={brand.name} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default AppWrap(
  MotionWrap(Testimonial, "app__testimonial"),
  "testimonials",
  "app__primarybg"
)
