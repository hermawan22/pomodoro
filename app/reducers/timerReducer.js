/*eslint-disable*/
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
} from "../actions/constant";

const initialState = {
  defaultActiveTime: 25,
  activeTime: 0,
  session: 0,
  isBreak: false,
  defaultBreakTime: 5,
  breakTime: 0,
  fourSessionBreakTime: 0
};
const timer = (state = initialState, action) => {
  switch (action.type) {
    case INITIAL:
      return {
        ...state,
        activeTime: state.defaultActiveTime,
        breakTime: state.defaultBreakTime,
        fourSessionBreakTime: state.defaultBreakTime * 2
      };
    case CLEAR:
      return {
        ...state,
        activeTime: 0,
        session: 0,
        isBreak: false,
        breakTime: 0,
        fourSessionBreakTime: 0
      };
    case START_TIMER:
      return {
        ...state,
        activeTime: state.activeTime - 1
      };
    case BREAK_TIME:
      if (state.session % 4 === 0) {
        return {
          ...state,
          fourSessionBreakTime: state.fourSessionBreakTime - 1,
          isBreak: true
        };
      }
      return {
        ...state,
        breakTime: state.breakTime - 1
      };
    case FINISH_ACTIVE_TIME:
      return {
        ...state,
        session: state.session + 1,
        isBreak: true,
        activeTime: state.defaultActiveTime
      };
    case FINISH_BREAK_TIME:
      return {
        ...state,
        activeTime: state.defaultActiveTime,
        isBreak: false,
        breakTime: state.defaultBreakTime,
        fourSessionBreakTime: state.defaultBreakTime * 2
      };
    case PLUS_SESSION:
      return {
        ...state,
        defaultActiveTime: state.defaultActiveTime + 1
      };
    case PLUS_BREAK:
      return {
        ...state,
        defaultBreakTime: state.defaultBreakTime + 1
      };
    case MINUS_SESSION:
      if (state.defaultActiveTime > 0) {
        return {
          ...state,
          defaultActiveTime: state.defaultActiveTime - 1
        };
      }
    case MINUS_BREAK:
      if (state.defaultBreakTime > 0) {
        return {
          ...state,
          defaultBreakTime: state.defaultBreakTime - 1
        };
      }
    default:
      return state;
  }
};

export default timer;
