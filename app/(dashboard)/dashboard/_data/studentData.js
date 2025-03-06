let studentData = [
  { id: 1, name: "Jenny Wilson", age: "16 Years", email: "abcd@gmail.com", joinDate: "16/02/2025", time: "4:00 pm", status: "Active" },
  { id: 2, name: "Robert Fox", age: "18 Years", email: "robert@gmail.com", joinDate: "15/02/2025", time: "3:30 pm", status: "Inactive" },
  { id: 3, name: "Wade Warren", age: "17 Years", email: "wade@gmail.com", joinDate: "14/02/2025", time: "2:45 pm", status: "Active" },
  { id: 4, name: "Esther Howard", age: "19 Years", email: "esther@gmail.com", joinDate: "13/02/2025", time: "1:15 pm", status: "Active" },
  { id: 5, name: "Leslie Alexander", age: "16 Years", email: "leslie@gmail.com", joinDate: "12/02/2025", time: "11:30 am", status: "Inactive" },
  { id: 6, name: "Cameron Williamson", age: "11 Years", email: "cameron@gmail.com", joinDate: "11/02/2025", time: "10:00 am", status: "Active" }
];

export const getAllStudents = () => {
  return studentData;
};

export const updateStudent = (updatedStudent) => {
  studentData = studentData.map(student => 
    student.id === updatedStudent.id ? updatedStudent : student
  );
  return studentData;
};

export const deleteStudent = (studentId) => {
  studentData = studentData.filter(student => student.id !== studentId);
  return studentData;
}; 