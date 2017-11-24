function results() {

    $.getJSON("teams", function(data) {

        for (let key in data) {
            if (data.hasOwnProperty(key)) {

                $("#results").append("<div id='" + data[key].id + "'>"  + data[key].id + "</div>")

                // keys.push(key);
                // data.push(obj[key]); // Not necessary, but cleaner, in my opinion. See the example below.
            }
        }

    });
}