const express = require("express")
const authRoutes = require('./routes/authRoutes');
const session = require('express-session');
const User = require("./models/UserFunctions");
const expressEjsLayouts = require("express-ejs-layouts")
const connectToMongo = require("./db");
const app = express()
const port = 3000


app.use(session({
    secret: 'Ballaya',
    resave: false,
    saveUninitialized: false
}));

connectToMongo();

//Static files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + '/public/css'))

app.use(expressEjsLayouts)
app.set("view engine", 'ejs')
app.use(express.urlencoded({
    extended: true
}));

const renderPage = (route, file, props) =>{
    app.get(route, async (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
    
        const username = req.session.user.username;
    
        try {
            const user = await User.getUserByUsername(username);
            if (!user) {
                return res.status(404).send('User not found');
            }
    
            res.render(file, {...props, user});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });

}

renderPage('/', 'index', {
    title: 'Home'
})


// Routes
app.use(authRoutes);

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));