const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
    },

});


const model = mongoose.model('Home', homeSchema);

class HomeModel {

    constructor(model) {
        this.model = model;
    }

    create = (titleData, descriptionData) => { 

        model.create({
            title: titleData,
            description: descriptionData
        })
            .then(data => console.log(data) + 'Created!')
            .catch(e => console.log(e));
    }

    findAll = () => {
        model.find()
            .then(data => console.log(data))
            .catch(e => console.log(e));
    }

}

module.exports = new HomeModel(model);