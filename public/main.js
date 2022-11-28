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
    <h3>${value.name}</h3>
    <p>${value.address}</p>`;

    container.append(div);
  });
};

addData();