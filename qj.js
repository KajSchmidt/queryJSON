class qj {
    constructor(dataset) {
        this.data = dataset;

    }

    query(action) {


    }

    select(action) {
        let output = [];

        if (!Array.isArray(action.table)) {
            action.table = [action.table];
        }
        for (let fromTable of action.table) {
            for (let table of this.data) {
                if (table["name"] == fromTable) {
                    for(let row of table["rows"]) {
                        output.push(row);
                        
                    }
                }
            }
        }

        return output;
    }

    debug(message) {
        console.log(message);
    }
}