const loadAllPhones = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;

  const response = await fetch(url);
  const data = await response.json();
  displayByName(data.data.slice(0, 10));
};

const displayByName = (phones) => {
  for (const phone of phones) {
    console.log(phone);
    const phoneContainer = document.getElementById("phone-container");
    const div = document.createElement("div");
    div.setAttribute("id", "bgColor");
    div.innerHTML = `
            <img class="h-64 w-64 mx-auto py-3" src=${phone.image} alt=""/>
            <h3 class="px-4">Phone name: ${phone.phone_name}</h3>
            <h3 class= 'px-4 pb-3'> Brand: ${phone.brand}</h3>
            <button onclick="getInfo('${phone.slug}')"  class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 mx-6">More</button>

    `;
    phoneContainer.appendChild(div);
  }
};

const getInfo = (id) => {
  console.log(id);
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((response) => response.json())
    .then((data) => showDetaila(data.data));
};

const showDetaila = (phone) => {
  console.log(phone);
  console.log(phone.mainFeatures.storage);
  const detailContainer = document.getElementById("detail-container");
  const div = document.createElement("div");
  div.setAttribute("id", "bgColor");
  div.innerHTML = `
          <img class="h-64 w-64 mx-auto py-3" src=${phone.image} alt=""/>
          <h3 class="px-4">Phone name: ${phone.phone_name}</h3>
          <h3 class= 'px-4 pb-3'> Brand: ${phone.brand}</h3>
         

  `;
  detailContainer.appendChild(div);
};

loadAllPhones();
