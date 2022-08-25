import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ReactToolTip from "react-tooltip"

import { images } from "../../constants"
import { AppWrap, MotionWrap } from "../../wrapper"
import { urlFor, client } from "../../cleint"
import "./Skills.scss"

const _skills = [
  {
    name: "React",
    icon: images.react,
    color: "edf2f8",
  },
  {
    name: "Figma",
    icon: images.figma,
    color: "edf2f8",
  },
  {
    name: "Nodejs",
    icon: images.node,
    color: "edf2f8",
  },
  {
    name: "Github",
    icon: images.git,
    color: "edf2f8",
  },
]

const _experiences = [
  {
    year: "2021",
    works: [
      {
        name: "Full-Stack developer",
        desc: "I worked remotely as a fullstack developer at fiverr",
        company: "fiverr",
      },
      {
        name: "Full-Stack developer",
        desc: "I worked remotely as a fullstack developer at fiverr",
        company: "fiverr",
      },
    ],
  },
  {
    year: "2022",
    works: [
      {
        name: "Backend developer",
        desc: "I worked remotely as a Backend developer at texxalabs",
        company: "texxalabs",
      },
      {
        name: "Full-Stack developer",
        desc: "I worked remotely as a fullstack developer at fiverr",
        company: "fiverr",
      },
    ],
  },
]

const Skills = () => {
  const [experiences, setExperiences] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const query = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'

    client
      .fetch(query)
      .then((data) => {
        setExperiences(data)
      })
      .catch((e) => setExperiences(_experiences))

    client
      .fetch(skillsQuery)
      .then((data) => {
        console.log(data)

        setSkills(data)
      })
      .catch((e) => setSkills(_skills))
  }, [])

  return (
    <>
      <h2 className='head-text'>Skills & Experience</h2>

      <div className='app__skills-container'>
        <motion.div className='app__skills-list'>
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className='app__skills-item app__flex'
              key={skill.name}
            >
              <div
                className='app__flex'
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon)} alt={skill.name} />
              </div>

              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className='app__skills-exp'>
          {experiences?.map((experience) => (
            <motion.div className='app__skills-exp-item' key={experience.year}>
              <div className='app__skills-exp-year'>
                <p className='bold-text'>{experience.year}</p>
              </div>
              <motion.div className='app__skills-exp-works'>
                {experience?.work?.map((work, index) => (
                  <React.Fragment key={index}>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className='app__skills-exp-work app__flex'
                      data-tip
                      data-for={work.name}
                    >
                      <h4 className='bold-text'>{work.name}</h4>
                      <p className='p-text'>{work.company}</p>
                    </motion.div>
                    <ReactToolTip
                      id={work.name}
                      effect='float'
                      arrowColor='#fff'
                      className='skills-tooltip'
                    >
                      {work.desc}
                    </ReactToolTip>
                  </React.Fragment>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
)
