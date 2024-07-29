import express from 'express';
import session from 'express-session';
import flash from 'express-flash';
import {authenticate} from './lib/auth.mjs'; 
import bodyParser from 'body-parser';
import * as userDbFunction from './models/users.mjs';
import * as animalDbFunction from './models/animal-profiles.mjs';
import * as adminDbFunction from './models/admin-profiles.mjs';
import * as publicDbFunction from './models/public-profiles.mjs';
import passport from 'passport';
import {Strategy as LocalStrategy} from "passport-local";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';


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
        const query = userDbFunction.getUserByUserName(user)

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


passport.serializeUser(function(user, done) {
    return done(null, user._id.toString());
})

passport.deserializeUser(function(id, done) {

    const query = userDbFunction.getUserByID(id);

    // query.then(result => {
    //     return done(null, result);
    // })
    query.then(result => {
        if (result.type == 'admin') {
            const queryAdmin =  adminDbFunction.getAdminProfileById(id).then(adminProfile => {
                return done(null, adminProfile);
            })
        }
        // user for public profile
        else {
            const queryPublic =  publicDbFunction.getPublicProfileById(id).then(publicProfile => {
                return done(null, publicProfile);
            })
        }
    })
});


// check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


app.post('/login',
    passport.authenticate('local', {
        // successRedirect: 'http://localhost:3005/profile',
        successRedirect: 'http://localhost:3000/Browse',
        failureRedirect: 'http://localhost:3000/login',
        failureFlash: true
    })
);


app.post('/logout', function (req, res){
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});


/*
****************************************************************************
Users
****************************************************************************
*/
app.get('/user', (req, res) => {

    userDbFunction.getAllUser().then(users => {
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


app.get('/user/:id', (req, res) => {

    userDbFunction.getUserByID(req.params.id).then(users => {
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


/*
****************************************************************************
ADMIN PROFILES
****************************************************************************
*/
// create admin profile
app.put('/register/admin', (req, res) => {
    const query = userDbFunction.getUserByUserName(req.body.userName);

    query.then(results => {
        // check if userName is already being used
        if (results != null) {
            res.status(400).json({error: "400: e-mail is already registered."});
        } else {
            // create user entry
            userDbFunction.createUser(
                req.body.userName,
                req.body.password.toString(),
                'admin'
            )
            .then(user => {
                // create admin profile
                const userId = user._id.toString();
                adminDbFunction.createAdminProfile(
                    req.body.name,
                    req.body.address,
                    userId
                )
                .then(adminProfile => {
                    res.status(201).json(adminProfile);
                })
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({error: "Create document had failed."});
            });
        };
    })
});


app.get('/admin/:id', (req, res) => {
    // TODO
    // get user profile and check created by user id 
    // req.user.userId

    adminDbFunction.getAdminProfileById(req.params.id).then(adminProfile => {
        if (adminProfile !== null) {
            res.json(adminProfile);
        }
        else {
            res.status(404).json({error: "Document was not found."});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Retrieve document had failed."});
    });
})


app.post('/admin/:id', (req, res) => {
    // TODO
    // get user profile and check created by user id 
    // req.user.userId

    const admin = adminDbFunction.getAdminProfileById(req.params.id);

    admin.then(adminProfile => {
        if (adminProfile == null) {
            res.status(404).json({error: "Admin Profile Not Found."});
        }
        else {
            // update 
            adminDbFunction.updateAdminProfileById(
                req.params.id,
                req.body.name,
                req.body.address,
                adminProfile.userId
            )
            .then(results => {
                res.sendStatus(200)
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({error: "Update document had failed."});
            })
        }
    })
})


// Delete
// app.get('/animals/:id', isAuthenticated, (req, res) => {
app.delete('/admin/:id', (req, res) => {
    // TODO
    // get animal profile and check created by user id 
    // req.user.userId
    
    adminDbFunction.deleteAdminProfileById(req.params.id).then(results => {
        res.sendStatus(200)
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Delete document had failed."});
    })
})


/*
****************************************************************************
ANIMAL PROFILES
****************************************************************************
*/


// Add Animal Profile
app.put('/register/animal', (req, res) => {

    animalDbFunction.createAnimalProfile(
        req.body.animalName,
        req.body.type,
        req.body.breed,
        req.body.disposition,
        req.body.isAvailable,
        'userId' // once front end is enabled
    )
    .then(animalProfile => {
        res.status(201).json({comment: "Successful"});
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({error: "Create animal profile failed"});
    })
});

// Get All Animal Profiles
app.get('/animal', (req, res) => {
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
app.get('/animal/name/:animalName', (req, res) => {
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
app.get('/animal/:id', (req, res) => {
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


// Update
// app.get('/animal/:id', isAuthenticated, (req, res) => {
app.post('/animal/:id', (req, res) => {
    // TODO
    // get animal profile and check created by user id 
    // req.user.userId

    const animal = animalDbFunction.getAnimalProfileByID(req.params.id);

    animal.then(animalProfile => {
        if (animalProfile == null) {
            res.status(404).json({error: "Animal Profile Not Found."});
        }
        else {
            // update 
            animalDbFunction.updateAnimalById(
                req.params.id,
                req.body.animalName,
                req.body.type,
                req.body.breed,
                req.body.disposition,
                req.body.isAvailable,
                animalProfile.dateCreated,
                animalProfile.createByUserId
            )
            .then(results => {
                res.sendStatus(200)
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({error: "Update document had failed."});
            })
        }
    })

})


// Delete
// app.get('/animals/:id', isAuthenticated, (req, res) => {
app.delete('/animal/:id', (req, res) => {
    // TODO
    // get animal profile and check created by user id 
    // req.user.userId
    
    animalDbFunction.deleteAnimalById(req.params.id).then(results => {
        res.sendStatus(200)
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Delete document had failed."});
    })
})


/*
****************************************************************************
PUBLIC PROFILES
****************************************************************************
*/
// create public profile
app.put('/register/public', (req, res) => {
    const query = userDbFunction.getUserByUserName(req.body.userName);

    query.then(results => {
        // check if userName is already being used
        if (results != null) {
            res.status(400).json({error: "400: e-mail is already registered."});
        } else {
            // create user entry
            userDbFunction.createUser(
                req.body.userName,
                req.body.password.toString(),
                'public'
            )
            .then(user => {
                // create public profile
                const userId = user._id.toString();
                publicDbFunction.createPublicProfile(
                    req.body.name,
                    userId
                )
                .then(publicProfile => {
                    res.status(201).json(publicProfile);
                })
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({error: "Create document had failed."});
            });
        };
    })
});


app.get('/public/:id', (req, res) => {
    // TODO
    // get user profile and check created by user id 
    // req.user.userId

    publicDbFunction.getPublicProfileById(req.params.id).then(publicProfile => {
        if (publicProfile !== null) {
            res.json(publicProfile);
        }
        else {
            res.status(404).json({error: "Document was not found."});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Retrieve document had failed."});
    });
})


app.post('/public/:id', (req, res) => {
    // TODO
    // get user profile and check created by user id 
    // req.user.userId

    const publicProf = publicDbFunction.getPublicProfileById(req.params.id);

    publicProf.then(publicProfile => {
        if (publicProfile == null) {
            res.status(404).json({error: "Public Profile Not Found."});
        }
        else {
            // update 
            publicDbFunction.updatePublicProfileById(
                req.params.id,
                req.body.name,
                publicProfile.userId
            )
            .then(results => {
                res.sendStatus(200, results)
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({error: "Update document had failed."});
            })
        }
    })
})


// Delete
// app.get('/animals/:id', isAuthenticated, (req, res) => {
app.delete('/public/:id', (req, res) => {
    // TODO
    // get animal profile and check created by user id 
    // req.user.userId
    
    publicDbFunction.deletePublicProfileById(req.params.id).then(results => {
        res.sendStatus(200)
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Delete document had failed."});
    })
})


/*
****************************************************************************
APP STARTUP/LISTENER - And Express Testing Envrionment
****************************************************************************
*/

// Examples from Geeks for geeks
// https://www.geeksforgeeks.org/explain-the-use-of-passport-js-for-authentication-in-express-applications/

// app.get('/', (req, res) => {
//     res.send('<h1>Passport.js Authentication Example</h1>');
// });
// app.get('/login', (req, res) => {
//     res.send('<h1>Login Page</h1><form action="/login" method="post">' +
//         'Username: <input type="text" name="username"><br>' +
//         'Password: <input type="password" name="password"><br>' +
//         '<input type="submit" value="Login"></form>'
//     );
// });

// app.get('/profile', isAuthenticated, (req, res) => {
//     res.send(
//         `<h1>Welcome ${req.user.name}!
//         </h1><a href="/logout">Logout</a>`
//     );
// });

// app.get('/logout', (req, res) => {
//     req.logout((err) => {
//         if (err) {
//             return next(err);
//         }
//         res.redirect('/');
//     });
// });

// Serve the React app as static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});