class qj {
    constructor(dataset) {
        this.data = dataset;

    }

    /*
    query = {
        "tables":[],
        "columns":[]
    }

    */


    select(query) {
        if (!query) { throw new Error("No query found."); }
        if (!query["tables"]) { throw new Error("No tables found in query."); }
        if (!Array.isArray(query["tables"])) { throw new Error("Tables must be an Array."); }
        if (query["columns"] && !Array.isArray(query["columns"])) { throw new Error("Columns must be an Array."); }
        
        
        let output = [];
        
        for (let from of query["tables"]) {
            for (let table of this.data) {
                if (table["name"] == from) {
                    for (let row of table["rows"]) {
                        if (!query["columns"]) {
                            output.push(row);
                        }
                        else {
                            let partialRow = {};
                            for (let column of query["columns"]) {
                                if (row[column]) { partialRow[column] = row[column]; }
                            }
                            output.push(partialRow);
                        }
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