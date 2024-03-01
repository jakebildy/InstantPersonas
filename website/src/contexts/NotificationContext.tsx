import React, { createContext, useContext, useState, useRef } from "react";
import NotificationComponent from "../components/Notification";

type NotificationType = "success" | "error" | "warning";

interface Notification {
  message: string;
  type: NotificationType;
  duration: number;
}

interface NotificationContextData {
  showNotification: (
    message: string,
    type: NotificationType,
    duration?: number
  ) => void;
  notification: Notification | null;
  setNotification: (notification: Notification | null) => void;
  show: boolean;
  hide: () => void;
}

const NotificationContext = createContext<NotificationContextData>({
  showNotification: () => {
    return;
  },
  notification: null,
  setNotification: () => {
    return;
  },
  show: false,
  hide: () => {
    return;
  },
});

export function useNotification() {
  return useContext(NotificationContext);
}

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
}: {
  children: any;
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = (
    message: string,
    type: NotificationType,
    duration = 5000
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setNotification({ message, type, duration });
    setShow(true);
    timeoutRef.current = setTimeout(() => setShow(false), duration);
  };

  const hide = () => {
    setShow(false);
  };

  return (
    <NotificationContext.Provider
      value={{ showNotification, notification, setNotification, show, hide }}
    >
      {children}
      <NotificationComponent />
    </NotificationContext.Provider>
  );
};
