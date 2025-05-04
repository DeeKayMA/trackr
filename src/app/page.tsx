// Landing page (redirects to /dashboard or /login)

import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center">
      <h1 className="text-3xl  font-bold underline">Trackr</h1>
      <p>Job application tracker</p>
      <p> Landing Page</p>
    </div>
  );
}
