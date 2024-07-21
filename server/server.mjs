import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import {authenticate} from './lib/auth.mjs'; 
import bodyParser from 'body-parser';
import * as dbFunction from './models/users.mjs';
import * as animalDbFunction from './models/animal-profiles.mjs';
import passport from 'passport';
import {Strategy as LocalStrategy} from "passport-local";
import 'dotenv/config';


const PORT = process.env.PORT;
const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "secret",
    resave: false ,
    saveUninitialized: false
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


/*
****************************************************************************
LANDING AND LOGIN PAGES
****************************************************************************
*/

// source: https://github.com/jaredhanson/passport-local
// https://www.passportjs.org/concepts/authentication/downloads/html/
passport.use(new LocalStrategy(
    function(user, password, done) {
        const query = dbFunction.getUserByUserName(user)

        query.then(user => {
            // invalid userName
            if (user == null) {
                return done(null, false);
            }
            // invalid password
            const validation = authenticate(password, user.password);

            validation.then(isValid => {
                if (isValid == false) {
                    return done(null, false);
                } else {
                    return done(null, user);
                };
            })
        })
        .catch(error => {
            return done(error);
        })
    }
));

// passport.use(new LocalStrategy(
//     (username, password, done) => {
//         // demo credentials
//         if (username === 'admin' && password === 'gfg') {
//             return done(null, { id: 1, username: 'user' });
//         } else {
//             return done(null, false,
//                 { message: 'Hey Geek! Incorrect username or password.' });
//         }
//     }
// ));

passport.serializeUser(function(user, done) {
    return done(null, user._id.toString());
})

passport.deserializeUser(function(id, done) {

    const query = dbFunction.getUserByID(id);

    query.then(result => {
        return done(null, result);
    })
});


app.post('/register', (req, res) => {
    const query = dbFunction.getUserByUserName(req.body.userName);

    query.then(results => {
        // check if userName is already being used
        if (results != null) {
            res.status(400).json({error: "400: e-mail is already registered."});
        } else {
            // continue to add user if userName was not registered
            dbFunction.addUser(
                req.body.userName,
                req.body.password.toString()
            )
            .then(users => {
                res.status(201).json({comment: "Successful"});
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({error: "Create document had failed."});
            });
        };
    })
});


app.post('/login',
    passport.authenticate('local', {
        successRedirect: 'http://localhost:3000/',
        failureRedirect: '/login',
        failureFlash: true
    })
);


app.post('/logout', function (req, res){
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});


app.get('/getusers', (req, res) => {

    if (req.isAuthenticated()) {
        console.log(req.isAuthenticated())
    } else {
        console.log(req.isAuthenticated())
    }

    dbFunction.getAllUser().then(users => {
        if (users !== null) {
            res.json(users);
        }
        else {
            res.status(404).json({error: "Document was not found."});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Retrieve document had failed."});
    });
});


app.get('/getuser/:id', (req, res) => {

    dbFunction.getUserByID(req.params.id).then(users => {
        if (users !== null) {
            console.log(users._id.toString());
            res.json(users);
        }
        else {
            res.status(404).json({error: "Document was not found."});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Retrieve document had failed."});
    });
});



// Examples from Geeks for geeks
// https://www.geeksforgeeks.org/explain-the-use-of-passport-js-for-authentication-in-express-applications/
app.get('/', (req, res) => {
    res.send('<h1>Passport.js Authentication Example</h1>');
});
app.get('/login', (req, res) => {
    res.send('<h1>Login Page</h1><form action="/login" method="post">' +
        'Username: <input type="text" name="username"><br>' +
        'Password: <input type="password" name="password"><br>' +
        '<input type="submit" value="Login"></form>'
    );
});

app.get('/profile', isAuthenticated, (req, res) => {
    res.send(
        `<h1>Welcome ${req.user.userName}!
        </h1><a href="/logout">Logout</a>`
    );
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
////


/*
****************************************************************************
APP STARTUP/LISTENER
****************************************************************************
*/

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


/*
****************************************************************************
ANIMAL PROFILES
****************************************************************************
*/


// Add Animal Profile
app.post('/addanimalprofile', (req, res) => {

    animalDbFunction.addAnimalProfile(res.body)
    .then(animalProfile => {
        res.status(201).json({comment: "Successful"});
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({error: "Create animal profile failed"});
    })
});

// Get All Animal Profiles
app.get('/getallanimalprofiles', (req, res) => {
    animalDbFunction.getAllAnimalProfiles()
    .then(animalProfiles => {
        if (animalProfiles !== null) {
            res.json(animalProfiles);
        } else {
            res.status(404).json({error: "No animal profiles found"});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Retrieve all animal profiles failed"});
    });
});

// Get Animal Profiles by Animal Name
app.get('/getanimalprofilesbyname:animalName', (req, res) => {
    animalDbFunction.getAnimalProfileByName(req.params.animalName)
    .then(animalProfiles => {
        if (animalProfiles !== null) {
            res.json(animalProfiles);
        } else {
            res.status(404).json({error: "No animal profiles with that name found"});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Retrieve animal profile by name failed"});
    });
});

// Get Animal Profile by ID
app.get('/getanimalprofilesbyid:id', (req, res) => {
    animalDbFunction.getAnimalProfileByID(req.params.id)
    .then(animalProfiles => {
        if (animalProfiles !== null) {
            console.log(animalProfiles._id.toString());
            res.json(animalProfiles);
        } else {
            res.status(404).json({error: "No animal profiles with that id found"});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Retrieve animal profile by id failed"});
    });
});
