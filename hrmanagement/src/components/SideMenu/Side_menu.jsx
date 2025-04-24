import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { 
  FaUsers, 
  FaSitemap, 
  FaRegClock,
  FaMoneyBillWave,
  FaBriefcase,
  FaUserTie,
  FaCalendarAlt,
  FaRegCalendarCheck,
  FaCog
} from 'react-icons/fa'
import { BsGrid } from 'react-icons/bs'
import { BiSun, BiMoon } from 'react-icons/bi'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'
import './Side_menu.css'

const SideMenu = ({ isMinimized, onToggleMinimize, hasPopup }) => {
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  
  const menuItems = [
    { icon: <BsGrid />, text: 'Dashboard', path: '/dashboard' },
    { icon: <FaUsers />, text: 'All Employees', path: '/employees' },
    { icon: <FaSitemap />, text: 'All Departments', path: '/departments' },
    { icon: <FaRegClock />, text: 'Attendance', path: '/attendance' },
    { icon: <FaMoneyBillWave />, text: 'Payroll', path: '/payroll' },
    { icon: <FaBriefcase />, text: 'Jobs', path: '/jobs' },
    { icon: <FaUserTie />, text: 'Candidates', path: '/candidates' },
    { icon: <FaCalendarAlt />, text: 'Leaves', path: '/leaves' },
    { icon: <FaRegCalendarCheck />, text: 'Holidays', path: '/holidays' },
    { icon: <FaCog />, text: 'Settings', path: '/settings' },
  ]

  const isActive = (path) => {
    // Check if current path is Add New Employee and path is All Employees
    if (location.pathname === '/new-employee' && path === '/employees') {
      return true
    }
    return location.pathname === path
  }

  return (
    <motion.div 
      className={`side-menu ${isMinimized ? 'minimized' : ''} ${hasPopup ? 'has-popup' : ''} ${isDark ? 'dark' : ''}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="logo-container">
        <motion.h1 
          className="logo"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          onClick={onToggleMinimize}
          role="button"
          tabIndex={0}
        >
          <span className="logo-icon">∞</span>
          {!isMinimized && 'HRMS'}
        </motion.h1>
      </div>

      <nav className="menu-items">
        {menuItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Link 
              to={item.path} 
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              title={isMinimized ? item.text : ''}
            >
              <span className="menu-icon">{item.icon}</span>
              {!isMinimized && <span className="menu-text">{item.text}</span>}
            </Link>
          </motion.div>
        ))}
      </nav>

      {!isMinimized && (
        <motion.div 
          className="theme-toggle"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button 
            className={`toggle-btn ${!isDark ? 'active' : ''}`}
            onClick={toggleTheme}
          >
            <BiSun /> Light
          </button>
          <button 
            className={`toggle-btn ${isDark ? 'active' : ''}`}
            onClick={toggleTheme}
          >
            <BiMoon /> Dark
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

export default SideMenu