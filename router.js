const express = require('express');
const router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

//login user
router.post('/login', (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email
        res.redirect('/route/dashboard')
        //res.end("Login Sucessful");
    }
    else {
        res.end("Invaild User");
    }
});

//route for Dashboard

router.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.render('dashboard', { user: req.session.user })
    }
    else {
        res.send("Unautorized user")
    }
})

//route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            res.send("Error")
        }
        else {
            res.render('base', { title: "Express", logout: "Logged out Successfully" })
        }
    })
})

    module.exports = router;