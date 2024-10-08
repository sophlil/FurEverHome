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
import cors from 'cors';


const PORT = process.env.PORT;
const app = express()

app.use(cors());
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
// source: https://github.com/jaredhanson/passport-local
// https://www.passportjs.org/concepts/authentication/downloads/html/
****************************************************************************
*/

passport.use(new LocalStrategy(
    function(user, password, done) {
        const query = userDbFunction.getUserByUserName(user)

        query.then(user => {
            // checks for valid userName
            if (user == null) {
                return done(null, false);
            }
            // checks for valid password
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
    // serialize user id to store in session
    return done(null, user._id.toString());
})

passport.deserializeUser(function(id, done) {
    // deserialize user id  in session

    const query = userDbFunction.getUserByID(id);

    query.then(result => {
        // get correct profile
        if (result.type == 'admin') {
            const queryAdmin =  adminDbFunction.getAdminProfileById(id).then(adminProfile => {
                adminProfile['type'] = "admin"
                return done(null, adminProfile);
            })
        }
        else {
            const queryPublic =  publicDbFunction.getPublicProfileById(id).then(publicProfile => {
                publicProfile['type'] = "public"
                return done(null, publicProfile);
            })
        }
    })
});

function isAuthenticated(req, res, next) {
    // check if user is authenticated
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginredirect',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.get('/loginredirect', isAuthenticated, function(req, res) {
    // redirect based on user type
    if (req.user.type == 'admin') {
        res.redirect('/Admin-Landing-Page')
    } else {
        res.redirect('/user-landing-page')
    }
});

app.post('/logout', isAuthenticated, function (req, res){
    req.session.destroy(function (err) {
        res.redirect('/');
    });
});


/*
****************************************************************************
Users
****************************************************************************
*/
// app.get('/user', (req, res) => {

//     userDbFunction.getAllUser().then(users => {
//         if (users !== null) {
//             res.json(users);
//         }
//         else {
//             res.status(404).json({error: "Document was not found."});
//         }
//     })
//     .catch(error => {
//         console.error(error);
//         res.status(400).json({error: "Retrieve document had failed."});
//     });
// });


app.get('/user', isAuthenticated, (req, res) => {

    userDbFunction.getUserByID(req.user.userId).then(users => {
        if (users !== null) {
            if (users.type == 'admin') {
                adminDbFunction.getAdminProfileById(req.user.userId).then(adminUser => {
                    res.json(adminUser);
                })
            }
            else {
                publicDbFunction.getPublicProfileById(req.user.userId).then(publicUser => {
                    res.json(publicUser);
                })
            }
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
app.post('/register/admin', (req, res) => {
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


app.get('/admin', isAuthenticated, (req, res) => {

    adminDbFunction.getAdminProfileById(req.user.userId).then(adminProfile => {
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


app.post('/admin', isAuthenticated, (req, res) => {

    const admin = adminDbFunction.getAdminProfileById(req.user.userId);

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
app.delete('/admin', isAuthenticated, (req, res) => {

    adminDbFunction.deleteAdminProfileById(req.user.userId).then(results => {
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
app.post('/register/animal', (req, res) => {
// app.post('/register/animal', isAuthenticated, (req, res) => {

    console.log("Register Animal Request Received:", req.body);

    animalDbFunction.createAnimalProfile(
        req.body.name,
        req.body.species,
        req.body.breed,
        req.body.disposition.goodWithChildren,
        req.body.disposition.goodWithOtherAnimals,
        req.body.disposition.mustBeLeashed,
        req.body.availability,
        req.body.photo,
        req.body.weight,
        req.body.height,
        req.body.description,
        req.body.age,
        req.body.dateAvailable,
        // req.body.createByUserId
        req.user.userId
    )
    .then(animalProfile => {
        // res.status(201).json({message: "Successful"});
        res.redirect("/admin-landing-page");
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


// Get Animal Profile by ID
app.get('/animal/:id?', (req, res) => {
    animalDbFunction.getAnimalProfileByID(req.params.id)
    .then(animalProfiles => {
        if (animalProfiles !== null) {
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


// saerch animal database
app.get('/search', (req, res) => {
    const searchValues = {}

    if (req.body.hasOwnProperty('name')) {
        searchValues['name'] = req.body.name;
    }
    if (req.body.hasOwnProperty('species')) {
        searchValues['species'] = req.body.species;
    }
    if (req.body.hasOwnProperty('breed')) {
        searchValues['breed'] = req.body.breed;
    }
    if (req.body.disposition.hasOwnProperty('goodWithChildren')) {
        searchValues['disposition.goodWithChildren'] = req.body.disposition.goodWithChildren;
    }
    if (req.body.disposition.hasOwnProperty('goodWithOtherAnimals')) {
        searchValues['disposition.goodWithOtherAnimals'] = req.body.disposition.goodWithOtherAnimals;
    }
    if (req.body.disposition.hasOwnProperty('mustBeLeashed')) {
        searchValues['disposition.mustBeLeashed'] = req.body.disposition.mustBeLeashed;
    }
    if (req.body.hasOwnProperty('availability')) {
        searchValues['availability'] = req.body.availability;
    }
    if (req.body.hasOwnProperty('weight')) {
        searchValues['weight'] = req.body.weight;
    }
    if (req.body.hasOwnProperty('height')) {
        searchValues['height'] = req.body.height;
    }
    if (req.body.hasOwnProperty('description')) {
        searchValues['description'] = req.body.description;
    }
    if (req.body.hasOwnProperty('age')) {
        searchValues['age'] = req.body.age;
    }

    animalDbFunction.getAnimalSearch(searchValues)
    .then(animalProfiles => {
        res.json(animalProfiles);
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({error: "Animal Search failed"});
    });
})


// Update
app.post('/animal/:id', isAuthenticated, (req, res) => {

    const animal = animalDbFunction.getAnimalProfileByID(req.params.id);

    animal.then(animalProfile => {
        if (animalProfile == null) {
            res.status(404).json({error: "Animal Profile Not Found."});
        }
        else if (animalProfile.createByUserId != req.user.userId) {
            res.status(403).json({message: "Forbidden"})
        }
        else {
            // update
            animalDbFunction.updateAnimalById(
                req.params.id,
                animalProfile.name,
                animalProfile.species,
                animalProfile.breed,
                animalProfile.disposition.goodWithChildren,
                animalProfile.disposition.goodWithOtherAnimals,
                animalProfile.disposition.mustBeLeashed,
                req.body.availability,
                animalProfile.photo,
                animalProfile.weight,
                animalProfile.height,
                animalProfile.description,
                animalProfile.age,
                animalProfile.dateAvailable,
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
app.delete('/animal/:id', isAuthenticated, (req, res) => {

    const animal = animalDbFunction.getAnimalProfileByID(req.params.id);

    animal.then(animalProfile => {
        if (animalProfile == null) {
            res.status(404).json({error: "Animal Profile Not Found."});
        }
        else if (animalProfile.createByUserId != req.user.userId) {
            res.status(403).json({message: "Forbidden"})
        }
        else {
            animalDbFunction.deleteAnimalById(req.params.id).then(results => {
                res.sendStatus(200)
            })
            .catch(error => {
                console.error(error);
                res.status(400).json({error: "Delete document had failed."});
            })
        }
    })
})


/*
****************************************************************************
PUBLIC PROFILES
****************************************************************************
*/
// create public profile
app.post('/register/public', (req, res) => {
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
                    // res.status(201).json(publicProfile);
                    res.redirect("/login")
                })
            })
            .catch(error => {
                console.log(error);
                res.status(400).json({error: "Create document had failed."});
            });
        };
    })
});


app.get('/public', isAuthenticated, (req, res) => {

    publicDbFunction.getPublicProfileById(req.user.userId).then(publicProfile => {
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


app.post('/public', isAuthenticated, (req, res) => {

    const publicProf = publicDbFunction.getPublicProfileById(req.user.userId);

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
app.delete('/public', isAuthenticated, (req, res) => {

    publicDbFunction.deletePublicProfileById(req.user.userId).then(results => {
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

app.get('/profile', isAuthenticated, (req, res) => {
    res.send(
        `<h1>Welcome ${req.user.name}!
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