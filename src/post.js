function addContent() {
    const name = document.getElementById("name").value;
    const score = document.getElementById("score").value;
  
    const newContent = document.createElement("div");
    newContent.innerHTML = `<p>${name}: ${score}</p>`;
  
    const dynamicDisplay = document.getElementById("dynamicDisplay");
    dynamicDisplay.appendChild(newContent);
  }

const submitButton = document.querySelector('input[type="button"]');
submitButton.addEventListener("click", addContent);