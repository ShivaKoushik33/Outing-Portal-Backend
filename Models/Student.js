const mongoose = require('mongoose');

const studentSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match:[/^[nN](20|21|22|23|24)\d{4}@rguktn\.ac\.in$/,"Please enter rgukt mail only"]
    },
    password: {
        type: String,
        required: true
    },
    id:{
        type:String,
    }
});

const Student=mongoose.model('Student',studentSchema);

module.exports = Student;
