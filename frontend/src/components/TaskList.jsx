import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import TaskItem from './TaskItem';
import { getAllTasks } from '../redux/task/action';

const TaskList = () => {
  const dispatch = useDispatch();
  const {tasks,isLoading,isError} = useSelector(state => state.taskReducer);
console.log(tasks)
  useEffect(() => {
    dispatch(getAllTasks);
  }, [dispatch]);

  return (
    <div className="container mx-auto my-8">
    

      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <div>
          {tasks.map(task => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
