import StytchContext from "./stytch-context";
import { InstantPersonasUserProvider } from "./user-context";

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StytchContext>
      <InstantPersonasUserProvider> {children}</InstantPersonasUserProvider>
    </StytchContext>
  );
}
