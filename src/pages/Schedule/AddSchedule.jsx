import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { scheduleService } from '../../services/scheduleService';
import { teacherService } from '../../services/teacherService';
import './ScheduleForm.css';

export default function AddSchedule() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    teacherId: '',
    date: '',
    startTime: '',
    endTime: '',
    classroom: '',
    semester: '',
    topic: '',
  });

  useEffect(() => {
    const allTeachers = teacherService.getAllTeachers();
    setTeachers(allTeachers);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.teacherId || !formData.date || !formData.startTime || !formData.endTime) {
      alert('Please fill in all required fields');
      return;
    }
    scheduleService.addSchedule(formData);
    alert('Schedule added successfully!');
    navigate('/schedule');
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>Add New Lecture Schedule</h1>
        <Link to="/schedule" className="btn btn-secondary">
          Back to List
        </Link>
      </div>

      <form className="schedule-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Subject *</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="e.g., Data Structures"
            />
          </div>
          <div className="form-group">
            <label>Teacher *</label>
            <select name="teacherId" value={formData.teacherId} onChange={handleChange} required>
              <option value="">Select Teacher</option>
              {teachers.map(teacher => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Semester *</label>
            <select name="semester" value={formData.semester} onChange={handleChange} required>
              <option value="">Select Semester</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Time *</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Time *</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Classroom</label>
          <input
            type="text"
            name="classroom"
            value={formData.classroom}
            onChange={handleChange}
            placeholder="e.g., Room 101, Lab 5"
          />
        </div>

        <div className="form-group">
          <label>Topic</label>
          <textarea
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            placeholder="Lecture topic/description"
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Add Schedule
          </button>
          <Link to="/schedule" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
