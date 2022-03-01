const loadAllPhones = async () => {
  toggleSpinner("block");
  const searchText = findPhone();
  console.log(searchText);
  /* const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`; */
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;

  const response = await fetch(url);
  const data = await response.json();
  displayByName(data.data.slice(0, 20));
};

const displayByName = (phones) => {
  document.getElementById("phone-container").textContent = "";

  for (const phone of phones) {
    console.log(phone);
    const phoneContainer = document.getElementById("phone-container");
    const searchPhoneModel = (document.getElementById("search-text").value =
      "");
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
  toggleSpinner("none");
};

// Get the phone name
const findPhone = () => {
  const searchPhoneModel = document.getElementById("search-text").value;
  return searchPhoneModel.toUpperCase();
};

const getInfo = (id) => {
  //console.log(id);
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((response) => response.json())
    .then((data) => showDetaila(data.data));
};
// Show phone detail information
const showDetaila = (phone) => {
  //console.log(phone);
  document.getElementById("detail-container").textContent = "";
  console.log(phone.mainFeatures.storage);
  const detailContainer = document.getElementById("detail-container");
  const div = document.createElement("div");
  div.setAttribute("id", "bgColor");
  let releaseDate = phone.releaseDate
    ? phone.releaseDate
    : "release date is not found";
  console.log(releaseDate);
  div.innerHTML = `
          <img class="h-64 w-64 mx-auto py-3" src=${phone.image} alt=""/>
         <div class='flex justify-center items-center'>
         <div>
         <h3 class="px-4">Phone name: ${phone.name}</h3>
         <h3 class= 'px-4 pb-3'> Brand: ${phone.brand}</h3>
         <h3 class= 'px-4 pb-3'> Release Date: ${releaseDate}</h3>
         </div>
         <div>
         <h3 class= 'px-4 pb-3'> Storage: ${phone.mainFeatures.storage}</h3>
         <h3 class= 'px-4 pb-3'> Chipset: ${phone.mainFeatures.chipSet}</h3>
         <h3 class= 'px-4 pb-3'> Sensors: ${phone.mainFeatures.sensors}</h3>
         
         </div>
         </div>
         </div>
         

  `;
  detailContainer.appendChild(div);
};

const toggleSpinner = (displayStyle) => {
  document.getElementById("loader").style.display = displayStyle;
};

loadAllPhones();
