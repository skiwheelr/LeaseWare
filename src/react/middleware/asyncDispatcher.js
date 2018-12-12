
export const asyncDispatcher = ({dispatch}) => next => action => {

  let syncActivityFinished = false;
  let actionQueue = [];
    
  function flushQueue() {
    actionQueue.forEach(a => dispatch(a)); // flush queue
    actionQueue = [];
  }
    
  function asyncDispatch(asyncAction) {
    actionQueue = actionQueue.concat([asyncAction]);

    if (syncActivityFinished) {
      flushQueue();
    }
  }

  const actionWithAsyncDispatch =
    Object.assign({}, action, { asyncDispatch });

  const res = next(action);

  syncActivityFinished = true;
  flushQueue();

  return res;
};
