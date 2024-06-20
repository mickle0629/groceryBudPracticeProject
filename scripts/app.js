// Object that represents the stored items on the grocery list.
// .items itself is the array that holds the strings.
// This object is supposed to accurately maintain the current state
// of the grocery list.
const itemsJSON = { items: [] };
const searchBar = document.querySelector(".search-bar__form");
document.onload = displayItems();

searchBar.addEventListener("submit", (e) => {
  const data = new FormData(e.target);
  // console.log(...data.values());
  addItemToLocal(...data.values());
  displayItems();
})

/**
 * 
 * @param {*} newItem (string) the new grocery item to be added.
 */
function addItemToLocal(newItem) {
  //TODO: Check if an item is already there with the same name
  //read from local storage to obtain accurate state
  readFromLocal();
  //placeholder object to store new item
  const newItemObj = {
    itemName: newItem
  }
  //push new item to item list
  itemsJSON.items.push(newItemObj);
  // console.log("New Item: ", JSON.stringify(newItemObj));
  // console.log("Current Items List: ", JSON.stringify(itemsJSON)); 
  localStorage.setItem("all-items", JSON.stringify(itemsJSON));
}

/**
 * Reads from localStorage all currently stored grocery items.
 * Makes sure itemsJSON is updated.
 */
function readFromLocal() {
  console.log("ItemJSON:", itemsJSON)
  itemsJSON.items = JSON.parse(localStorage.getItem("all-items")).items;
}

/**
 * Displays currently stored grocery items.
 */
function displayItems() {
  readFromLocal();
  const itemsSection = document.querySelector(".grocery-items");
  itemsSection.innerHTML = ""; //resets the itemSection div
  //add each item from itemsJSON into the DOM, w/ buttons for del and edit.
  itemsJSON.items.forEach(item => {
    itemsSection.innerHTML += `
    <div class="grocery-item-container">
      <span class="grocery-item-container__item-name">${item.itemName}</span>
      <button class="grocery-item-container__del-btn">Delete</button>
      <button class="grocery-item-container__edit-btn">Edit</button>
    </div>
  `
  });
}

const itemDeleteBtns = document.querySelectorAll(".grocery-item-container__del-btn");
// console.log(itemDeleteBtn);
//add an event listener for every delete button in the DOM.
itemDeleteBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    readFromLocal();
    const currentItemName = e.target.previousElementSibling.innerHTML;
    console.log(currentItemName);
    deleteItem(currentItemName);
    displayItems();
  })
});

function deleteItem(itemName) {
  const indexItemRemoved = itemsJSON.items.findIndex((item) => {
    console.log("item variable in the indexItemRemoved findindex callback:", item.itemName)
    return item.itemName === itemName;
  });

  console.log("indexItemRemoved:", indexItemRemoved);
  if (indexItemRemoved !== -1) {
    itemsJSON.items.splice(indexItemRemoved, 1);
  }
  console.log(`ItemsJSON post-removal of ${itemName} @ index ${indexItemRemoved}:`, itemsJSON)
  localStorage.setItem("all-items", JSON.stringify(itemsJSON));
  location.reload()
}