import { useState, useCallback } from 'react'

const useForm = (initialValues = {}) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }, [errors])

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target
    handleChange(name, value)
  }, [handleChange])

  const setFieldError = useCallback((field, error) => {
    setErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }, [initialValues])

  const validate = useCallback((validationRules) => {
    const newErrors = {}
    
    Object.keys(validationRules).forEach(field => {
      const rules = validationRules[field]
      const value = values[field]
      
      if (rules.required && (!value || value.trim() === '')) {
        newErrors[field] = `${field} is required`
      } else if (rules.minLength && value && value.length < rules.minLength) {
        newErrors[field] = `${field} must be at least ${rules.minLength} characters`
      } else if (rules.pattern && value && !rules.pattern.test(value)) {
        newErrors[field] = rules.message || `${field} format is invalid`
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [values])

  return {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    handleInputChange,
    setFieldError,
    clearErrors,
    reset,
    validate
  }
}

export default useForm