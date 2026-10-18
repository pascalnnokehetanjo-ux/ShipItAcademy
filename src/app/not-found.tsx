import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Smartphone, HelpCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-main)] text-[var(--text-main)] p-4">
      <Container size="sm">
        <Card className="text-center py-16 space-y-6 shadow-xl border-gray-200 dark:border-gray-800">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <HelpCircle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Page not found</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
          <div className="pt-2">
            <Button variant="primary" size="md" href="/">
              Back to home
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
}
