import { createContext, useContext, useState, useEffect } from 'react'
import { auth } from '../config/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Cookies from 'js-cookie'

const AuthContext = createContext();

export function AuthContextProvider({children}) {
  const [ user, setUser ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);

  async function login(email, password) {
    try {
      setIsLoading(true);
      const response = await await auth.signInWithEmailAndPassword(auth.getAuth(), email, password);
      await configureSession(response.user);
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function register(email, password) {
    try {
      setIsLoading(true);
      const response = await auth.createUserWithEmailAndPassword(auth.getAuth(), email, password);
      await configureSession(response.user);
    } catch(error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function loginGoogle() {
    try {
      setIsLoading(true);
      const response = await auth.signInWithPopup(auth.getAuth(), new auth.GoogleAuthProvider());
      await configureSession(response.user);
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  async function logout() {
    try {
      setIsLoading(true);
      await auth.getAuth().signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setUser({});
      manageCookie(false)
      setIsLoading(false);
    }
  }

  async function normalizedUser(userData) {
    const token = await userData.getIdToken();

    return {
      uid: userData.uid,
      nome: userData.displayName,
      email: userData.email,
      token,
      provedor: userData.providerData[0]?.providerId,
      imagemUrl: userData.photoURL
    }
  }

  function manageCookie(auth) {
    if (auth) {
      Cookies.set('auth', auth, {
        expires: 7
      })
    } else {
      Cookies.remove('auth')
    }
  }

  async function configureSession(userData) {
    if (userData?.email) {
      const userFormatted = await normalizedUser(userData)
      setUser(userFormatted)
      manageCookie(true)
      return userFormatted.email
    } else {
      setUsuario(null)
      manageCookie(false)
      return false
    }
  }

  useEffect(() => {
    if (Cookies.get('auth')) {
      setIsLoading(true)
      const cancelar = auth.getAuth().onIdTokenChanged(configureSession)
  
      return () => cancelar()
    } else {
      setIsLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ login, register, loginGoogle, logout, user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext);
}