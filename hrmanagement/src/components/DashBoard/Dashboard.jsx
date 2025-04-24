import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaUsers, FaUserPlus, FaRegCalendarCheck, FaProjectDiagram } from 'react-icons/fa'
import { BsThreeDots } from 'react-icons/bs'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="dashboard-container">
      <SideMenu />
      <div className="dashboard-main">
        <Topbar 
          pageTitle="Hello Robert 👋" 
          pageSubtitle="Good morning"
        />
        
        <div className="dashboard-content">
          {/* Stat Cards */}
          <div className="stats-grid">
            <motion.div 
              className="stat-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="stat-header">
                <span className="stat-label">Total Employee</span>
                <FaUsers className="stat-icon" />
              </div>
              <div className="stat-value">560</div>
              <div className="stat-footer">
                <span className="trend positive">+12%</span>
                <span className="update-time">Update: July 15, 2023</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="stat-header">
                <span className="stat-label">Total Applicant</span>
                <FaUserPlus className="stat-icon" />
              </div>
              <div className="stat-value">1050</div>
              <div className="stat-footer">
                <span className="trend positive">+4%</span>
                <span className="update-time">Update: July 14, 2023</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="stat-header">
                <span className="stat-label">Today Attendance</span>
                <FaRegCalendarCheck className="stat-icon" />
              </div>
              <div className="stat-value">470</div>
              <div className="stat-footer">
                <span className="trend negative">-6%</span>
                <span className="update-time">Update: July 14, 2023</span>
              </div>
            </motion.div>

            <motion.div 
              className="stat-card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="stat-header">
                <span className="stat-label">Total Projects</span>
                <FaProjectDiagram className="stat-icon" />
              </div>
              <div className="stat-value">250</div>
              <div className="stat-footer">
                <span className="trend positive">+12%</span>
                <span className="update-time">Update: July 10, 2023</span>
              </div>
            </motion.div>
          </div>

          {/* Calendar and Chart Section */}
          <div className="content-grid">
            <motion.div 
              className="chart-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="section-header">
                <h2>Attendance Overview</h2>
                <select className="period-select">
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                </select>
              </div>
              {/* Add your chart component here */}
            </motion.div>

            <motion.div 
              className="schedule-section"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="section-header">
                <h2>My Schedule</h2>
                <div className="calendar-nav">
                  <button className="nav-btn prev">‹</button>
                  <span>July, 2023</span>
                  <button className="nav-btn next">›</button>
                </div>
              </div>
              <div className="calendar-grid">
                {/* Calendar content */}
              </div>
              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="time">09:30</div>
                  <div className="event">
                    <h4>Practical Task Review</h4>
                    <p>Front-end Developer</p>
                  </div>
                  <BsThreeDots className="more-icon" />
                </div>
                {/* Add more schedule items */}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard