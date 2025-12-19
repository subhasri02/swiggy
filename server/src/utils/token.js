// // for generating token using UserId as UserId is unique

import jwt from "jsonwebtoken";

const genToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default genToken;

