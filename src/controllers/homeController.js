const Contact = require('../models/contactModel')

//Home
exports.home = async (req, res) => {

    const contacts = await Contact.search();
    if (req.session.user) {
        res.render('index', { contacts });
    }
    else {
        res.render('login');
    }
    return;
}
