function results() {

    $.getJSON("teams", function(data) {

        console.log(data)


        for (let key in data.questions) {

            $("#results-head").append("<td data-sort-method='number'>" + data.questions[key].title + "</td>")
        }

        for (let key in data.teams) {
            if (data.teams.hasOwnProperty(key)) {

                let tr = "<tr id='" + data.teams[key].id + "'>";

                tr += "<td>" + data.teams[key].name + "</td>";

                tr += "<td>" + data.teams[key].id + "</td>";

                for (let key in data.questions) {

                    tr += "<td data-sort-method='thead'>" + 1 + "</td>";
                }

                tr += "</tr>";

                $("#results").append(tr)

                // keys.push(key);
                // data.push(obj[key]); // Not necessary, but cleaner, in my opinion. See the example below.
            }
        }

    });
}