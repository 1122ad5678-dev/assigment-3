// Teacher Service - Handle teacher data operations
const STORAGE_KEY = 'teachers';

export const teacherService = {
  // Get all teachers
  getAllTeachers: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting teachers:', error);
      return [];
    }
  },

  // Get teacher by ID
  getTeacherById: (id) => {
    const teachers = teacherService.getAllTeachers();
    return teachers.find(teacher => teacher.id === id);
  },

  // Add new teacher
  addTeacher: (teacher) => {
    const teachers = teacherService.getAllTeachers();
    const newTeacher = {
      id: Date.now().toString(),
      ...teacher,
      joinDate: new Date().toISOString(),
    };
    teachers.push(newTeacher);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
    return newTeacher;
  },

  // Update teacher
  updateTeacher: (id, updatedData) => {
    let teachers = teacherService.getAllTeachers();
    teachers = teachers.map(teacher =>
      teacher.id === id ? { ...teacher, ...updatedData } : teacher
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
    return teachers.find(t => t.id === id);
  },

  // Delete teacher
  deleteTeacher: (id) => {
    let teachers = teacherService.getAllTeachers();
    teachers = teachers.filter(teacher => teacher.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teachers));
  },
};
