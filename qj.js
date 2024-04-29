/*

    dataset = [
        {
            "name" = "",
            "rows" = []
        }
    ]

*/

class qj {
    constructor(dataset) {
        this.data = dataset

    }

    /*
    query = {
        "tables":[],
        "columns":[]
    }
    */


    select(query) {
        if (!query) { throw new Error("No query found."); }
        if (!query["tables"]) { throw new Error("No tables found in query.") }
        if (!Array.isArray(query["tables"])) { query["tables"] = [query["tables"]] }
        if (query["columns"] && !Array.isArray(query["columns"])) { query["columns"] = [query["colums"]] }
        
        let dataset = this.data
        let output = []
        
        for (let table of dataset) {
            if (query["tables"].includes(table["name"])) {

                if (query["sort"]) {
                    this.sortby(table["rows"], query["sort"])
                }


                for (let row of table["rows"]) {
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

    sortby(dataset, sort, level = 0) {
        
        var by = sort[level]

        this.debug(level)

        dataset.sort((a, b) => {
            let a_sort
            let b_sort
            if (isNaN(a[by]) || isNaN(b[by])) {
                a_sort = a[by].toUpperCase() 
                b_sort = b[by].toUpperCase() 
            }
            else {
                a_sort = a[by]
                b_sort = b[by]
            }
            if (a_sort < b_sort)  {
              return -1;
            }
            else if (a_sort > b_sort) {
              return 1
            }
            else {
                return 0
            }
          });
    }

    debug(message) {
        console.log(message)
    }
}