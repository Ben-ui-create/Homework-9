import HttpErrors from "http-errors";
import Users from '../models/users.js'

export default (req, res, next) => {
  try {
    const token = req.headers?.authorization || null;

    if (!token) {
      next(new HttpErrors(401));
      return;
    }

    const decryptData = Users.decrypt(token);

    if (!decryptData || !decryptData?.userId) {
      next(new HttpErrors(401));
      return;
    }

    req.userId = decryptData?.userId;

    next();
  } catch (err) {
    next(new HttpErrors(401));
  }
}