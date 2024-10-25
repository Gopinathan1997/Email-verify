import jwt from "jsonwebtoken";
import { db } from "../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  console.log("yes");
  const data = await req.json();
  const { token } = data;

  if (!token) {
    return new Response(JSON.stringify({ error: "No token provided" }), {
      status: 400,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded.insertId) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 400,
      });
    }

    const query = "UPDATE users SET is_verified = 1 WHERE id = ?";
    const [result] = await (await db).execute(query, [decoded.insertId]);
    console.log(result);

    if (result.affectedRows === 0) {
      return new Response(
        JSON.stringify({ error: "User not found or already verified" }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({ message: "Email verified successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during verification:", error);
    if (error.name === "TokenExpiredError") {
      return new Response(
        JSON.stringify({ error: "Verification link expired" }),
        { status: 400 }
      );
    }
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 400,
    });
  }
}