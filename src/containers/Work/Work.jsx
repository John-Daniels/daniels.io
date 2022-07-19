import React, { useState, useEffect } from "react"
import "./Work.scss"
import { AiFillEye, AiFillGithub } from "react-icons/ai"
import { motion } from "framer-motion"

import { AppWrap, MotionWrap } from "../../wrapper"
import { urlFor, client } from "../../cleint"

import "./Work.scss"
import { images } from "../../constants"

const _works = [
  {
    title: "Modern UI/UX Website",
    description: "A modern UI/UX portfolio website",
    projectLink: "http://localhost:3000",
    codeLink: "https://github.com/John-Daniels",
    imageUrl: images.about01,
    tags: ["UI/UX", "All"],
  },
  {
    title: "Periodic table api",
    description: "A api built on Nodejs to fetch Periodic table data",
    projectLink: "http://localhost:3000",
    codeLink: "https://github.com/John-Daniels",
    imageUrl: images.about02,
    tags: ["UI/UX", "All"],
  },
  {
    title: "Weather app",
    description: "A weather app that fetches data from my own api",
    projectLink: "http://localhost:3000",
    codeLink: "https://github.com/John-Daniels",
    imageUrl: images.about03,
    tags: ["Web App", "All"],
  },
  {
    title: "Cool Mobile app",
    description: "A shopping app named kodershopp",
    projectLink: "http://localhost:3000",
    codeLink: "https://github.com/John-Daniels",
    imageUrl: images.about04,
    tags: ["Mobile App", "All"],
  },
]

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All")
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 })
  const [works, setWorks] = useState([])
  const [filterWork, setFilterWork] = useState([])

  useEffect(() => {
    const query = '*[_type == "works"]'

    client
      .fetch(query)
      .then((data) => {
        setWorks(data)
        setFilterWork(data)
      })
      .catch((e) => {
        setWorks(_works)
        setFilterWork(_works)
      })
  }, [])

  const handleWorkFilter = async (item) => {
    setActiveFilter(item)
    setAnimateCard([{ y: 100, opacity: 0 }])

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }])
    }, 500) // to make the animation slick

    if (item === "All") {
      setFilterWork(works)
    } else {
      setFilterWork(works.filter((work) => work.tags.includes(item)))
    }
  }

  return (
    <>
      <h2 className='head-text'>
        My Creative <span>PortFolio</span> Section
      </h2>
      <div className='app__work-filter'>
        {["UI/UX", "Web App", "Mobile App", "React Js", "All"].map(
          (item, index) => (
            <div
              key={index}
              onClick={() => handleWorkFilter(item)}
              className={`app__work-filter-item app__flex p-text ${
                activeFilter === item ? "item-active" : ""
              }`}
            >
              {item}
            </div>
          )
        )}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className='app__work-portfolio'
      >
        {filterWork.map((work, index) => (
          <div className='app__work-item app__flex' key={index}>
            <div className='app__work-img app__flex'>
              <img src={urlFor(work.imageUrl)} alt={work.name} />

              {/* github and viewing icons */}
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className='app__work-hover app__flex'
              >
                <a
                  href={work.projectLink}
                  target='_blank'
                  rel='noreferer noreferrer'
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [0, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillEye />
                  </motion.div>
                </a>

                <a
                  href={work.codeLink}
                  target='_blank'
                  rel='noreferer noreferrer'
                >
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [0, 0.9] }}
                    transition={{ duration: 0.25 }}
                    className='app__flex'
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className='app__work-content app__flex'>
              <h1 className='bold-text'>{work.title}</h1>
              <p className='p-text' style={{ marginTop: 10 }}>
                {work.description}
              </p>

              <div className='app__work-tag app__flex'>
                <p className='p-text'>{work.tags[0]}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  )
}

export default AppWrap(MotionWrap(Work, "app__works"), "work", "app_primarybg")
