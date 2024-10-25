import { db } from "../../lib/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as yup from "yup";
import nodemailer from "nodemailer";

const userSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export async function POST(req) {
  try {
    // Parse the request body once
    const body = await req.json();

    const { name, email, password } = body;

    console.log("Received data:", { name, email, password });

    // Validate the input data
    await userSchema.validate({ name, email, password });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const timeStamp = new Date();

    // Insert the user into the database

    const query =
      "INSERT INTO users (name, email, password, created_at) VALUES (?, ?, ?, ?)";
    const result = await (
      await db
    ).execute(
      query,
      [name, email, hashedPassword, timeStamp],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    // Generate a verification token

    // Optionally, you can return the result or perform additional actions

    // Log result for debugging

    const insertId = result[0].insertId; // Safely extract insertId
    const token = jwt.sign({ insertId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    if (!insertId) {
      throw new Error("Failed to insert user into the database.");
    }

    // Send the verification email
    await sendVerificationEmail(email, token);

    console.log("Verification email sent.");

    // Return success response
    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);

    // Return error response with detailed error message
    return new Response(
      JSON.stringify({
        message: "Error registering user",
        error: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Function to send verification email using nodemailer
const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gopi13ramnad@gmail.com",
      pass: process.env.APP_PASSWORD, // Ensure this is correctly set in your environment variables
    },
  });

  try {
    await transporter.sendMail({
      from: '"Contact Manager" <noreply@example.com>',
      to: email,
      subject: "Verify your email",
      text: `Click the link to verify your email: http://localhost:3000/verify?token=${token}`,
    });
    console.log("Verification email sent to", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Rethrow the error to catch in the main flow
  }
};
