import { useState } from "react"

export default function SignupForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors = {}

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Tên là bắt buộc"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Tên phải có ít nhất 2 ký tự"
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Mật khẩu là bắt buộc"
    } else if (formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số"
    }

    return newErrors
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = validateForm()
    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form after success
      setTimeout(() => {
        setFormData({ name: "", email: "", password: "" })
        setIsSubmitted(false)
      }, 2000)
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-container">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Đăng ký thành công!</h2>
          <p>Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ sớm nhất.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="validation-form">
        <h2 className="form-title">Đăng ký tài khoản</h2>

        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Họ và tên
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`form-input ${errors.name ? "error" : ""}`}
            placeholder="Nhập họ và tên của bạn"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`form-input ${errors.email ? "error" : ""}`}
            placeholder="example@email.com"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Mật khẩu
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={`form-input ${errors.password ? "error" : ""}`}
            placeholder="Nhập mật khẩu"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className={`submit-button ${isSubmitting ? "loading" : ""}`} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Đang xử lý...
            </>
          ) : (
            "Đăng ký"
          )}
        </button>
      </form>
    </div>
  )
}