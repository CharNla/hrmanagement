import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiBell, FiChevronDown, FiUser, FiLogOut } from 'react-icons/fi'
import './Topbar.css'
import userImage from '../../assets/profile.png'

function Topbar({ pageTitle = "Dashboard", pageSubtitle = "" }) {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const currentHour = new Date().getHours()
  
  const getGreeting = () => {
    if (currentHour < 12) return 'Good Morning'
    if (currentHour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    // Clear any auth tokens/session
    localStorage.removeItem('auth')
    navigate('/login')
  }

  return (
    <>
      <motion.div 
        className="topbar"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="left-section">
          <h1 className="greeting">{pageTitle}</h1>
          <p className="sub-greeting">{pageSubtitle || getGreeting()}</p>
        </div>

        <div className="right-section">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <button className="notification-btn">
            <FiBell className="bell-icon" />
            <span className="notification-badge">3</span>
          </button>

          <div className="profile-dropdown">
            <button 
              className="profile-trigger"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={userImage} alt="User" className="user-avatar" />
              <div className="user-info">
                <h3 className="user-name">Robert Allen</h3>
                <p className="user-role">HR Manager</p>
              </div>
              <FiChevronDown className={`dropdown-icon ${isDropdownOpen ? 'open' : ''}`} />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div 
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <button onClick={() => navigate('/profile')}>
                    <FiUser />
                    My Profile
                  </button>
                  <button onClick={handleLogout}>
                    <FiLogOut />
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="logout-modal"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button 
                className="logout-btn"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default Topbar