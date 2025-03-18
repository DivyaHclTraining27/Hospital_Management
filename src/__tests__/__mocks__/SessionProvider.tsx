import React, { ReactNode } from "react";

interface User {
  id: string;
  name: string;
}

interface Session {
  user: User;
  isAuthenticated: boolean;
  login: jest.Mock;
  logout: jest.Mock;
}

const SessionContext = React.createContext<Session | undefined>(undefined);

const mockSession: Session = {
  user: { id: "123", name: "John Doe" },
  isAuthenticated: true,
  login: jest.fn(),
  logout: jest.fn(),
};

const SessionProvider = ({ children }: { children: ReactNode }) => (
  <SessionContext.Provider value={mockSession}>
    {children}
  </SessionContext.Provider>
);

export { SessionProvider, SessionContext };
