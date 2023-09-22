function getLocation() {

    x = document.getElementById("coordinateField");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.value = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.value = "Latitude: " + position.coords.latitude + " Longitude: " + position.coords.longitude;
}

let itemData = [];

function requestItems() {
    const itemName = document.getElementById("itemName");
    const itemQty = document.getElementById("itemQty");
    const itemDesc = document.getElementById("itemDesc");

    if (itemName.value === "" || itemQty.value === "" || itemDesc.value === "") {
        return;
    }

    const newItem = {
        name: itemName.value,
        quantity: itemQty.value,
        description: itemDesc.value,
    };

    itemData.push(newItem);

    const table = document.getElementById("items-table");
    const row = table.insertRow();
    
    for (let key in newItem) {
        const cell = row.insertCell();
        cell.appendChild(document.createTextNode(newItem[key]));
    }

    const deleteButton = document.createElement("button");
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.setAttribute("type", "button");
    deleteButton.innerHTML = "Delete";

    deleteButton.onclick = function () {
        const rowIndex = this.parentElement.parentElement.rowIndex-1;
        itemData.splice(rowIndex, 1);
        table.deleteRow(rowIndex);
    };

    const cell = row.insertCell();
    cell.appendChild(deleteButton);

    itemName.value = "";
    itemQty.value = "";
    itemDesc.value = "";
}

function freezeItems()
{
    alert('Freezing items... deleted items will still be requested now!')
    nameArr = document.getElementById("itemNameArr");
    qtyArr = document.getElementById("itemQtyArr");
    descArr = document.getElementById("itemDescArr");

    let a = "";
    let b = "";
    let c = "";
    for (var i = 0; i < itemData.length; i++)
    {
        a += itemData[i].name + ',';
        b += itemData[i].quantity + ',';
        c += itemData[i].description + ',';
    }

    a = a.slice(0, -1);
    b = b.slice(0, -1);
    c = c.slice(0, -1);
    nameArr.value = a;
    qtyArr.value = b;
    descArr.value = c;

    document.getElementById('freeze').remove();
}

let helpData = [];

function requestHelp() {
    const category = document.getElementById("category");

    if (category.value === "") {
        return;
    }

    helpData.push(category.value);

    const table = document.getElementById("categoryStore");
    const row = table.insertRow();
    
    const cell = row.insertCell();
    cell.appendChild(document.createTextNode(category.value));

    const deleteButton = document.createElement("button");
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.setAttribute("type", "button");
    deleteButton.innerHTML = "Delete";

    deleteButton.onclick = function () {
        const rowIndex = this.parentElement.parentElement.rowIndex-1;
        helpData.splice(rowIndex, 1);
        table.deleteRow(rowIndex);
    };

    const cell1 = row.insertCell();
    cell1.appendChild(deleteButton);

    category.value = "";
}

function freezeHelp()
{
    alert('Freezing categories... deleted categories will still be considered now!')
    categories = document.getElementById("categories");

    let a = "";

    for (var i = 0; i < helpData.length; i++)
    {
        a += helpData[i] + ',';
    }

    a = a.slice(0, -1);
    categories.value = a;

    document.getElementById('freeze').remove();
}