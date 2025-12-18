import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teacherService } from '../../services/teacherService';
import './TeacherList.css';

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    const data = teacherService.getAllTeachers();
    setTeachers(data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      teacherService.deleteTeacher(id);
      loadTeachers();
    }
  };

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.employeeId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="teacher-list-container">
      <div className="page-header">
        <h1>Teacher Records</h1>
        <Link to="/teachers/add" className="btn btn-primary">
          + Add New Teacher
        </Link>
      </div>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name, employee id, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredTeachers.length === 0 ? (
        <div className="empty-state">
          <p>No teachers found. {!searchTerm && <Link to="/teachers/add">Add one now</Link>}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="teachers-table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id}>
                  <td>{teacher.employeeId}</td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.phone}</td>
                  <td>{teacher.specialization}</td>
                  <td>{teacher.department}</td>
                  <td className="actions">
                    <Link to={`/teachers/edit/${teacher.id}`} className="btn-sm btn-edit">
                      Edit
                    </Link>
                    <button
                      className="btn-sm btn-delete"
                      onClick={() => handleDelete(teacher.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
