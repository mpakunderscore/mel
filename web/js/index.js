function openJoin() {
    document.getElementById('join').style.display = 'block';
}

function startGame() {
    document.getElementById('join').style.display = 'none';

    let name = document.getElementById('join').getElementsByClassName('field')[0].innerText;

    $.get("team/create/" + name, function(data) {

        closeAnswer();

        localStorage.setItem("team", name)
    });
}

function closeJoin() {
    document.getElementById('join').style.display = 'none';
}

function clearField(block) {
    block.innerText = "";
}