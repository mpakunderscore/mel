function results() {

    $.getJSON("teams", function(data) {

        console.log(data)

        $("#results-head").append("<td>Name</td>");
        $("#results-head").append("<td data-sort-method='thead'>Place</td>")

        for (let key in data.questoins) {

            $("#results-head").append("<tr data-sort-method='thead'>" + data.questoins[key] + "</tr>")
        }

        for (let key in data.teams) {
            if (data.teams.hasOwnProperty(key)) {

                let tr = "<tr id='" + data.teams[key].id + "'>";

                tr += "<td>" + data.teams[key].name + "</td>";

                tr += "<td>" + data.teams[key].id + "</td>";

                tr += "</tr>";

                $("#results").append(tr)

                // keys.push(key);
                // data.push(obj[key]); // Not necessary, but cleaner, in my opinion. See the example below.
            }
        }

    });
}