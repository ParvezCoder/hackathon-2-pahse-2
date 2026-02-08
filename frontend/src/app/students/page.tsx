
import { Student } from "@/lib/definitions";
import { Suspense } from "react";
import { StudentsClientPage } from "@/components/students/StudentsClientPage";
import { TableSkeleton } from "@/components/students/TableSkeleton";

export const metadata = {
  title: "Students | StudentVerse",
};

// Mock function to simulate fetching students
async function getStudents(): Promise<Student[]> {
  // In a real application, this would fetch from an API
  // For now, we'll return mock data
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay

  return [
    { id: 1, name: "John Doe", email: "john@example.com", age: 20 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", age: 22 },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 25 },
    { id: 4, name: "Alice Williams", email: "alice@example.com", age: 23 },
    { id: 5, name: "Charlie Brown", email: "charlie@example.com", age: 21 },
  ];
}

async function StudentsList() {
    const students = await getStudents();
    return <StudentsClientPage students={students} />;
}

export default function StudentsPage() {
  return (
    <Suspense fallback={<TableSkeleton />}>
      <StudentsList />
    </Suspense>
  );
}
