const setItemDone = ({id, currentDate}) => {
    return {
        type: gActions.DONE_ITEM,
        payload: {id, currentDate},
    };
}
const setItemUndone = ({id, currentDate}) => {
    return {
        type: gActions.UNDONE_ITEM,
        payload: {id, currentDate},
    };
}


export {setItemDone, setItemUndone};