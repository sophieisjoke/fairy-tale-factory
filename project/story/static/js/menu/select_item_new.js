const observer = new MutationObserver((mutationsList, observer) => {
    // mutationsList.forEach((mutation) => {
    //     if (mutation.addedNodes.length > 0) {
    //         mutation.addedNodes.forEach((node) => {
    //             if (node.classList.contains("auto-group-sqvl-fMn") || node.classList.contains("auto-group-nomn-m9v")) {
    //                 node.addEventListener("click", function () {
    //                     window.location.href = "/story/itemdetails";
    //                 });
    //             } else if (node.classList.contains("group-10-cn7")) {
    //                 node.addEventListener("click", function () {
    //                     window.location.href = "/story/createstory";
    //                 });
    //             }
    //         });
    //     }
    // });
});

const config = { childList: true, subtree: true };
observer.observe(document, config);

function generateItemsFromData() {
    const dataContainer = document.getElementById("data-container");
    const itemElements = Array.from(dataContainer.getElementsByClassName("item-data"));
    const itemListContainer = document.querySelector(".item_list_container");

    itemElements.forEach((element, index) => {
        const itemId = element.getAttribute("data-id");
        const itemName = element.getAttribute("data-name");
        const itemInfo = element.getAttribute("data-info");
        const itemCount = 2;

        var newItemName = document.createElement("div");
        newItemName.className = "item_name";
        newItemName.textContent = index + 1 + ". " + itemName;
        itemListContainer.appendChild(newItemName);
        
        var newItemInfo = document.createElement("div");
        newItemInfo.className = "item_info";
        itemListContainer.appendChild(newItemInfo);

        newItemName.addEventListener("click", function (event) {
            fetchItemInfo(itemId, newItemInfo);
            toggleActiveState(itemListContainer, itemElements, index, newItemName, newItemInfo, itemCount);
        });
    });
}

function fetchItemInfo(id, infoDiv) {
    console.log('fetchItemInfo(id = ' + id + ', infoDiv = ' + infoDiv.textContent + ')')
    fetch("/story/itemdetailsbydata/" + id)
        .then((response) => response.json())
        .then((data) => {
            console.log('data.item_info = ' + data.item_info)
            infoDiv.textContent = data.item_info;
        })
        .catch((error) => console.error("Fetch error:", error));
}

function toggleActiveState(listContainer, elements, curIndex, nameDiv, infoDiv, count) {
    infoDiv.classList.toggle("active");
    nameDiv.style.borderRadius = infoDiv.classList.contains("active") ? "1.75vw 1.75vw 0 0" : "1.75vw";
    
    elements.forEach((el, idx) => {
        if (idx !== curIndex) {
            const otherinfoDiv = listContainer.children[(idx + 1) * count];
            otherinfoDiv.classList.remove("active");
            otherinfoDiv.textContent = '';
            listContainer.children[idx * count + 1].style.borderRadius = "1.75vw";
        } else {
            console.log('index = ' + (idx + 1) * count)
        }
    });
}

generateItemsFromData();