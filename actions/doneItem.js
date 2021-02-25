const setItemDone = ({id}) => {
    return {
        type: gActions.DONE_ITEM,
        payload: id,
    };
}
const setItemUndone = ({id}) => {
    return {
        type: gActions.UNDONE_ITEM,
        payload: id,
    };
}


export {setItemDone, setItemUndone};