import { Suspense } from "react";
import LoginTabs from "./LoginTabs"; // client component

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center">Loading...</div>}>
      <LoginTabs />
    </Suspense>
  );
}