
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: "jobseeker" | "company";
    };
  }

  interface User {
    role?: "jobseeker" | "company";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "jobseeker" | "company";
  }
}
