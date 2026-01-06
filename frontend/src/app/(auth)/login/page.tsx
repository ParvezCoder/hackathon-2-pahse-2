/**
 * User login page.
 */
import { LoginForm } from "@/components/auth/LoginForm";
import { Card } from "@/components/ui";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-gray-100 p-4">
      <Card variant="elevated" className="w-full max-w-md">
        <LoginForm />
      </Card>
    </div>
  );
}
