import jwt from "jsonwebtoken";
import { HARD_CODED_USER } from "../utils/hardcodedUser.js";
export const login = (req, res) => {
    const { email, password } = req.body;

    // check credentials
    if (email !== HARD_CODED_USER.email || password !== HARD_CODED_USER.password) {
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    }

    // create token
    const token = jwt.sign(
        { email:  HARD_CODED_USER.email},
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.json({
        success: true,
        token
    });
};
