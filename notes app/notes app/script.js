let notes =
    JSON.parse(localStorage.getItem("notes")) || [];

window.onload = () => {

    const user =
        localStorage.getItem("notesUser");

    if (user) {
        showNotesPage(user);
    }
};

function login() {

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if (username === "" || password === "") {
        alert("Enter Username and Password");
        return;
    }

    localStorage.setItem(
        "notesUser",
        username
    );

    showNotesPage(username);
}

function logout() {

    localStorage.removeItem("notesUser");

    location.reload();
}

function showNotesPage(username) {

    document.getElementById("loginBox")
        .style.display = "none";

    document.getElementById("notesBox")
        .style.display = "block";

    document.getElementById("user")
        .innerText = username;

    displayNotes();
}

function addNote() {

    const text =
        document.getElementById("noteInput").value;

    if (text === "") {
        alert("Enter a note");
        return;
    }

    notes.push(text);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    document.getElementById("noteInput").value = "";

    displayNotes();
}

function deleteNote(index) {

    notes.splice(index, 1);

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

    displayNotes();
}

function editNote(index) {

    const updated =
        prompt("Edit Note", notes[index]);

    if (updated !== null) {

        notes[index] = updated;

        localStorage.setItem(
            "notes",
            JSON.stringify(notes)
        );

        displayNotes();
    }
}

function displayNotes() {

    const notesList =
        document.getElementById("notesList");

    notesList.innerHTML = "";

    notes.forEach((note, index) => {

        notesList.innerHTML += `
        <div class="note">
            <p>${note}</p>

            <button onclick="editNote(${index})">
                Edit
            </button>

            <button onclick="deleteNote(${index})">
                Delete
            </button>
        </div>
        `;
    });
}

function searchNotes() {

    const search =
        document.getElementById("search")
            .value.toLowerCase();

    const allNotes =
        document.querySelectorAll(".note");

    allNotes.forEach(note => {

        if (
            note.innerText
                .toLowerCase()
                .includes(search)
        ) {
            note.style.display = "block";
        }
        else {
            note.style.display = "none";
        }
    });
}