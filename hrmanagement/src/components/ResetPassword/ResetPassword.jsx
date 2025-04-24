import { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import bgDashboard from '../../assets/bgdashboard.png'
import Popup from '../PopupUpdatePass/Popup'
import './ResetPassword.css'

function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const navigate = useNavigate()

  const handleResetPassword = () => {
    setIsPopupOpen(true)
  }

  return (
    <>
      <div className="login-container">
        <div className="login-left">
          <img src={bgDashboard} alt="Dashboard Preview" className="dashboard-preview" />
        </div>
        <div className="login-right">
          <div className="login-form">
            <div className="back-button" onClick={() => window.history.back()}>
              <IoArrowBack className="back-icon" />
              <span>Back</span>
            </div>

            <h2 className="reset-title">Reset Password</h2>
            <p className="reset-subtitle">
              Please enter your new password
            </p>

            <div className="input-group">
              <input
                type="password"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
              />
            </div>

            <button className="login-button" onClick={handleResetPassword}>
              Reset Password
            </button>
          </div>
        </div>
      </div>
      <Popup 
        isOpen={isPopupOpen} 
        onClose={() => setIsPopupOpen(false)}
      />
    </>
  )
}

export default ResetPassword