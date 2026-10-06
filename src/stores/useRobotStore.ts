import { useState, useEffect } from 'react';

export type RobotState =
  | 'IDLE'
  | 'LISTENING'
  | 'THINKING'
  | 'SPEAKING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'ERROR';

interface RobotStoreState {
  state: RobotState;
  customMessage?: string;
}

let currentState: RobotStoreState = {
  state: 'IDLE',
};

const listeners = new Set<(state: RobotStoreState) => void>();

export const setRobotState = (state: RobotState, customMessage?: string) => {
  currentState = { state, customMessage };
  listeners.forEach((fn) => fn(currentState));
};

export const triggerRobotPulse = (nextState: RobotState, durationMs = 2500, returnState: RobotState = 'IDLE') => {
  setRobotState(nextState);
  setTimeout(() => {
    setRobotState(returnState);
  }, durationMs);
};

export const useRobot = () => {
  const [robot, setRobot] = useState<RobotStoreState>(currentState);

  useEffect(() => {
    const listener = (newVal: RobotStoreState) => setRobot(newVal);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  return {
    robotState: robot.state,
    customMessage: robot.customMessage,
    setRobotState,
    triggerRobotPulse,
  };
};
