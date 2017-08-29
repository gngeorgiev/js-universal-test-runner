const executeCondition = condition => {
    let val = condition;
    if (typeof condition === 'function') {
        val = condition();
    }

    return val;
};

const when = (condition, taskRaw, runner) => {
    const { fn, args } = runner.getTask(taskRaw);
    const val = executeCondition(condition);

    return Promise.resolve(val).then(result => {
        if (result) {
            return fn(...args);
        }
    });
};

const ifThenElse = (condition, thenTaskRaw, elseTaskRaw, runner) => {
    const thenTask = runner.getTask(thenTaskRaw);
    const elseTask = runner.getTask(elseTaskRaw);

    const val = executeCondition(condition);

    return Promise.resolve(val).then(result => {
        if (result) {
            return thenTask.fn(...thenTask.args);
        }

        return elseTask.fn(...elseTask.args);
    });
};

module.exports = {
    when,
    ifThenElse
};
