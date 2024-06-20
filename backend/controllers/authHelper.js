const bcrypt = require("bcrypt")
const hashPassword = async(password)=>{
    try {
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(password,saltRound);
        return hashedPassword;
    } catch (error) {
    }
}
const comparePassword = async(password,hashedPassword)=>{
    try {
        return bcrypt.compare(password,hashedPassword)
    } catch (error) {
    }
}
module.exports = {hashPassword,comparePassword}