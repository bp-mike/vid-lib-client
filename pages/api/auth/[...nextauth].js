import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "CustomProvider",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const request = await axios.post(
            `${process.env.APP_API_BASE_URL}/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          if (
            request.data.success &&
            request.data.message === "logged in successfully"
          ) {
            // If the login is successful, directly return the user object
            const user = {
              id: request.data.user.id,
              name: request.data.user.userName,
              email: request.data.user.email,
              avatar: request.data.user.avatar,
              role: request.data.user.role,
              createdAt: request.data.user.createdAt,
            };

            const jwt = request.data.token;

            return { user, jwt};;
          } else {
            // If the login fails, throw an error
            throw new Error(request.data.message);
          }
        } catch (error) {
          // Handle any unexpected errors
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async ({ token, user}) => {
      if(user) {
        token.user = user;
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      session.jwt = token.jwt;
      // delete password from session
      // delete session?.user?.password
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});
