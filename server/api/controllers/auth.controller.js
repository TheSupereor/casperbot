import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

//segredo da JWT
const JWT_SECRET = process.env.JWT_SECRET;

//registrar usando bcrypt
const Register = async (req, res) => {
    const usersCollecion = req.app.locals.usersCollecion;
    const { username, password: normalPassword } = req.body;

    const passwordEncrypted = await bcrypt.hash(normalPassword, 2);
    const user = {
        name: username,
        password: passwordEncrypted
    }

    try {
        //inserindo no banco
        usersCollecion.insertOne(user);
    } catch (err) {
        return res.json({status: error, error: err})
    }

    res.json({status: 'Usuário criado com sucesso'})
}

const Login = async (req, res) => {
    const {username, password} = req.body;
    const usersCollecion = req.app.locals.usersCollecion;

    //procurando usuário no bancp
    const user = await usersCollecion.findOne({name: username})

    if(!user){
        return res.json({status: 'error', error: 'Nome de usuário não encontrado'})
    }

    //autenticando com o JWT
    if(await bcrypt.compare(password, user.password)){
        //combinação bate
        const token = JWT.sign({
            id: user._id,
            username: user.username
        },
        JWT_SECRET)

        return res.json({ status: 'ok', data: token })
    }

    res.json({status: 'error', error: 'Senha inválida'})
}

export {
    Register,
    Login
}