import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Simulasi login manual, bisa diganti autentikasi database di sini
        if (credentials?.email && credentials?.password) {
          return {
            id: "1",
            name: "alun",
            email: credentials.email,
            role: credentials.email.includes("company") ? "company" : "jobseeker",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Menyimpan data role ke dalam token saat login
      if (user) {
        token.role = (user as any).role || "jobseeker";
      }
      return token;
    },
    async session({ session, token }) {
      // Menyalin role dari token ke session agar bisa dipakai di front-end
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };
