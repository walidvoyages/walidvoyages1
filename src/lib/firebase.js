import {initializeApp,getApps,getApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
export const config={
 apiKey:'AIzaSyAdbjK1qmVS7Om1qLXr7NtUDhU0RfScIn4',
 authDomain:'walidvoyages-13332.firebaseapp.com',
 databaseURL:'https://walidvoyages-13332-default-rtdb.firebaseio.com',
 projectId:'walidvoyages-13332',
 storageBucket:'walidvoyages-13332.firebasestorage.app',
 messagingSenderId:'1037120577066',
 appId:'1:1037120577066:web:3aebac424185905ee7ed53',
 measurementId:'G-NERFLGHG83'
};
const app=getApps().length?getApp():initializeApp(config);
export const auth=getAuth(app);export const db=getDatabase(app);
