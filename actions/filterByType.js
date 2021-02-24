const filterByType = (type) => {
    return {
        type: gActions.FILTER_BY_TYPE,
        payload: {type}
    };
}

export {filterByType};