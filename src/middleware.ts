import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { routing } from "@/i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

function getSecret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "moliere-dev-secret-7f3a9c21e8b44d06a5f8e1c2b9d73a64"
  );
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes administrateur : jamais traitées par le middleware i18n
  if (pathname.startsWith("/admin")) {
    // La page de connexion reste publique
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }
    const token = request.cookies.get("moliere_session")?.value;
    try {
      if (!token) throw new Error("missing");
      await jwtVerify(token, getSecret());
      return NextResponse.next();
    } catch {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      url.searchParams.set("from", pathname);
      return NextResponse.redirect(url);
    }
  }

  const response = intlMiddleware(request);
  // Expose le chemin demandé aux pages rendues hors segment localisé
  // (notamment la page 404 globale) pour choisir la bonne langue.
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: ["/((?!api|admin/api|uploads|_next|.*\\..*).*)"],
};
