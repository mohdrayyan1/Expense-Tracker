import { AppBar, Avatar, Button, Toolbar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import firebase from 'firebase'
import { auth, db } from './firebase';
import Error from './Components/Error';
import Home from './Components/Home';

var provider = new firebase.auth.GoogleAuthProvider();


const App = () => {

  const [id, setId] = useState()
  const [user, setUser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser)
      }
      db.collection("users").where("email", "==", authUser.email)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            setId(doc.id)
          });
        });
    })
  }, [user])


  const signIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        setUser(result.user)
        db.collection("users").where("email", "==", result.user.email)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              db.collection("users").add({
                email: result.user.email,
                income: 0,
                expense: 0,
                cashInHand: 0
              })
                .then((docRef) => {
                  setId(docRef.id)
                  console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                  console.error("Error adding document: ", error);
                });
            }
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              if (doc.exists) {
                setId(doc.id)
                console.log("Document exists with id = ", doc.id)
              }
            })
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          });
      })
      .catch(error => alert(error.message))
  }

  const signOut = () => {
    auth.signOut()
      .then(() => {
        setUser('')
        console.log("Successfully signed out")
      })
      .catch(error => console.log(error.message))
  }

  return (
    <>
      <div className="app">
        <AppBar color="transparent" position="static">
          <Toolbar>
            <div className="profile-container">
              {(user) ? (
                <>
                  <Avatar alt={user.displayName} src={user.photoURL} />
                  <p className="displayName">{user.displayName}</p>
                  <Button variant="contained" color="secondary" onClick={signOut}>Sign Out</Button>
                </>
              ) : (
                <>
                  <Button onClick={signIn}>Sign In</Button>
                  <Button onClick={signIn}>Sign Up</Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* {user ? <Home /> : <Error />} */}
      <Home user={user} id={id} />
    </>
  );
}

export default App;
