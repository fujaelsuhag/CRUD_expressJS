const Contact = require('./Contact')

exports.getAllContact = (req, res) => {
    Contact.find()
        .then(contacts => {
            res.render('index', { contacts, error: {} })
        })
        .catch(err => {
            console.log(err)
            res.json({
                message: 'Error Occurred!!'
            })
        })
}
exports.getSingleContact = (req, res) => {
    let { id } = req.params
    Contact.findById(id)
        .then(contact => {
            res.json(contact)
        })
        .catch(err => {
            console.log(err)
            res.json({
                message: 'Error Occurred!!'
            })
        })
}
exports.createContact = (req, res) => {

    let { name, email, phone, id } = req.body

    let error = {}

    if (!name) {
        error.name = 'please provide a name'
    }
    if (!phone) {
        error.phone = 'please provide a phone'
    }
    if (!email) {
        error.email = 'please provide an email'
    }

    let isError = Object.keys(error).length > 0
    if (isError) {
        Contact.find()
            .then(contacts => {
                return res.render('index', { contacts, error })
            })
            .catch(err => {
                console.log(err)
                return res.json({
                    message: 'Error Occurred!!'
                })
            })
    }

    if (id) {
        Contact.findOneAndUpdate(
            { _id: id },
            {
                $set: {
                    name,
                    phone,
                    email
                }
            }
        ).then(() => {
            Contact.find()
                .then(contacts => {
                    res.render('index', {contacts, error: {}})
                })
        }).catch(err => {
            console.log(err)
            res.json({
                message: 'Error Occurred!!'
            })
        })
    } else {
        let contact = new Contact({
            name: name,
            email: email,
            phone: phone
        })
        contact.save()
            .then(c => {
                Contact.find()
                    .then(contacts => {
                        res.render('index', { contacts, error: {} })
                    })
            })
            .catch(err => {
                console.log(err)
                res.json({
                    message: 'Error Occurred!!'
                })
            })
    }
}
exports.updateContact = (req, res) => {
    let { name, email, phone } = req.body
    let { id } = req.params

    Contact.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                name: name, email: email, phone: phone
            }
        },
        { new: true }
    )
        .then(contact => {
            res.json(contact)
        })
        .catch(err => {
            console.log(err)
            res.json({
                message: 'Error Occurred!!'
            })
        })
}
exports.deleteContact = (req, res) => {
    let { id } = req.params

    Contact.findOneAndDelete({ _id: id })
        .then(() => {
            Contact.find()
                .then(contacts => {
                    res.render('index', { contacts, error: {} })
                })
        })
        .catch(err => {
            console.log(err)
            res.json({
                message: 'Error Occurred!!'
            })
        })
}