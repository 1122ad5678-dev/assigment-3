import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../services/studentService';
import { teacherService } from '../../services/teacherService';
import { scheduleService } from '../../services/scheduleService';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalSchedules: 0,
  });

  useEffect(() => {
    const students = studentService.getAllStudents();
    const teachers = teacherService.getAllTeachers();
    const schedules = scheduleService.getAllSchedules();

    setStats({
      totalStudents: students.length,
      totalTeachers: teachers.length,
      totalSchedules: schedules.length,
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to University Admin Dashboard</h1>
        <p>Manage students, teachers, and lecture schedules</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👨‍🎓</div>
          <div className="stat-content">
            <h3>Total Students</h3>
            <p className="stat-number">{stats.totalStudents}</p>
            <Link to="/students" className="stat-link">View Details →</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👨‍🏫</div>
          <div className="stat-content">
            <h3>Total Teachers</h3>
            <p className="stat-number">{stats.totalTeachers}</p>
            <Link to="/teachers" className="stat-link">View Details →</Link>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Total Schedules</h3>
            <p className="stat-number">{stats.totalSchedules}</p>
            <Link to="/schedule" className="stat-link">View Details →</Link>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/students/add" className="action-btn">
            <span className="action-icon">➕</span>
            Add Student
          </Link>
          <Link to="/teachers/add" className="action-btn">
            <span className="action-icon">➕</span>
            Add Teacher
          </Link>
          <Link to="/schedule/add" className="action-btn">
            <span className="action-icon">➕</span>
            Add Schedule
          </Link>
          <Link to="/students" className="action-btn">
            <span className="action-icon">📋</span>
            View All Students
          </Link>
          <Link to="/teachers" className="action-btn">
            <span className="action-icon">📋</span>
            View All Teachers
          </Link>
          <Link to="/schedule" className="action-btn">
            <span className="action-icon">📋</span>
            View All Schedules
          </Link>
        </div>
      </div>

      <div className="info-section">
        <h2>Features</h2>
        <ul className="features-list">
          <li>📌 Complete Student Management System - Add, Edit, Delete student records</li>
          <li>👨‍🏫 Teacher Management - Manage teacher information and specializations</li>
          <li>📅 Lecture Scheduling - Create and manage course schedules</li>
          <li>🔍 Advanced Search & Filter - Find records easily</li>
          <li>💾 Local Storage - Data persists in your browser</li>
          <li>📱 Responsive Design - Works on all devices</li>
        </ul>
      </div>
    </div>
  );
}
