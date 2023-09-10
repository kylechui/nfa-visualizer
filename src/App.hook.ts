import { useCallback, useState } from "react";

type State = { id: string };
type Transition = {
  source: string;
  target: string;
};

const TAG = "_tag";
type UserStatus =
  | {
      [TAG]: "default";
    }
  | {
      [TAG]: "adding";
      state: State;
    };

type AppState = {
  states: State[];
  transitions: Transition[];
  userStatus: UserStatus;
  addState: (state: State) => void;
  addTransition: (transition: Transition) => void;
  handleUserStatus: (userStatus: UserStatus) => void;
};

const useApp = (): AppState => {
  const [userStatus, setUserStatus] = useState<UserStatus>({
    [TAG]: "default",
  });
  const [states, setStates] = useState<State[]>([]);
  const [transitions, setTransitions] = useState<Transition[]>([]);

  const addState = useCallback(
    (state: State) => {
      setStates([...states, state]);
    },
    [states]
  );

  const addTransition = useCallback(
    (transition: Transition) => {
      setTransitions([...transitions, transition]);
    },
    [transitions]
  );

  const handleUserStatus = useCallback((userStatus: UserStatus) => {
    setUserStatus(userStatus);
  }, []);

  return {
    states,
    transitions,
    userStatus,
    addState,
    addTransition,
    handleUserStatus,
  };
};

export default useApp;
