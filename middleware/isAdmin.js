// /middleware/isAdmin.js
// import { getSession } from 'next-auth/react';

export default async function isAdmin(req, res, next) {
  try {
    if (req.headers.authorization != process.env.BEARER_AUTH) {
      return res.status(403).json({ error: "forbidden" });
    }
    const userAgent = req.headers["user-agent"];
    const isBrowserRequest = userAgent && userAgent.includes("axios");
    if (!isBrowserRequest) {
      return res.status(403).json({ error: "Forbiddena" });
    }
    return next();
  } catch (error) {
    console.error("Error while checking admin role:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
