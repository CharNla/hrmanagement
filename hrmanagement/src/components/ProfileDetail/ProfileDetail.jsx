import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SideMenu from '../SideMenu/Side_menu';
import Topbar from '../Topbar/Topbar';
import { FiEdit2, FiUser, FiBriefcase, FiFileText, FiLock, FiUserCheck, FiCalendar, FiFolder, FiFile, FiCreditCard } from 'react-icons/fi';
import { getEmployees } from '../../database/employeeData';
import attendanceDataRaw from '../../database/attendance.sql?raw';
import projectDataRaw from '../../database/project.sql?raw';
import leaveDataRaw from '../../database/laeve.sql?raw';
import './ProfileDetail.css';

const mainTabs = [
  { key: 'profile', label: 'Profile', icon: <FiUserCheck /> },
  { key: 'attendance', label: 'Attendance', icon: <FiCalendar /> },
  { key: 'projects', label: 'Projects', icon: <FiFolder /> },
  { key: 'leave', label: 'Leave', icon: <FiFile /> },
];

const subTabs = [
  { key: 'personal', label: 'Personal Information', icon: <FiUser /> },
  { key: 'professional', label: 'Professional Information', icon: <FiBriefcase /> },
  { key: 'documents', label: 'Documents', icon: <FiFileText /> },
  { key: 'bank', label: 'Bank Information', icon: <FiCreditCard /> },
  { key: 'account', label: 'Account Access', icon: <FiLock /> },
];

const ProfileDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [activeMainTab, setActiveMainTab] = useState('profile');
  const [activeSubTab, setActiveSubTab] = useState('personal');
  const [employeeData, setEmployeeData] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [attendanceData, setAttendanceData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = () => {
      const employeesData = getEmployees();
      const employee = employeesData.find(emp => emp.employeeId === id);
      
      if (employee) {
        setEmployeeData(employee);
      } else {
        console.error('Employee not found with ID:', id);
      }
    };

    fetchEmployeeData();
  }, [id]);

  useEffect(() => {
    if (employeeData) setEditData(employeeData);
  }, [employeeData]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('edit') === 'true') {
      setIsEditing(true);
    }
  }, [location.search]);

  useEffect(() => {
    setAttendanceData(
      parseAttendance().filter(row => row.employeeId === employeeData?.employeeId)
    );
  }, [employeeData]);

  useEffect(() => {
    setProjectData(
      parseProjects().filter(row => row.employeeId === employeeData?.employeeId)
    );
  }, [employeeData]);

  useEffect(() => {
    setLeaveData(
      parseLeave().filter(row => row.employeeId === employeeData?.employeeId)
    );
  }, [employeeData]);

  const parseAttendance = () => {
    try {
      return JSON.parse(attendanceDataRaw);
    } catch {
      return eval(attendanceDataRaw);
    }
  };

  const parseProjects = () => {
    try {
      return JSON.parse(projectDataRaw);
    } catch {
      return eval(projectDataRaw);
    }
  };

  const parseLeave = () => {
    try {
      return JSON.parse(leaveDataRaw);
    } catch {
      return eval(leaveDataRaw);
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelEdit = () => {
    setEditData(employeeData);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: save to backend/service if needed
    setEmployeeData(editData);
    setIsEditing(false);
  };

  // Personal Information
  const renderPersonalInfo = () => (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <label>First Name</label>
          {isEditing ? (
            <input
              type="text"
              name="firstName"
              value={editData.firstName || editData.name?.split(' ')[0] || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.firstName || employeeData.name?.split(' ')[0] || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Last Name</label>
          {isEditing ? (
            <input
              type="text"
              name="lastName"
              value={editData.lastName || editData.name?.split(' ').slice(1).join(' ') || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.lastName || employeeData.name?.split(' ').slice(1).join(' ') || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Mobile Number</label>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={editData.phone || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.phone || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData.email || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.email || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Date of Birth</label>
          {isEditing ? (
            <input
              type="date"
              name="dob"
              value={editData.dob || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.dob || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Marital Status</label>
          {isEditing ? (
            <input
              type="text"
              name="maritalStatus"
              value={editData.maritalStatus || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.maritalStatus || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Gender</label>
          {isEditing ? (
            <input
              type="text"
              name="gender"
              value={editData.gender || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.gender || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Nationality</label>
          {isEditing ? (
            <input
              type="text"
              name="nationality"
              value={editData.nationality || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.nationality || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Address</label>
          {isEditing ? (
            <input
              type="text"
              name="address"
              value={editData.address || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.address || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>City</label>
          {isEditing ? (
            <input
              type="text"
              name="city"
              value={editData.city || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.city || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>State</label>
          {isEditing ? (
            <input
              type="text"
              name="state"
              value={editData.state || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.state || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>ZIP Code</label>
          {isEditing ? (
            <input
              type="text"
              name="zipCode"
              value={editData.zipCode || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.zipCode || '-'}</p>
          )}
        </div>
      </div>
    </div>
  );

  // Professional Information
  const renderProfessionalInfo = () => (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <label>Employee ID</label>
          {isEditing ? (
            <input
              type="text"
              name="employeeId"
              value={editData.employeeId || ''}
              onChange={handleInputChange}
              className="edit-input"
              disabled // ไม่ควรให้แก้ไข Employee ID
            />
          ) : (
            <p>{employeeData.employeeId || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>User Name</label>
          {isEditing ? (
            <input
              type="text"
              name="userName"
              value={editData.userName || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.userName || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Department</label>
          {isEditing ? (
            <input
              type="text"
              name="department"
              value={editData.department || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.department || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Position</label>
          {isEditing ? (
            <input
              type="text"
              name="position"
              value={editData.position || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.position || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Employee Status</label>
          {isEditing ? (
            <input
              type="text"
              name="status"
              value={editData.status || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.status || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Type</label>
          {isEditing ? (
            <input
              type="text"
              name="type"
              value={editData.type || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.type || '-'}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="documents-container">
      <div className="document-row">
        <div className="document-item">
          <span>Resume.pdf</span>
          <div className="document-actions">
            <button className="view-btn">View</button>
            <button className="download-btn">Download</button>
          </div>
        </div>
      </div>
      <div className="document-row">
        <div className="document-item">
          <span>Certificate.jpg</span>
          <div className="document-actions">
            <button className="view-btn">View</button>
            <button className="download-btn">Download</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankInfo = () => (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <label>Bank Name</label>
          {isEditing ? (
            <input
              type="text"
              name="bankName"
              value={editData.bankName || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.bankName || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Account Holder Name</label>
          {isEditing ? (
            <input
              type="text"
              name="accountHolderName"
              value={editData.accountHolderName || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.accountHolderName || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Account Number</label>
          {isEditing ? (
            <input
              type="text"
              name="accountNumber"
              value={editData.accountNumber || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.accountNumber || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Account Type</label>
          {isEditing ? (
            <input
              type="text"
              name="accountType"
              value={editData.accountType || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.accountType || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Bank Code</label>
          {isEditing ? (
            <input
              type="text"
              name="bankCode"
              value={editData.bankCode || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.bankCode || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Status</label>
          {isEditing ? (
            <input
              type="text"
              name="bankStatus"
              value={editData.bankStatus || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.bankStatus || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Last Updated</label>
          <p>{employeeData.lastUpdated || '-'}</p>
        </div>
      </div>
    </div>
  );

  const renderAccountAccess = () => (
    <div className="info-container">
      <div className="info-row">
        <div className="info-item">
          <label>Email Address</label>
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData.email || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.email || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Slack ID</label>
          {isEditing ? (
            <input
              type="text"
              name="slackId"
              value={editData.slackId || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.slackId || '-'}</p>
          )}
        </div>
      </div>
      <div className="info-row">
        <div className="info-item">
          <label>Skype ID</label>
          {isEditing ? (
            <input
              type="text"
              name="skypeId"
              value={editData.skypeId || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.skypeId || '-'}</p>
          )}
        </div>
        <div className="info-item">
          <label>Github ID</label>
          {isEditing ? (
            <input
              type="text"
              name="githubId"
              value={editData.githubId || ''}
              onChange={handleInputChange}
              className="edit-input"
            />
          ) : (
            <p>{employeeData.githubId || '-'}</p>
          )}
        </div>
      </div>
    </div>
  );

  const renderAttendanceTable = () => (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Break</th>
            <th>Working Hours</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((row, idx) => (
            <tr key={idx}>
              <td>{row.date}</td>
              <td>{row.check_in}</td>
              <td>{row.check_out}</td>
              <td>{row.break}</td>
              <td>{row.working_hours}</td>
              <td>
                <span className={`status-badge ${row.status === 'Present' && (row.working_hours >= '09:00 Hrs') ? 'on-time' : 'late'}`}>
                  {row.status === 'Present'
                    ? (row.working_hours >= '09:00 Hrs' ? 'On Time' : 'Late')
                    : 'Late'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderProjectsTable = () => (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>Finish Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projectData.length > 0 ? projectData.map((row, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{row.projectname}</td>
              <td>{row.startdate ? new Date(row.startdate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : '-'}</td>
              <td>{row.finishdate ? new Date(row.finishdate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' }) : '-'}</td>
              <td>
                <span
                  className={`status-badge ${row.status === 'Completed' ? 'on-time' : 'late'}`}
                  style={row.status === 'Completed'
                    ? { background: '#d1fae5', color: '#10b981' }
                    : { background: '#fff7e6', color: '#eab308' }
                  }
                >
                  {row.status}
                </span>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#aaa' }}>No project data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderLeaveTable = () => (
    <div className="attendance-table-container">
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Duration</th>
            <th>Days</th>
            <th>Reporting Manager</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.length > 0 ? leaveData.map((row, idx) => (
            <tr key={idx}>
              <td>
                {row.startDate
                  ? new Date(row.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' })
                  : '-'}
              </td>
              <td>
                {row.startDate && row.endDate
                  ? `${new Date(row.startDate).toLocaleString('en-US', { month: 'short', day: '2-digit' })} - ${new Date(row.endDate).toLocaleString('en-US', { month: 'short', day: '2-digit' })}`
                  : '-'}
              </td>
              <td>{row.days ? `${row.days} Days` : '-'}</td>
              <td>Mark Willians</td>
              <td>
                <span
                  className={`status-badge ${
                    row.status === 'Approved'
                      ? 'on-time'
                      : row.status === 'Pending'
                      ? 'late'
                      : 'rejected'
                  }`}
                  style={
                    row.status === 'Approved'
                      ? { background: '#d1fae5', color: '#10b981' }
                      : row.status === 'Pending'
                      ? { background: '#fff7e6', color: '#eab308' }
                      : { background: '#fee2e2', color: '#ef4444' }
                  }
                >
                  {row.status}
                </span>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', color: '#aaa' }}>No leave data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const renderActiveSubTabContent = () => {
    switch (activeSubTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'professional':
        return renderProfessionalInfo();
      case 'documents':
        return renderDocuments();
      case 'bank':
        return renderBankInfo();
      case 'account':
        return renderAccountAccess();
      default:
        return null;
    }
  };

  const renderMainTabContent = () => {
    if (activeMainTab === 'profile') {
      return (
        <>
          <div className="profile-tabs">
            {subTabs.map(tab => (
              <button
                key={tab.key}
                className={`tab ${activeSubTab === tab.key ? 'active' : ''}`}
                onClick={() => setActiveSubTab(tab.key)}
              >
                {tab.icon}
                <span style={{ marginLeft: 8 }}>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="profile-content">
            {renderActiveSubTabContent()}
          </div>
        </>
      );
    }
    if (activeMainTab === 'attendance') {
      return renderAttendanceTable();
    }
    if (activeMainTab === 'projects') {
      return renderProjectsTable();
    }
    if (activeMainTab === 'leave') {
      return renderLeaveTable();
    }
    return (
      <div className="profile-content">
        <div style={{ padding: 40, textAlign: 'center', color: '#7c3aed', fontSize: 20 }}>
          Coming Soon...
        </div>
      </div>
    );
  };

  if (!employeeData) {
    return (
      <div className="dashboard-container">
        <SideMenu isMinimized={isMinimized} onToggleMinimize={() => setIsMinimized(!isMinimized)} />
        <div className="dashboard-main">
          <Topbar pageTitle="Employee Profile" pageSubtitle="Loading..." />
          <div className="loading">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <SideMenu isMinimized={isMinimized} onToggleMinimize={() => setIsMinimized(!isMinimized)} />
      <div className={`dashboard-main ${isMinimized ? 'expanded' : ''}`}>
        <Topbar pageTitle="Employee Profile" pageSubtitle="" />
        <div className="profile-header-section">
          <div className="profile-header-info">
            <img 
              src={employeeData.imageUrl || '/path/to/default-avatar.png'} 
              alt="Profile" 
              className="profile-image"
            />
            <div>
              <h2 className="profile-name">{employeeData.name || 'Brooklyn Simmons'}</h2>
              <div className="profile-meta">
                <span className="profile-role">
                  <svg width="18" height="18" style={{verticalAlign: 'middle', marginRight: 4}} fill="none" stroke="#22223b" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 21v-2a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {employeeData.position || 'Project Manager'}
                </span>
                <span className="profile-email">
                  <svg width="18" height="18" style={{verticalAlign: 'middle', marginRight: 4}} fill="none" stroke="#22223b" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 6-10 7L2 6"/></svg>
                  {employeeData.email || 'brooklyn.s@example.com'}
                </span>
              </div>
            </div>
          </div>
          {isEditing ? (
            <div className="edit-action-group">
              <button className="edit-profile-btn save" onClick={handleSave}>
                Save
              </button>
              <button className="edit-profile-btn cancel" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="edit-profile-btn" onClick={handleEditClick} disabled={isEditing}>
              <FiEdit2 className="edit-icon" />
              Edit Profile
            </button>
          )}
        </div>
        <div className="profile-main-content">
          <div className="profile-navigation">
            {mainTabs.map(tab => (
              <button
                key={tab.key}
                className={`nav-item ${activeMainTab === tab.key ? 'active' : ''}`}
                onClick={() => {
                  setActiveMainTab(tab.key);
                  if (tab.key === 'profile') setActiveSubTab('personal');
                }}
              >
                {tab.icon}
                <span style={{ marginLeft: 8 }}>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="profile-tab-content">
            {renderMainTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetail;