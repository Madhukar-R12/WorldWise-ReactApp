import React from 'react'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
const BackButton = () => {
  const Navigation = useNavigate('form')
  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        Navigation(-1)
      }}
      type="back"
    >
      &larr; Back
    </Button>
  )
}

export default BackButton
