import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // “Store this cookie, but don’t expose it to document.cookie in JavaScript.” prevents XSS attacks  where an attacker injects malicious JavaScript into a website, often through user input.
    sameSite: "strict", // it helpsd prevent CSRF (cross-site requeste forgery) attacks by blocking cookies from being sent
    secure: process.env.NODE_ENV !== "development",
  });
  return token;
};
