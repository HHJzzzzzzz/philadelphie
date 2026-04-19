import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authSecret =
  process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? "dev-secret";

const fixedAdminEmail = "admin@philadelphie.local";
const fixedAdminPassword = "Admin1234!";
const fixedAdminName = "Administrateur";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase() ?? "";
        const password = credentials?.password?.toString() ?? "";

        // En développement, accepte toutes les connexions
        if (process.env.NODE_ENV === "development") {
          const safeEmail = email || "utilisateur@paroisse.local";
          const displayName = safeEmail === "utilisateur@paroisse.local" ? "Utilisateur" : safeEmail.split("@")[0];

          return {
            id: safeEmail,
            email: safeEmail,
            name: displayName,
          };
        }

        if (!email || !password) return null;

        // Administrateur fixe avec coordonnées connues
        if (email === fixedAdminEmail && password === fixedAdminPassword) {
          return {
            id: "admin",
            email: fixedAdminEmail,
            name: fixedAdminName,
          };
        }

        // En production, vérifie la base de données
        const { prisma } = await import("@/lib/prisma");
        const { compare } = await import("bcryptjs");

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const ok = await compare(password, user.password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
