import React, { useCallback, useContext, useId, useMemo } from "react";
import style from "./TaskCreator.module.css";
import { ThemeFontContext } from "../App";

const TaskCreator = (props) => {
  const theme = useContext(ThemeFontContext);
  const id = useId();

  const calculatedCount = useMemo(() => {
    return props.state.tasks.filter((item) => item.status).length;
  }, [props.state.tasks]);

  //hook UseCallback
  // const getCalculatedCount = (arr) => {
  //   return arr.filter((item) => item.status).length;
  // };

  // const memoizedCallback = useCallback(() => {
  //   return getCalculatedCount(props.state.tasks);
  // }, [props.state.tasks]);

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      if (props.inputEl.current.value.trim() !== "") {
        props.dispatch({
          type: "ADD",
          payload: { text: props.inputEl.current.value, status: false },
        });
        props.inputEl.current.value = "";
      }
    }
  };

  const deleteTask = (i) => {
    props.dispatch({ type: "DELETE", payload: i });
  };

  const fulfilledTask = (i) => {
    props.dispatch({ type: "FULFILLED", payload: i });
  };

  const deleteAllFulfilledTasks = useCallback(() => {
    return props.dispatch({ type: "DELETE_ALL_FULDILLED_TASKS" });
  }, []);

  return (
    <div>
      <div className={style.task_creator_form}>
        {!props.state.tasks[0] && (
          <label htmlFor={id} className={style.task_creator_label}>
            Do you have tasks today?
          </label>
        )}
        <input
          id={id}
          className={style.taskCreator}
          type="text"
          ref={props.inputEl}
          placeholder="Create a new todo"
          onKeyDown={onKeyDownHandler}
        />
      </div>
      <div>
        {props.state.tasks.map((item, i) => (
          <div key={Math.random()} className={style.taskbar}>
            <div>
              <>
                <input
                  id={i}
                  className={style.check_box}
                  type="checkbox"
                  checked={item.status}
                  onChange={() => fulfilledTask(i)}
                />
                <label htmlFor={i}></label>
              </>
              <input
                className={style.task_input}
                disabled={true}
                value={item.text.trim()}
              />
            </div>
            <button className={style.btn_taskbar} onClick={() => deleteTask(i)}>
              ✖
            </button>
          </div>
        ))}
      </div>
      {props.state.tasks[0] && (
        <div className={style.footer}>
          <div
            className={style.done_task_counter}
            style={{ color: theme.fontColor }}
          >
            Fulfilled Tasks : {calculatedCount}
            {/* if hookUseCallback */}
            {/* MemorizedTask : {memoizedCallback()} */}
          </div>
          <button
            className={style.btn_footer}
            onClick={deleteAllFulfilledTasks}
          >
            Delete all fulfilled tasks
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskCreator;
