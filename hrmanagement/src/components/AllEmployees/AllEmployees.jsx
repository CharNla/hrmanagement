import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEye, FiEdit2, FiTrash2, FiSearch, FiPlus, FiFilter } from 'react-icons/fi'
import SideMenu from '../SideMenu/Side_menu'
import Topbar from '../Topbar/Topbar'
import FilterModal from '../FilterModal/FilterModal'
import { getEmployees } from '../../database/employeeData'
import './AllEmployees.css'

function AllEmployees() {
  const [employees, setEmployees] = useState([])
  const [filteredEmployees, setFilteredEmployees] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [filters, setFilters] = useState({
    departments: [],
    type: ''
  })
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [employeeToDelete, setEmployeeToDelete] = useState(null)
  const [selectedDepartments, setSelectedDepartments] = useState([])
  const [isMinimized, setIsMinimized] = useState(false)
  const departments = ['Design', 'Development', 'Sales', 'HR', 'PM', 'BA']
  const navigate = useNavigate()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    if (!isLoggedIn) {
      navigate('/login')
      return
    }

    const employeesData = getEmployees()
    setEmployees(employeesData)
    setFilteredEmployees(employeesData)
  }, [navigate])

  useEffect(() => {
    const filtered = employees.filter(employee => {
      // แปลงค่า search เป็นตัวพิมพ์เล็กและตัดช่องว่างที่ไม่จำเป็น
      const searchTerm = search.toLowerCase().trim();
      
      // ถ้าไม่มีคำค้นหา แสดงทั้งหมด
      if (!searchTerm) return true;

      // แปลงวันที่ให้อยู่ในรูปแบบที่ค้นหาได้
      const startDate = new Date(employee.startDate).toLocaleDateString();

      // สร้าง array ของค่าที่ต้องการค้นหา
      const searchableFields = [
        employee.name, // ชื่อ
        employee.nickname, // ชื่อเล่น
        employee.email, // อีเมล
        employee.department, // แผนก
        employee.position, // ตำแหน่ง
        employee.type, // ประเภทการทำงาน
        employee.status, // สถานะ
        startDate // วันที่เริ่มงาน
      ].map(field => (field || '').toString().toLowerCase());

      // ตรวจสอบว่ามีค่าใดค่าหนึ่งตรงกับคำค้นหาหรือไม่
      return searchableFields.some(field => field.includes(searchTerm));
    });

    // กรองตาม department และ type ที่เลือก
    const departmentFiltered = filters.departments.length === 0 
      ? filtered 
      : filtered.filter(emp => filters.departments.includes(emp.department));

    const typeFiltered = !filters.type 
      ? departmentFiltered 
      : departmentFiltered.filter(emp => emp.type === filters.type);

    setFilteredEmployees(typeFiltered);
    setCurrentPage(1); // รีเซ็ตหน้าเมื่อมีการค้นหาใหม่
  }, [search, employees, filters])

  // Get current employees
  const indexOfLastEmployee = currentPage * itemsPerPage
  const indexOfFirstEmployee = indexOfLastEmployee - itemsPerPage
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee)
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
  }

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = () => {
    const updatedEmployees = employees.filter(
      emp => emp.employeeId !== employeeToDelete.employeeId
    )
    setEmployees(updatedEmployees)
    setDeleteModalOpen(false)
    setEmployeeToDelete(null)
  }

  const handleCancelDelete = () => {
    setDeleteModalOpen(false)
    setEmployeeToDelete(null)
  }

  const toggleDepartment = (dep) => {
    setSelectedDepartments(prev => 
      prev.includes(dep) 
        ? prev.filter(d => d !== dep)
        : [...prev, dep]
    )
  }

  const handleReset = () => {
    setSelectedDepartments([])  // reset department
    setFilters({ departments: [], type: '' })  // reset type
  }

  return (
    <div className="dashboard-container">
      <SideMenu isMinimized={isMinimized} onToggleMinimize={() => setIsMinimized(!isMinimized)} />
      <div className="dashboard-main">
        <Topbar 
          pageTitle="All Employees" 
          pageSubtitle="All Employees Information" 
        />
        <motion.div 
          className="dashboard-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="search-actions">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="action-buttons">
              <button
                className="add-employee-btn"
                onClick={() => navigate('/new-employee')}
              >
                <FiPlus className="btn-icon" />
                <span>Add New Employee</span>
              </button>
              <button
                className="filter-btn"
                onClick={() => setIsFilterModalOpen(true)}
              >
                <FiFilter className="btn-icon" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          <div className="employees-table">
            <table>
              <thead>
                <tr>
                  <th>Employee Name (Nickname)</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Position</th>
                  <th>Start Date</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee, index) => (
                  <tr key={index}>
                    <td className="employee-name">
                      <img src={employee.imageUrl} alt={employee.name} />
                      <div className="name-info">
                        <span>{employee.name}</span>
                        <span className="nickname">({employee.nickname})</span>
                      </div>
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>{employee.position}</td>
                    <td>{formatDate(employee.startDate)}</td>
                    <td>{employee.type}</td>
                    <td>
                      <span className={`status ${employee.status.toLowerCase()}`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="actions">
                      <button 
                        title="View" 
                        onClick={() => navigate(`/employee/${employee.employeeId}`)}
                      >
                        <FiEye />
                      </button>
                      <button
                        title="Edit"
                        onClick={() => navigate(`/employee/${employee.employeeId}?edit=true`)}
                      >
                        <FiEdit2 />
                      </button>
                      <button 
                        title="Delete" 
                        onClick={() => handleDeleteClick(employee)}
                        className="delete-btn"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-footer">
            <div className="items-per-page">
              <span>Showing</span>
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>out of {filteredEmployees.length} records</span>
            </div>
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={currentPage === i + 1 ? 'active' : ''}
                >
                  {i + 1}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>

          {isFilterModalOpen && (
            <div className="filter-modal-overlay">
              <div className="filter-modal">
                <h2>Filter</h2>

                <div className="checkbox-group">
                  {departments.map((dep) => (
                    <label key={dep}>
                      <input
                        type="checkbox"
                        checked={selectedDepartments.includes(dep)}
                        onChange={() => toggleDepartment(dep)}
                      />
                      {dep}
                    </label>
                  ))}
                </div>

                <h4>Select Type</h4>
                <div className="checkbox-group">
                  <label>
                    <input 
                      type="radio" 
                      name="type" 
                      value="Office"
                      checked={filters.type === 'Office'}
                      onChange={e => setFilters({...filters, type: e.target.value})}
                    /> 
                    Office
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="type" 
                      value="Remote"
                      checked={filters.type === 'Remote'}
                      onChange={e => setFilters({...filters, type: e.target.value})}
                    /> 
                    Work from Home
                  </label>
                </div>

                <div className="modal-buttons">
                  <button 
                    className="reset-btn" 
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                  <button 
                    className="cancel-btn" 
                    onClick={() => setIsFilterModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    className="apply-btn" 
                    onClick={() => {
                      handleApplyFilters({ departments: selectedDepartments, type: filters.type })
                      setIsFilterModalOpen(false)
                    }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          {deleteModalOpen && (
            <div className="modal-overlay">
              <SideMenu 
                isMinimized={isMinimized} 
                onToggleMinimize={() => setIsMinimized(!isMinimized)} 
                hasPopup={true} 
              />
              <div className="delete-modal">
                <h3>Confirm Delete</h3>
                <p>Are you sure you want to delete employee "{employeeToDelete?.name}"?</p>
                <p>This action cannot be undone.</p>
                <div className="modal-actions">
                  <button 
                    className="cancel-btn" 
                    onClick={handleCancelDelete}
                  >
                    Cancel
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          <FilterModal 
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            onApply={handleApplyFilters}
            sideMenuProps={{
              isMinimized,
              onToggleMinimize: () => setIsMinimized(!isMinimized)
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default AllEmployees