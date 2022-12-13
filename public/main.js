const container = document.getElementById("container");
const newUserButton = document.getElementById("newUserButton");
const closeFormButton = document.getElementById("closeFormButton");
const addUserFormContainer = document.getElementById("addUserFormContainer");



const getDataFromBackend = async () => {
  const rest = await fetch("http://localhost:8000/users");
  const data = await rest.json();

  return data;
};

const res = getDataFromBackend();
  console.log(res);

// Add data to HTML
const addData = async () => {
  // Call for data from function above 
  const data = await getDataFromBackend();

  // Map through each value
  data.forEach((value) => {
    const div = document.createElement("div");
    div.classList.add("userContainer");
    div.innerHTML = `
    <h3>Name: ${value.name}</h3>
    <p>Address: ${value.address}</p>`;
    const del = document.createElement("button");
    del.classList.add("delete");
    del.innerHTML= `
    <i class="fa-solid fa-circle-xmark"></i>`
    container.append(div);
    div.append(del);
  });
};

addData();

// Event Listeners

// New User Add
newUserButton.addEventListener("click", () => {
  // Show modal
  addUserFormContainer.style.display="flex";
  newUserButton.style.display="none";
});

// Close Modal
closeFormButton.addEventListener("click", () => {
  addUserFormContainer.style.display="none";
  newUserButton.style.display="block";
});