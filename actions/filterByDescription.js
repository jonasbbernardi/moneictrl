const filterByDescription = (text) => {
    return {
        type: gActions.FILTER_BY_DESCRIPTION,
        payload: {description: text}
    };
}

export {filterByDescription};