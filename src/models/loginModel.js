const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const loginSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },

});


const LoginModel = mongoose.model('login', loginSchema);

class Login {

    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null
    }

    async login() {
        this.validate();
        if (this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Invalid User and/or Password');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Invalid User and/or Password');
            this.user = null;
        }        
    }


    async register() {
        this.validate();
        await this.userExistence();
        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    validate() {
        this.cleanUp();
        // E-mail válido
        if (!validator.isEmail(this.body.email)) this.errors.push('Invalid Email')
        // Senha entre 8 e 12 caracteres
        if (this.body.password.length > 12 || this.body.password.length < 8) this.errors.push('Invalid Password (8 - 12)')
        // Verificar se o usuário existe
    }

    async userExistence() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push("E-mail already in use.");
    }

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] != 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            email: this.body.email,
            password: this.body.password
        }
    }

}

module.exports = Login;