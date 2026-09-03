// this file helps when we need to change backend service so only this file had to change when service changes not to change whole frontend

import config from '../config/config.js' // For projectId and env file url 

import { Client, Account, ID } from "appwrite"; // APPWRITE documentation se 

export class AuthService{
    client = new Client();
    account;

    constructor(){ // Constructor hamesha call hoga object creation ke time
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){ // yeah check krne ke liye ki koi user login hai ya nahi
         try {
            return await this.account.get();
         } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error ", error);
         }

         return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error ", error);
            
        }
    }
} // koi bhi iss class ko access karega toh object create krke krega toh hum ek object bna kr usko hi direct export krva dete hai

const authService = new AuthService(); // Object Creation

export default authService; // har baar ab object export hoga
