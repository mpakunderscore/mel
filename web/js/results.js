function results() {

    $.getJSON("teams", function(data) {

        console.log(data)


        for (let key in data.questions) {

            $("#results-head").append("<td data-sort-method='number'>" + data.questions[key].title + "</td>")
        }

        for (let i in data.teams) {
            if (data.teams.hasOwnProperty(i)) {

                let tr = "<tr id='" + data.teams[i].id + "'>";

                tr += "<td>" + data.teams[i].name + "</td>";

                tr += "<td>" + data.teams[i].id + "</td>";



                for (let j in data.questions) {

                    if (data.teams[i].answers !== undefined && data.teams[i].answers[j] !== undefined) {

                        if (data.teams[i].answers[j].success)
                            tr += "<td data-sort-method='thead' class='green'>" + data.teams[i].answers[j].attempts + "</td>";

                        else
                            tr += "<td data-sort-method='thead'>" + data.teams[i].answers[j].attempts + "</td>";

                    } else {

                        tr += "<td data-sort-method='thead'>" + 0 + "</td>";
                    }
                }

                tr += "</tr>";

                $("#results").append(tr)

                // keys.push(key);
                // data.push(obj[key]); // Not necessary, but cleaner, in my opinion. See the example below.
            }
        }

    });
}