import { AuthBindings } from "@refinedev/core";
import { API_URL,dataProvider } from "./data";

export const authCredentials = {
    email: 'kyii@thelord.com',
    password: 'demodemo'
};

export const authProvider : AuthBindings = {
    login: async ({email}) => {
        try {
            // call the login mutation
            // dataProvider.custom is used to make a custom request to GeaphQL API
            // this will call dataProvider which will go through the fetchWrapper function

            const {data} = await dataProvider.custom({
                url: API_URL,
                method: "post",
                headers: {},
                meta: {
                    variables:{email},
                    // pass the email to see if the user exists and if so, return the accessToken 
                    rawQuery:`
                        mutation Login($email: String!){
                            login(loginInput: {email:$email}) {
                                accessToken
                            }
                        }
                    `,
                },
            });

            // save the accessToken in localStorage
            localStorage.setItem('access_token',data.login.accessToken);
            return {
                success: true,
                redirectTo:'/'
            };
        } catch (e){
            const error = e as Error;

            return {
                success: false,
                error: {
                    message: 'message' in error ? error.message : 'Login failed',
                    name: 'name' in error? error.message : 'Invalid email or password'
                },
            };
        }
    },

    // simply remove the accessToken from localStorage for the logout
    logout: async () => {
        localStorage.removeItem('access_token');
        return {
            success: true,
            redirectTo: '/login',
        };
    },

    onError: async (error) => {
        // a check to see if the error is an authentication error
        // if so, set logout to true

        if(error.statusCode === 'UNAUTHENTICATE'){
            return {
                logout: true,
                ...error,
            };
        }

        return {error};
    },

    check: async () => {
        try{
            // get the identify of the user
            // this is to know if the user is authenticate or not
            await dataProvider.custom({
                url:API_URL,
                method:'post',
                headers: {},
                meta: {
                    rawQuery: `
                        query Me {
                            me {
                                name
                            }
                        }
                    `,
                },
            });

            // if the user is authenticate, redirect to the home page
            return {
                authenticated:true,
                redirectTo:'/',
            };
        }catch (error){
            // for any other error,redirect to the login page
            return {
                authenticated:false,
                redirectTo: '/login',
            }
        }
    },

    //get the user information

    getIdentity: async () => {
        const accessToken = localStorage.getItem('access_token');
        try{
            const {data} = await dataProvider.custom<{me:any}>({
                url:API_URL,
                method:'post',
                headers:accessToken
                ? {
                    Authorization: `Bearer ${accessToken}`,
                }
                : {},
                meta:{
                    rawQuery:`
                        query Me {
                            me {
                                id
                                name
                                email
                                phone
                                jobTitle
                                timezone
                                avatorUrl
                            }
                        }
                    `,
                },  
            });
            return data.me;
        } catch (error){
            return undefined;
        }
    }
}

