
var db;

function initializeFirebase() {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDqqIszWP9XsiRQMDQCvKgDZzggBDBjxQw",
        authDomain: "test-ec3be.firebaseapp.com",
        databaseURL: "https://test-ec3be.firebaseio.com",
        projectId: "test-ec3be",
        storageBucket: "test-ec3be.appspot.com",
        messagingSenderId: "440532547381"
    };
    firebase.initializeApp(config);

    db = firebase.firestore();

    // Some shit will happen if you wont write these lines
    const settings = { timestampsInSnapshots: true };
    db.settings(settings);
}


function getKonanim() {

    return new Promise((resolve, reject) => {
        // searching for a document that his userEmail == someUserEmail
        db.collection("konanim").get()

            .then(function (querySnapshot) {
                // it means the other user is registered for a shift, so we are replacing him

                // querySnapshot contains the results of the thing we looked for, in this case- when userEmail == someUserEmail, if a user is registered twice in the shifts collection- the query will contain 2 docs, and it's bad (if there is more than one doc it means that a user is registered more than once in the shifts collection)
                var konanim = [];

                querySnapshot.docs.forEach(doc => {
                    konanim.push(doc.data());
                });

                resolve(konanim);
            })

            .catch(function (error) {
                reject(error);
            });
    });
}



// add user to the db collection in name konanim
function addKonan(userUID) {

    db.collection("konanim").add({
        userUID: userUID,
    })
        // feedback, didn't work for me, but it's not necessary anyway
        // IGNORE this code for now
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}

// replaces shifts with selected user- replaces the other user credentials with my user credentials
function replaceKonan(someUserUID, currentUserUID) {

    // searching for a document that his userEmail == someUserEmail
    db.collection("konanim").where("userUID", "==", someUserUID).get()

        .then(function (querySnapshot) {

            // it means the other user is registered for a shift, so we are replacing him

            // querySnapshot contains the results of the thing we looked for, in this case- when userEmail == someUserEmail, if a user is registered twice in the shifts collection- the query will contain 2 docs, and it's bad (if there is more than one doc it means that a user is registered more than once in the shifts collection)
            var doc = querySnapshot.docs[0];

            var docID = doc.id;

            // updates the document with the current user's credentials
            db.collection("konanim").doc(docID).set({
                userUID: currentUserUID
            })


                .then(function () {

                    console.log("Document successfully written!");
                    location.reload();


                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });


        })

        // IGNORE this code for now
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}


// adds a user to the db collection in name user
function addUser(userUID, phoneNumber, displayname, team) {


    return new Promise((resolve, reject) => {

        db.collection("users").add({
            userUID: userUID,
            phoneNumber: phoneNumber,
            name: displayname,
            team: team
        })

            // feedback, didn't work for me, but it's not necessary anyway
            // IGNORE this code for now
            .then(function (docRef) {
                resolve(userUID);


            })
            .catch(function (error) {
                reject(error);
            });
    });

}


// adds a user with credentials
function getUser(userUID) {

    return new Promise((resolve, reject) => {
        // searching for a document that his userEmail == someUserEmail
        db.collection("users").where("userUID", "==", userUID).get()

            .then(function (querySnapshot) {
                // it means the other user is registered for a shift, so we are replacing him

                // querySnapshot contains the results of the thing we looked for, in this case- when userEmail == someUserEmail, if a user is registered twice in the shifts collection- the query will contain 2 docs, and it's bad (if there is more than one doc it means that a user is registered more than once in the shifts collection)
                var doc = querySnapshot.docs[0];

                resolve(doc.data());
            })

            .catch(function (error) {
                reject(error);
            });
    });
}
function getSoger(week) {

    return new Promise((resolve, reject) => {
        // searching for a document that his userEmail == someUserEmail
        db.collection("sogrim").doc("week" + week).get()

            .then(function (doc) {
                // it means the other user is registered for a shift, so we are replacing him

                // querySnapshot contains the results of the thing we looked for, in this case- when userEmail == someUserEmail, if a user is registered twice in the shifts collection- the query will contain 2 docs, and it's bad (if there is more than one doc it means that a user is registered more than once in the shifts collection)
                // var doc = querySnapshot.docs[0];

                resolve(doc.data());
            })

            .catch(function (error) {
                reject(error);
            });
    });
}
// update the user infos

function edituser(userUID, displayName, team, phoneNumber) {

    // searching for a document that his userEmail == someUserEmail
    db.collection("users").where("userUID", "==", userUID).get()

        .then(function (querySnapshot) {

            // it means the other user is registered for a shift, so we are replacing him

            // querySnapshot contains the results of the thing we looked for, in this case- when userEmail == someUserEmail, if a user is registered twice in the shifts collection- the query will contain 2 docs, and it's bad (if there is more than one doc it means that a user is registered more than once in the shifts collection)
            var doc = querySnapshot.docs[0];

            var docID = doc.id;

            // updates the document with the current user's credentials
            db.collection("users").doc(docID).set({
                name: displayName,
                team: team,
                phoneNumber: phoneNumber,
                userUID: userUID
            })

                // feedback, didn't work for me, but it's not necessary anyway
                // IGNORE this code for now
                .then(function () {
                    console.log("Document successfully written!");
                    location.reload();
                      window.location.replace("index.html");
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });


        })

        // IGNORE this code for now
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}




function editsoger(weekid,week,name) {

        db.collection("sogrim").doc(weekid).set({
            week: week,
            name: name,
            
        })
        .then(function () {
            
            location.reload();
            // alert("dfg");
            
        })

}
 