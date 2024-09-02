document.addEventListener("DOMContentLoaded", main);
const doc = document;
function main() {
  const input = document.getElementById("inputbox");
  input.addEventListener(
    "keydown",
    (e) => e.key === "Enter" && document.getElementById("send-button").click()
  );
}
