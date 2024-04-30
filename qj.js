
/*********************************
 * Class: qj()
 * 
 * 
 ********************************/

class qj {
    constructor(dataset) {
        /*
            dataset = [
                {
                    "name" = "",
                    "rows" = [
                        {}
                    ]
                }
            ]
        */
        this.data = dataset

    }


/*********************************
 * Method: select()
 * 
 * Skickar tillbaka en array av objects utifrån angivna parametrar.
 ********************************/

    select(query) {
        /*
            query = {
                "tables":[],
                "columns":[],
                "filters":[]
            }
        */
        if (!query) { throw new Error("No query."); }
        if (!query["tables"]) { throw new Error("No tables in query.") }
        if (!Array.isArray(query["tables"])) { query["tables"] = [query["tables"]] }
        if (query["columns"] && !Array.isArray(query["columns"])) { query["columns"] = [query["columns"]] }
        if (query["filters"] && !Array.isArray(query["filters"])) { query["filters"] = [query["filters"]] }


        let dataset = JSON.parse(JSON.stringify(this.data)) //Undviker att skicka objektreferenser
        let output = []
        
        for (let table of dataset) {
            if (query["tables"].includes(table["name"])) {
                let rows = table["rows"];

                if (query["filters"]) { //Filtrerar bort alla rows som inte passar filtren
                    for (let filter of query["filters"]) {
                        rows = rows.filter(filterRows => eval("filterRows." + filter))
                    }     
                }
                for (let row of rows) {
                    if (!query["columns"]) { //Hämtar hela raden
                        output.push(row) 
                    }
                    else { //Hämtar bara vissa kolumner
                        let partialRow = {};
                        for (let column of query["columns"]) {
                            if (row[column]) { partialRow[column] = row[column] } //Kollar att kolumnen faktiskt existerar
                        }
                        output.push(partialRow)
                    }
                }
            }
        }

        return output
    }


/*********************************
 * Method: create()
 * 
 * Skapar en ny tabell
 ********************************/

    create(query) {
        /*
            query = {
                "name":""
            }
        */
        if (!query) { throw new Error("No query."); }
        if (!query["name"]) { throw new Error("No name in query.") }

        let newTable = {
            "name":query.name,
            "rows":[]
        }

        for (let oldTable of this.data) {
            if (newTable["name"] == oldTable["name"]) { throw new Error("Table name in use") }
        }

        this.data.push(newTable)


    }


    debug(message) {
        console.log(message)
    }
}