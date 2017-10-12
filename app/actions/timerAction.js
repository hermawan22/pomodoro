import {
  START_TIMER,
  BREAK_TIME,
  FINISH_ACTIVE_TIME,
  FINISH_BREAK_TIME,
  INITIAL,
  PLUS_SESSION,
  PLUS_BREAK,
  MINUS_SESSION,
  MINUS_BREAK,
  CLEAR
} from "./constant";

export const startTimer = () => ({
  type: START_TIMER
});

export const breakTime = () => ({
  type: BREAK_TIME
});

export const finishActiveTime = () => ({
  type: FINISH_ACTIVE_TIME
});

export const finishBreakTime = () => ({
  type: FINISH_BREAK_TIME
});

export const initial = () => ({
  type: INITIAL
});

export const plusSession = () => ({
  type: PLUS_SESSION
});

export const plusBreak = () => ({
  type: PLUS_BREAK
});

export const minusSession = () => ({
  type: MINUS_SESSION
});

export const minusBreak = () => ({
  type: MINUS_BREAK
});

export const clear = () => ({
  type: CLEAR
});
