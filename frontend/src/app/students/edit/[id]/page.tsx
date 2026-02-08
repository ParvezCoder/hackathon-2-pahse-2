
import { StudentForm } from "@/components/students/StudentForm";
import { updateStudent } from "@/lib/actions";
import { Student } from "@/lib/definitions";
import { notFound } from "next/navigation";

export const metadata = {
    title: "Edit Student | StudentVerse",
};

// Mock function to simulate fetching a student by ID
async function getStudentById(id: string): Promise<Student | undefined> {
  // In a real application, this would fetch from an API
  // For now, we'll return mock data
  const mockStudents: Student[] = [
    { id: 1, name: "John Doe", email: "john@example.com", age: 20 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 22 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 25 },
  ];

  return mockStudents.find(student => student.id === Number(id));
}

export default async function EditStudentPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const student = await getStudentById(id);

  if (!student) {
    notFound();
  }

  const updateStudentWithId = updateStudent.bind(null, student.id);

  return (
    <StudentForm student={student} action={updateStudentWithId} />
  );
}
