/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  startTimer,
  breakTime,
  finishActiveTime,
  finishBreakTime,
  fourSession,
  initial,
  plusSession,
  plusBreak,
  minusSession,
  minusBreak,
  clear
} from "../actions/timerAction";
import "./app.css";

export const formatTime = time => {
  let min = Math.floor(time / 60);
  let sec = Math.floor(time - min * 60);
  return `${min} : ${sec}`;
};

let time = null;
class App extends Component {
  state = { forColor: "black" };
  clearAll() {
    this.props.dispatch(clear());
    clearInterval(time);
    time = null;
    this.setState({ forColor: "black" });
  }
  startTimer() {
    if (time === null) {
      this.props.dispatch(initial());
    }
    time = setInterval(() => this.props.dispatch(startTimer()), 1000);
    this.setState({ forColor: "black" });
  }
  breakTime() {
    time = setInterval(() => this.props.dispatch(breakTime()), 1000);
    this.setState({ forColor: "black" });
  }
  stopTimer() {
    clearInterval(time);
    this.setState({ forColor: "red" });
  }
  componentDidUpdate() {
    const { timer } = this.props;
    if (timer.activeTime < 0 && timer.isBreak === false) {
      this.stopTimer();
      this.props.dispatch(finishActiveTime());
      this.breakTime();
    }
    if (
      (timer.breakTime < 0 && timer.isBreak === true) ||
      (timer.fourSessionBreakTime < 0 && timer.isBreak === true)
    ) {
      this.stopTimer();
      this.props.dispatch(finishBreakTime());
      this.startTimer();
    }
  }
  renderTimer() {
    const { timer } = this.props;
    if (timer.isBreak) {
      if (timer.session % 2 == 0) {
        return formatTime(timer.fourSessionBreakTime);
      }
      return formatTime(timer.breakTime);
    }
    return formatTime(timer.activeTime);
  }
  render() {
    console.log(time);
    const { timer } = this.props;
    return (
      <div className="wrapper">
        <div className="breakOrWork">
          {time === null
            ? "Standby"
            : timer.isBreak ? "Break Time!" : "Work Time!"}
        </div>
        <div className="menuEachTime">
          <div className="text">Time for each session </div>
          <button onClick={() => this.props.dispatch(minusSession())}>-</button>
          <span className="textMenuTime">{timer.defaultActiveTime}</span>
          <button onClick={() => this.props.dispatch(plusSession())}>+</button>
        </div>
        <div className="menuEachTime">
          <div className="text">Time for each break </div>
          <button onClick={() => this.props.dispatch(minusBreak())}> - </button>
          <span className="textMenuTime">{timer.defaultBreakTime}</span>
          <button onClick={() => this.props.dispatch(plusBreak())}> + </button>
        </div>

        <div style={{ color: this.state.forColor }} className="timeWrapper">
          {this.renderTimer()}
        </div>
        <div className="buttonWrapper">
          <div
            className="buttonMenu"
            onClick={
              timer.isBreak ? () => this.breakTime() : () => this.startTimer()
            }
          >
            start
          </div>
          <div className="buttonMenu" onClick={() => this.stopTimer()}>
            stop
          </div>
          <div className="buttonMenu" onClick={() => this.clearAll()}>
            clear
          </div>
        </div>
        <div>
          <b>session</b> : {timer.session}
        </div>
        <div style={{ fontSize: "16px" }}>
          <b>Note</b> :
          <i>
            if you have finish 4 session, the break time take longer than
            before.
          </i>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timer: state.timerReducer
});

export default connect(mapStateToProps)(App);
