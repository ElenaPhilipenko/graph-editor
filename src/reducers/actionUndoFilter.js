import equals from 'deep-equal'

function filter (action, currentState, previousHistory) {
    if (equals(currentState, previousHistory)) {
        return false;
    }
    if (action.hasOwnProperty('skip')) {
        return !action.skip;
    }
    return true;
}

export default filter;