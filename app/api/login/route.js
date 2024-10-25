import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../../lib/db";
import * as yup from "yup";

// Define the validation schema
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export async function POST(req) {
  const body = await req.json();
  const { email, password } = body;
  console.log(body);

  try {
    // Validate input
    await loginSchema.validate({ email, password });

    // Retrieve the user from the database
    const [rows] = await (
      await db
    ).execute("SELECT * FROM users WHERE email = ?", [email]);
    const user = rows[0];

    // Check if user exists and passwords match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return new Response(
        JSON.stringify({
          message: "Invalid email or password",
        }),
        { status: 401 }
      );
    }

    // Check if email is verified
    if (!user.is_verified) {
      return new Response(
        JSON.stringify({
          message: "Please verify your email before logging in",
        }),
        { status: 403 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Respond with the token
    return new Response(JSON.stringify({ token, id: user.id }), {
      status: 200,
    });
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }
    // Handle other types of errors
    console.error("Login error:", error); // Log the error for debugging
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
