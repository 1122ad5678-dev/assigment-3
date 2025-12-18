// Student Service - Handle student data operations
const STORAGE_KEY = 'students';

export const studentService = {
  // Get all students
  getAllStudents: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting students:', error);
      return [];
    }
  },

  // Get student by ID
  getStudentById: (id) => {
    const students = studentService.getAllStudents();
    return students.find(student => student.id === id);
  },

  // Add new student
  addStudent: (student) => {
    const students = studentService.getAllStudents();
    const newStudent = {
      id: Date.now().toString(),
      ...student,
      enrollmentDate: new Date().toISOString(),
    };
    students.push(newStudent);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return newStudent;
  },

  // Update student
  updateStudent: (id, updatedData) => {
    let students = studentService.getAllStudents();
    students = students.map(student =>
      student.id === id ? { ...student, ...updatedData } : student
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
    return students.find(s => s.id === id);
  },

  // Delete student
  deleteStudent: (id) => {
    let students = studentService.getAllStudents();
    students = students.filter(student => student.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  },
};
