/**
 * User registration page.
 */
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Card } from "@/components/ui";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 p-4">
      <Card variant="elevated" className="w-full max-w-md">
        <RegisterForm />
      </Card>
    </div>
  );
}
