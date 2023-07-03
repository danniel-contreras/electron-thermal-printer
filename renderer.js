const { ipcRenderer } = require("electron");

document.getElementById("connectButton").addEventListener("click", () => {
  ipcRenderer.send("test-print", "test");
});
