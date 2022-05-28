import { GoogleAuthProvider, deleteUser, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { navigate } from "svelte-routing";
import { writable } from "svelte/store";

import { User } from "../models/User";
import { auth, firestore } from "./firebase";

type UserAttributes = {
  displayName: string;
  email: string;
};

const userDocPath = (uid: string) => `users/${uid}`;

export const userAttributesStore = writable<UserAttributes>(null);

export const userStore = writable<User | false>(null);

export const signinRequired = () => {
  userStore.subscribe((user) => {
    if (user == false) {
      navigate("/signin", { replace: true });
    }
  });
};

onAuthStateChanged(auth, (user) => {
  const currentUid = user?.uid;
  console.debug(currentUid);
  if (currentUid) {
    const userRef = doc(firestore, `users/${currentUid}`);
    getDoc(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userAttributes = snapshot.data() as UserAttributes;
        userAttributesStore.set(userAttributes);
        userStore.set(new User(currentUid, userAttributes.displayName, userAttributes.email));
      }
    });
  } else {
    console.debug("Not signed in.");
    userStore.set(false);
  }
});

/**
 * Update display name.
 * @param displayName
 * @returns
 */
export const updateDisplayName = (displayName: string): Promise<boolean> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return Promise.reject("User is not signed in.");
  }
  const userRef = doc(firestore, userDocPath(currentUser.uid));
  return getDoc(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      updateDoc(userRef, { displayName });
      userAttributesStore.update((attributes) => Object.assign({}, attributes, { displayName }));
      return true;
    }
    return false;
  });
};

/**
 * Sign in (sign up) by Google account.
 * @returns true if successfully signed in.
 */
export const signIn = (): Promise<boolean> => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  return signInWithPopup(auth, provider)
    .then(({ user }) => {
      let userAttributes: UserAttributes;

      const userRef = doc(firestore, userDocPath(user.uid));
      getDoc(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
          userAttributes = {
            displayName: user.displayName,
            email: user.displayName,
          };
          setDoc(userRef, userAttributes);
        } else {
          const existingUserAttributes = snapshot.data() as UserAttributes;
          userAttributes = Object.assign({}, existingUserAttributes, { email: user.email });
          // Detect email update on sign-in
          if (existingUserAttributes.email != user.email) {
            updateDoc(userRef, { email: user.email });
          }
        }
      });

      userAttributesStore.set(userAttributes);
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

/**
 * Sign out current session.
 */
export const signOut = () => {
  userAttributesStore.set(null);
  auth.signOut();
  navigate("/");
};

/**
 * Delete user.
 */
export const deleteCurrentUser = (): Promise<void> => {
  const currentUser = auth.currentUser;
  if (!currentUser) {
    return Promise.reject("User is not signed in.");
  }
  const userRef = doc(firestore, userDocPath(currentUser.uid));
  return getDoc(userRef).then((snapshot) => {
    if (snapshot.exists()) {
      return deleteDoc(userRef).then(() => deleteUser(currentUser));
    }
    return Promise.reject("No document detected.");
  });
};
