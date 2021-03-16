const sort = (items) => {
    return items.sort((a, b) => {
        // Get due dates to compare
        let dueDateA = moment(a.due_date);
        let dueDateB = moment(b.due_date);

        // Check if is after
        let isAfter = dueDateA.isAfter(dueDateB, 'days');
        if(isAfter) return 1;

        // Check if is before
        let isBefore = dueDateA.isBefore(dueDateB, 'days');
        if(isBefore) return -1;

        // Sort by alphabetic order
        return a.description.localeCompare(b.description);
    });
}

export default sort;