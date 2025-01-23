const solution = (tickets) => {
    const visited = new Map();
    tickets.forEach((ticket) => {
        visited.set(ticket, false);
    });

    const path = [];
    const backtrack = (nextAirport) => {
        if (path.length === tickets.length) {
            throw path;
        }

        const availableTickets = tickets
            .filter(
                (ticket) => !visited.get(ticket) && ticket[0] === nextAirport
            )
            .sort((a, b) => a[1].localeCompare(b[1]));

        availableTickets.forEach((ticket) => {
            path.push(ticket[1]);
            visited.set(ticket, true);

            backtrack(ticket[1]);

            path.pop();
            visited.set(ticket, false);
        });
    };

    try {
        backtrack("ICN");
    } catch (path) {
        return ["ICN", ...path];
    }
};
