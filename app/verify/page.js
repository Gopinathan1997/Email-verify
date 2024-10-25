"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Verify() {
  const params = useSearchParams();
  const token = params.get("token");
  const [message, setMessage] = useState("Please Wait");
  const [color, setColor] = useState("text-sky-700");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/verification`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }), // Sending the form data as JSON
        });

        const data = await response.json(); // Parse JSON data here
        console.log(data); // Log parsed response data
        if (response.ok) {
          setMessage(data.message);
          setColor("text-green-700 font-black text-center");
        }
        setColor("text-red-700 font-black text-center");
      } catch (error) {
        console.error("Error fetching verification data:", error); // Log any fetch errors
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto text-center  h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-center">Verification Under Process</h1>
      <p className={color}>{message}</p>
    </div>
  );
}
