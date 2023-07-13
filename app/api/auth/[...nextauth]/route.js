import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user'

const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_SECRET_KEY
        })
      ],
      
      async session({ session }) {
        // store the user id from MongoDB to session
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id.toString();
  
        return session;
      },

      async signIn({profile}){
        try {
            await connectToDB();

            //check user exist
            const userExist = await User.findOne({email: profile.email});

            if(!userExist){
                await User.create({
                    email: profile.email,
                    username: profile.name.replace(' ', '').toLowerCase(),
                    image: profile.image
                })
            }

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
      }
})
export { handler as GET, handler as POST }