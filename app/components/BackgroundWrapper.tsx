"use client";

import { useState } from "react";

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bg, setBg] = useState(0);

  const colors = [
    "from-black via-gray-900 to-black",
    "from-green-900 via-black to-black",
    "from-blue-900 via-black to-black",
    "from-purple-900 via-black to-black",
    "from-red-900 via-black to-black",
  ];

  return (
    <div
      onClick={() => setBg((prev) => (prev + 1) % colors.length)}
      className={`min-h-screen transition-all duration-700 bg-gradient-to-r ${colors[bg]} p-6`}
    >
      {children}
    </div>
  );
}