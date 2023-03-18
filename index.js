const express = require("express");

const app = express();
require("dotenv").config()

app.use(express.json());


const URI = process.env.MONGO_URI

const mongoose = require("mongoose");
const { userValidationSchema } = require("./middleware/userValidate");
const { validate } = require("./middleware/validator");

const userSchema = new mongoose.Schema({
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: { type: String, trim: true, unique: true, required: true },
    password: { type: String, trim: true, required: true },
})

let userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)

app.get("/", (request, response) => {
    return response.json({ message: "Schema validation wit Yup" });
});

app.post("/user", validate(userValidationSchema), async (request, response) => {
    const { firstName, lastName, email, password } = request.body;

    const user = new userModel({
        firstName,
        lastName,
        email,
        password
    })

    try {
        await user.save();
        return response.json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        return response.status(409).json({ message: error.message });
    }
})

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", false)
        await mongoose.connect(URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

connectDB()


app.listen(4000, () => {
    console.log(`App is listening to port 4000`);
})
