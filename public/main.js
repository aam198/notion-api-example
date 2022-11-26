const getDataFromBackend = async () => {
  const rest = await fetch("http://localhost:8000/users");
  const data = await rest.json();

  return data;
};

const res = getDataFromBackend();
console.log(res);