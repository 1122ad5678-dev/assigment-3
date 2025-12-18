import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import StudentList from './pages/Students/StudentList';
import AddStudent from './pages/Students/AddStudent';
import EditStudent from './pages/Students/EditStudent';
import TeacherList from './pages/Teachers/TeacherList';
import AddTeacher from './pages/Teachers/AddTeacher';
import EditTeacher from './pages/Teachers/EditTeacher';
import ScheduleList from './pages/Schedule/ScheduleList';
import AddSchedule from './pages/Schedule/AddSchedule';
import EditSchedule from './pages/Schedule/EditSchedule';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-wrapper">
          <Sidebar />
          <main className="main-content">
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* Students Routes */}
              <Route path="/students" element={<StudentList />} />
              <Route path="/students/add" element={<AddStudent />} />
              <Route path="/students/edit/:id" element={<EditStudent />} />

              {/* Teachers Routes */}
              <Route path="/teachers" element={<TeacherList />} />
              <Route path="/teachers/add" element={<AddTeacher />} />
              <Route path="/teachers/edit/:id" element={<EditTeacher />} />

              {/* Schedule Routes */}
              <Route path="/schedule" element={<ScheduleList />} />
              <Route path="/schedule/add" element={<AddSchedule />} />
              <Route path="/schedule/edit/:id" element={<EditSchedule />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
