// Schedule Service - Handle lecture schedule data operations
const STORAGE_KEY = 'schedules';

export const scheduleService = {
  // Get all schedules
  getAllSchedules: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting schedules:', error);
      return [];
    }
  },

  // Get schedule by ID
  getScheduleById: (id) => {
    const schedules = scheduleService.getAllSchedules();
    return schedules.find(schedule => schedule.id === id);
  },

  // Get schedules by teacher ID
  getSchedulesByTeacher: (teacherId) => {
    const schedules = scheduleService.getAllSchedules();
    return schedules.filter(schedule => schedule.teacherId === teacherId);
  },

  // Get schedules by student ID
  getSchedulesByStudent: (studentId) => {
    const schedules = scheduleService.getAllSchedules();
    return schedules.filter(schedule => schedule.studentIds && schedule.studentIds.includes(studentId));
  },

  // Add new schedule
  addSchedule: (schedule) => {
    const schedules = scheduleService.getAllSchedules();
    const newSchedule = {
      id: Date.now().toString(),
      ...schedule,
      createdAt: new Date().toISOString(),
    };
    schedules.push(newSchedule);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    return newSchedule;
  },

  // Update schedule
  updateSchedule: (id, updatedData) => {
    let schedules = scheduleService.getAllSchedules();
    schedules = schedules.map(schedule =>
      schedule.id === id ? { ...schedule, ...updatedData } : schedule
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
    return schedules.find(s => s.id === id);
  },

  // Delete schedule
  deleteSchedule: (id) => {
    let schedules = scheduleService.getAllSchedules();
    schedules = schedules.filter(schedule => schedule.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  },
};
