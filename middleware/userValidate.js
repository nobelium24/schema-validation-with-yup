const yup = require("yup");

const userValidationSchema = yup.object().shape({
    firstName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required first name').matches(/^[a-zA-Z]+$/),
    lastName: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required last name').matches(/^[a-zA-Z]+$/),
    email: yup.string().email("Invalid email address").required("Email is required email").matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/),
    password: yup.string().matches(/^.{8,}$/, 'Password must be at least 8 characters long.').required('Password is required.'),
});

module.exports = {userValidationSchema}

