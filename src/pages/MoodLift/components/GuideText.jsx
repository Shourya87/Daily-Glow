import { useEffect, useState } from "react";

const steps = ["Inhale 🌸", "Hold 🌿", "Exhale 🌙"];

export default function GuideText({ active }) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <p className="mt-6 text-lg text-gray-700 font-medium">
      {active ? steps[stepIndex] : "Press start to begin 💖"}
    </p>
  );
}