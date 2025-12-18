import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scheduleService } from '../../services/scheduleService';
import { teacherService } from '../../services/teacherService';
import './ScheduleList.css';

export default function ScheduleList() {
  const [schedules, setSchedules] = useState([]);
  const [teachers, setTeachers] = useState({});
  const [filterTeacher, setFilterTeacher] = useState('all');

  useEffect(() => {
    loadSchedules();
    loadTeachers();
  }, []);

  const loadSchedules = () => {
    const data = scheduleService.getAllSchedules();
    setSchedules(data);
  };

  const loadTeachers = () => {
    const allTeachers = teacherService.getAllTeachers();
    const teacherMap = {};
    allTeachers.forEach(teacher => {
      teacherMap[teacher.id] = teacher.name;
    });
    setTeachers(teacherMap);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this schedule?')) {
      scheduleService.deleteSchedule(id);
      loadSchedules();
    }
  };

  const filteredSchedules = filterTeacher === 'all'
    ? schedules
    : schedules.filter(schedule => schedule.teacherId === filterTeacher);

  return (
    <div className="schedule-list-container">
      <div className="page-header">
        <h1>Lecture Schedule</h1>
        <Link to="/schedule/add" className="btn btn-primary">
          + Add New Schedule
        </Link>
      </div>

      <div className="filter-box">
        <label>Filter by Teacher:</label>
        <select value={filterTeacher} onChange={(e) => setFilterTeacher(e.target.value)}>
          <option value="all">All Teachers</option>
          {Object.entries(teachers).map(([id, name]) => (
            <option key={id} value={id}>{name}</option>
          ))}
        </select>
      </div>

      {filteredSchedules.length === 0 ? (
        <div className="empty-state">
          <p>No schedules found. {filterTeacher === 'all' && <Link to="/schedule/add">Add one now</Link>}</p>
        </div>
      ) : (
        <div className="table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Date</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Classroom</th>
                <th>Semester</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.subject}</td>
                  <td>{teachers[schedule.teacherId] || 'Unknown'}</td>
                  <td>{schedule.date}</td>
                  <td>{schedule.startTime}</td>
                  <td>{schedule.endTime}</td>
                  <td>{schedule.classroom}</td>
                  <td>{schedule.semester}</td>
                  <td className="actions">
                    <Link to={`/schedule/edit/${schedule.id}`} className="btn-sm btn-edit">
                      Edit
                    </Link>
                    <button
                      className="btn-sm btn-delete"
                      onClick={() => handleDelete(schedule.id)}
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
