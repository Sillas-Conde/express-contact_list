const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const contactSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },

    surname: {
        type: String,
        require: false,
        default: ''
    },

    email: {
        type: String,
        require: false,
        default: ''
    },

    phone: {
        type: String,
        require: false,
        default: ''
    },

    date: {
        type: Date,
        default: Date.now()
    },

});


const contactModel = mongoose.model('contacts', contactSchema);

class Contact {

    constructor(body) {
        this.body = body;
        this.errors = [];
        this.contact = null
    }

    async edit(id) {
        if (typeof id !== 'string') return;
        this.validate();
        if (this.errors.length > 0) return;
        this.contact = await contactModel.findByIdAndUpdate(id, this.body, { new: true });

    }

    static async search() {
        const contacts = await contactModel.find()
            .sort( { date: -1 } );
        return contacts;
    }

    async register() {
        this.validate();
        if (this.errors.length > 0) return;

        this.contact = await contactModel.create(this.body);
    }

    async delete(id) {
        if (typeof id !== 'string') return;
        this.contact = await contactModel.findByIdAndDelete(id);
    }

    static async contactExistence(id) {
        if (typeof id !== 'string') return;
        const contact = await contactModel.findById(id);
        return contact;
    }

    validate() {
        this.cleanUp();
        // E-mail válido
        if (this.body.email && !validator.isEmail(this.body.email)) this.errors.push('Invalid Email.')
        if (!this.body.name) this.errors.push("Name is required.")
        if (!this.body.email && !this.body.phone) {
            this.errors.push("At least Phone or E-mail are required.");
        }
    
    }    

    cleanUp() {
        for (const key in this.body) {
            if (typeof this.body[key] != 'string') {
                this.body[key] = '';
            }
        }
        this.body = {
            name: this.body.name,
            surname: this.body.surname,
            email: this.body.email,
            phone: this.body.phone
        }
    }

}

module.exports = Contact;