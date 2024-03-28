
const { MongoClient, ServerApiVersion } = require('mongodb');
const bp = require('body-parser')
const cors = require('cors');
const { customLogger } = require('./logger');
const { listDatabases, connectMongo } = require('./mongo');
const { verifyUser, getUsers, createUser, getUserById, updateUser,loginUser,addToFavorites,removeFromFavorites,addListingFromUser,removeListingFromUser, deleteUser } = require('./mongo/users');
const { sendPriceDownEmail, getListingsWithFilter, getListingById,getListings, createListing, updateListing, getListingsOfArray, activeListing, deactiveListing, removeListing } = require('./mongo/listings');

const username = encodeURIComponent("e239696");
const password = encodeURIComponent("ecIrhU9g4slO78nP");
const uri = `mongodb+srv://${username}:${password}@495hw1.eh5ue1r.mongodb.net/?retryWrites=true&w=majority&appName=495hw1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const express = require('express');
const {sendEmail} = require("./mailer");
const app = express();
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

connectMongo(client).catch(console.error);

// Define a route handler for the root path ('/') using a GET request
app.get('/', (req, res) => {
    listDatabases(client).then(data => {
        customLogger(`List of databases sent.`)
        res.send(data.databases);
    });
});



app.get('/ping', (req, res) => {
    res.send('pong');
});

/*
USER ENDPOINTS
 */

app.get('/user', (req, res) => {
    getUsers(client).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.get('/user/:id', (req, res) => {
    getUserById(client, req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.post('/user', (req, res) => {
    createUser(client, req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.get('/user/verify/:id', (req, res) => {
    verifyUser(client, req.params.id).then(data => {
        res.redirect('https://four95hw1.onrender.com/?verified=true');
    }).catch(err => {
        res.send(err);
    })
})

app.put('/user/:id', (req, res) => {
    updateUser(client, req.params.id, req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.delete('/user/:id', (req, res) => {
    deleteUser(client, req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.post('/user/login', (req, res) => {
    const { email, password } = req.body;
    loginUser(client, email, password).then(data => {
        customLogger(`User ${email} logged in`);
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.put('/user/:id/favorites/:listingId', (req, res) => {
    addToFavorites(client, req.params.id, req.params.listingId).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
} )

app.delete('/user/:id/favorites/:listingId', (req, res) => {
    removeFromFavorites(client, req.params.id, req.params.listingId).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.put('/user/:id/listings/:listingId', (req, res) => {
    addListingFromUser(client, req.params.id, req.params.listingId).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.delete('/user/:id/listings/:listingId', (req, res) => {
    removeListingFromUser(client, req.params.id, req.params.listingId).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})
/*
LISTING ENDPOINTS
 */

app.get('/listing', (req, res) => {
    getListings(client).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.get('/listing/:id', (req, res) => {
    getListingById(client, req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.post('/listing/multiple', (req, res) => {
    //console.log(req.body)
    getListingsOfArray(client, req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.post('/listing/filter', (req, res) => {
    getListingsWithFilter(client, req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})
app.post('/listing', (req, res) => {
    createListing(client, req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.put('/listing/:id', (req, res) => {
    updateListing(client, req.params.id, req.body).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.put('/listing/:id/activate', (req, res) => {
    activeListing(client, req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.put('/listing/:id/deactivate/', (req, res) => {
    deactiveListing(client, req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.delete('/listing/:id', (req, res) => {
    removeListing(client, req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

app.post('/listing/price-down/:id', (req, res) => {
    sendPriceDownEmail(client, req.params.id).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    })
})

// Start the server and listen on port 3000
app.listen(3000, () => {
    customLogger('Server listening on port 3000');
});

