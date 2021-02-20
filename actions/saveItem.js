const saveItem = ({id, type, description, value}) => {
    return {
        type: gActions.SAVE_ITEM,
        payload: { id, type, description, value }
    };
}

export {saveItem};