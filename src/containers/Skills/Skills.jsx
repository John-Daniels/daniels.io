import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ReactToolTip from "react-tooltip"

import { images } from "../../constants"

import { AppWrap } from "../../wrapper"
import { urlFor, client } from "../../cleint"

import "./Skills.scss"

const _skills = [
  {
    name: "React",
    icon: images.react,
  },
  {
    name: "Figma",
    icon: images.figma,
  },
  {
    name: "Nodejs",
    icon: images.node,
  },
  {
    title: "Git",
    icon: images.git,
  },
]

const Skills = () => {
  const [experience, setExperience] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const query = '*[_type == "experiences"]'
    const skillsQuery = '*[_type == "skills"]'

    client
      .fetch(query)
      .then((data) => setExperience(data))
      .catch((e) => setExperience(_skills))

    client
      .fetch(skillsQuery)
      .then((data) => setSkills(data))
      .catch((e) => setExperience(_skills))
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
                <img src={skills.icon} alt={skill.name} />
              </div>

              <p className='p-text'>{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  )
}

export default Skills
