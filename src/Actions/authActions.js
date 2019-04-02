import * as types from './actionTypes'

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {

        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            console.log("ok")
            dispatch({ type: types.SIGNIN_SUCCESS });
        }).catch((err) => {
            console.log("errr")
            dispatch({ type: types.SIGNIN_ERROR, err });
        });

    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();

        firebase.auth().signOut().then(() => {
            dispatch({ type: types.SIGNOUT_SUCCESS })
        });
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then(resp => {
            let user = firestore.collection('users').doc(resp.user.uid);
            return (
                user.set({
                    userName: newUser.userName,
                    initials: newUser.userName[0] + newUser.userName[1]
                })

            )
        }).then(() => {
            dispatch({ type: 'SIGNUP_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'SIGNUP_ERROR', err });
        });
    }
}