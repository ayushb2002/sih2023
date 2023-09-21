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

// function requestItems()
// {
//     itemName = document.getElementById("itemName");
//     itemQty = document.getElementById("itemQty");
//     itemDesc = document.getElementById("itemDesc");

//     if (itemName.value == "" || itemQty.value == "" || itemDesc.value == "")
//         return;

//     nameArr = document.getElementById("itemNameArr");
//     qtyArr = document.getElementById("itemQtyArr");
//     descArr = document.getElementById("itemDescArr");

//     row = document.createElement("tr");
//     col1 = document.createElement("td");
//     data1 = document.createTextNode(itemName.value);
//     col2 = document.createElement("td");
//     data2 = document.createTextNode(itemQty.value);
//     col3 = document.createElement("td");
//     data3 = document.createTextNode(itemDesc.value);
//     col4 = document.createElement("td");
//     data4 = document.createElement("button");
//     data4.classList.add('btn', 'btn-danger')
//     data4.innerHTML = "Delete";

//     data4.onclick = function (e){
//         let clickedBtn = e.target;
//         clickedBtn.closest("tr").remove();
//     }

//     col1.appendChild(data1);
//     col2.appendChild(data2);
//     col3.appendChild(data3);
//     col4.appendChild(data4);

//     row.appendChild(col1);
//     row.appendChild(col2);
//     row.appendChild(col3);
//     row.appendChild(col4);

//     table = document.getElementById("items-table");
//     table.appendChild(row);

//     nameArr.value += `,${itemName.value}`;
//     qtyArr.value += `,${itemQty.value}`;
//     descArr.value += `,${itemDesc.value}`;

//     itemName.value = "";
//     itemQty.value = "";
//     itemDesc.value = "";
// }

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
        console.log(rowIndex);
        itemData.splice(rowIndex, 1);
        console.log(itemData)
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