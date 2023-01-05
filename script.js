const input = document.querySelector(".search");
console.log(input);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();

    document.querySelector(".form").reset();
  }
});
