const socket = io.connect("http://localhost:4000");

// dom

const message = document.getElementById("message");
const btn = document.getElementById("send");
const output = document.getElementById("output");

btn.addEventListener("click", function () {
  if (!message.value) {
    alert("please type a message!");
  } else {
    socket.emit("chat", {
      message: message.value,
    });
    message.value = "";
  }
});

message.addEventListener("keypress", function (e) {
  if (e.keyCode == 13) {
    if (!message.value) {
      alert("please type a message!");
    } else {
      socket.emit("chat", {
        message: message.value,
      });
      message.value = "";
    }
  }
});

// listen for events

socket.on("chat", function (data) {
  output.innerHTML += `<p><strong>${data.nick}</strong> ${data.data.message}</p>`;
});
