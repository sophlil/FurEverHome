import bcrypt from "bcrypt";


const saltRounds = 10;

const encrypt = async function(password) {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(password, salt)
    return hash
};


const authenticate = async function(password, encrypted_password) {
    const auth = await bcrypt.compare(password, encrypted_password)
    return auth
};

export {encrypt, authenticate}