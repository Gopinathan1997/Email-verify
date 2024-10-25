"use client";
import { useEffect, useState } from "react";
import {db} from './lib/db'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const storedResponse = localStorage.getItem("verificationResponse");
  const data = storedResponse ? JSON.parse(storedResponse) : null;

  if (!localStorage.getItem("verificationResponse")) {
    return router.push("/register");
  }
  /* const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    address: "",
  });
  const [message, setMessage] = useState("");


  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setMessage("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Loading.. Please wait");

    try {
      const [rows] = await(await db).execute(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );
      const user = rows[0];

      if (response.ok) {
        setMessage(data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          number: "",
          address: "",
        });
        alert(
          "Registration Successfull" +
            "\n" +
            "Please check your email for a verification link." +
            "\n" +
            "If you don't receive the email, make sure to check your spam folder."
        );
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  }; */
  const onLoggingOut =()=>{
    localStorage.clear()
    router.push('/login')
  }
  return(
    <div className="mx-auto text-center  h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className='font-black text-center'>You are Successfully logged In</h1>
      <button className='bg-sky-500 text-zinc-50 px-3 py-[10px] ring-1' onClick={onLoggingOut}>Logut</button>
    </div>
  )

  /* return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Contact Management
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="number"
              className="block text-gray-700 font-semibold mb-2"
            >
              Mobile Number
            </label>
            <input
              type="number"
              id="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-2"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mb-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-green-600">{message}</p>
        )}
      </div>
    </div>
  ); */
}
