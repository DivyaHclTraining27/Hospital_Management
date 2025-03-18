import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    signOut: "/register",
  },
});

export const config = {
  matcher: ["/job/create", "/applications", "/users/dashboard"],
};
