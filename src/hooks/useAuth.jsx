import { auth } from '../firebase/firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth'; 

function useAuth() {
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          console.log(userCredential.user);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const register = (email, password, firstName, lastName, phoneNumber) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User registered successfully
        const user = userCredential.user;

        // Set the display name and phone number
        updateProfile(user, { displayName: firstName })
          .then(() => {
            console.log('Display name set:', user.displayName);
          })
          .catch((error) => {
            console.error('Error setting display name:', error);
          });
      })
      .then(() => {
        // Additional actions after successful registration
      })
      .catch((error) => {
        // Handle registration errors
      });
  };

  return({
    login,
    register
  });

}

export default useAuth;