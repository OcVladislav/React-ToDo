import React, { useReducer, useRef } from "react";
import TaskCreator from "./TaskCreator";

const initialState = { tasks: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter((_, i) => i !== action.payload),
      };
    case "FULFILLED":
      const copyState = { ...state };
      copyState.tasks = [...state.tasks];
      copyState.tasks[action.payload] = { ...state.tasks[action.payload] };
      copyState.tasks[action.payload].status =
        !state.tasks[action.payload].status;
      return copyState;
    //   return {
    //     ...state,
    //     tasks: state.tasks.map((item, i) => {
    //       if (i === action.payload) {
    //         return { ...item, status: !item.status };
    //       }
    //       return item;
    //     }),
    //   };
    case "DELETE_ALL_FULDILLED_TASKS": {
      return {
        ...state,
        tasks: state.tasks.filter((item) => !item.status && { ...item }),
      };
    }
  }
};

const ContainerTaskCreator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputEl = useRef(null);
  return <TaskCreator state={state} dispatch={dispatch} inputEl={inputEl} />;
};

export default ContainerTaskCreator;
