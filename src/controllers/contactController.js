const Contact = require('../models/contactModel');
//Home
exports.index = (req, res) => {
    res.render('contact', {
        contact: {}
    })
};

exports.register = async (req,res) => {
    try {
        const contact = new Contact(req.body);
        await contact.register();

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => {
                res.redirect('/contact/index');
            });
            return;
        };

        req.flash('success','Contact registered successfully!')
        req.session.save(() => {
            res.redirect(`/contact/index/${contact.contact._id}`);
        });
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
};

exports.editIndex = async (req,res) => {

    if (!req.params.id) return res.render('404');
    const contact = await Contact.contactExistence(req.params.id)
    if (contact) {
        res.render('contact', { contact });
    }
    else {
        return res.render('404');
    }
}

exports.edit = async (req,res) => {
    if (!req.params.id) return res.render('404');
    try {
        const contact = new Contact(req.body);
        await contact.edit(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => {
                res.redirect(`/contact/index/${req.params.id}`);
            });
            return;
        };

        req.flash('success','Contact edited successfully!')
        req.session.save(() => {
            res.redirect(`/contact/index/${contact.contact._id}`);
        });
        return;
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}

exports.delete = async (req,res) => {
    if (!req.params.id) return res.render('404');
    try {
        const contact = new Contact(req.body);
        await contact.delete(req.params.id);

        if (contact.errors.length > 0) {
            req.flash('errors', contact.errors)
            req.session.save(() => {
                res.redirect(`/`);
            });
            return;
        };
        // alert('HEHEHE');
        // const userResponse = window.confirm("Do you want to continue?");
        const userResponse = 1;
        if (userResponse) {
            req.flash('success','Contact deleted successfully!')
            req.session.save(() => {
                res.redirect(`/`);
            });
            return;
        }
        // else {
        //     res.redirect(`/`);
        //     return;
        // }
    } catch(e) {
        console.log(e);
        res.render('404');
    }
}