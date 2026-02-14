import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <h1 className="text-4xl font-bold text-primary mb-4">Mama AI 🕊️</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        Maternal AI Monitoring Assistant for healthcare providers in Morocco.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/onboarding">Add New Patient</Link>
        </Button>
      </div>
    </div>
  );
}