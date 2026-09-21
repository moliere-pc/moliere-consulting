import { redirectIfConnected } from "./actions";
import { LoginForm } from "./login-form";
import { Wordmark } from "@/components/ui/logo";

export const metadata = { title: "Connexion · Administration MOLIÈRE" };

export default async function LoginPage() {
  await redirectIfConnected();

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(700px 340px at 12% 0%, rgba(217,164,65,0.18), transparent 60%), radial-gradient(620px 320px at 100% 100%, rgba(205,7,30,0.3), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/6 p-8 backdrop-blur-xl sm:p-10">
        <div className="mb-8 flex justify-center">
          <Wordmark light />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
