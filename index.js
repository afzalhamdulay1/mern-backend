let express = require('express');
let mongoose = require('mongoose'); 
const cors = require('cors');
let productRouter  = require('./routers/productRouter')
require('dotenv').config();
const PORT =    process.env.PORT || 9000;

let app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/product", productRouter);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

app.listen(PORT, () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connection established");
        console.log('Server has started successfully');
    })
    .catch((error) => {
        console.log("Couldn't connect to the database: " + error);
    });
});

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successful", user });
            } else {
                res.send({ message: "Password didn't match" });
            }
        } else {
            res.send({ message: "User not registered" });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.send({ message: "User already registered" });
        } else {
            const newUser = new User({
                name,
                email,
                password
            });

            await newUser.save();
            res.send({ message: "Successfully Registered, Please login now." });
        }
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});
