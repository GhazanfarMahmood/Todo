"use strict";
const inputData = document.querySelector("input");
const addBtn = document.querySelector(".mainContent .input-field form > :last-child");
const content = document.querySelector(".content");
const form = document.querySelector("form");
const dataToShow = document.querySelector(".allData");
const deleteAllBtn = document.querySelector(".mainContent .delAll");
// Parse localStorage and ensure the correct type
let array = JSON.parse(localStorage.getItem("value-1") || "[]");
// Parse stored count safely
let storedCount = localStorage.getItem("count");
let parsedCount = storedCount !== null ? JSON.parse(storedCount) : null;
// Compute count with proper type checking
let count = typeof parsedCount === "number"
    ? parsedCount
    : (array.length > 0 ? Math.max(...array.map(item => item.key)) + 1 : 0);
let arr2 = JSON.parse(localStorage.getItem("arr-2") || "[]");
localStorage.setItem("count", JSON.stringify(count));
// Function to add data to the DOM
const addDataToDOM = () => {
    // Clear the existing DOM content
    dataToShow.innerHTML = "";
    // Render items from the first array (array)
    array.forEach((item) => {
        const box = document.createElement("div");
        box.classList.add("box");
        box.id = item.key.toString();
        box.innerHTML = `
            <div class="textContent">
                <div>
                    <span class="checked"></span>
                </div>
                <h1>${item.value}</h1>
            </div>
            <div class="btnContent">
                <button><span class="material-icons">edit</span></button>
                <button><span class="material-icons">delete</span></button>
            </div>`;
        dataToShow.appendChild(box);
    });
    // Render items from the second array (arr2)
    arr2.forEach((item) => {
        const box = document.createElement("div");
        box.classList.add("box", "box-2"); // Add both classes
        box.id = item.key.toString();
        box.innerHTML = `
            <div class="textContent">
                <div>
                    <span class="checked"></span>
                </div>
                <h1>${item.value}</h1>
            </div>
            <div class="btnContent">
                <button><span class="material-icons">edit</span></button>
                <button><span class="material-icons">delete</span></button>
            </div>`;
        dataToShow.appendChild(box);
    });
};
// Show stored data when the page loads
addDataToDOM();
// Prevent page reload on form submit
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => {
    e.preventDefault();
});
// Add new data
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", () => {
    if (inputData === null || inputData === void 0 ? void 0 : inputData.value.trim()) {
        const obj = {
            key: count, // Assign the correct key
            value: inputData.value
        };
        array.push(obj);
        count++; // Increment count
        // Update localStorage
        localStorage.setItem("count", JSON.stringify(count));
        localStorage.setItem("value-1", JSON.stringify(array));
        // Update UI
        addDataToDOM();
        // Clear input field
        inputData.value = "";
        form === null || form === void 0 ? void 0 : form.reset();
        content.style.display = "none";
        dataToShow.style.display = "flex";
        inputData === null || inputData === void 0 ? void 0 : inputData.removeAttribute("required");
    }
    else {
        inputData === null || inputData === void 0 ? void 0 : inputData.setAttribute("required", "");
        console.log("Please enter a value");
    }
    if (dataToShow.style.display === "flex") {
        deleteAllBtn.style.display = "flex";
    }
});
// Delete all data
deleteAllBtn === null || deleteAllBtn === void 0 ? void 0 : deleteAllBtn.addEventListener("click", () => {
    array = [];
    arr2 = [];
    localStorage.setItem("value-1", JSON.stringify(array));
    localStorage.setItem("arr-2", JSON.stringify(arr2));
    count = 0;
    localStorage.setItem("count", JSON.stringify(0));
    localStorage.clear();
    content.style.display = "flex";
    dataToShow.style.display = "none";
    deleteAllBtn.style.display = "none";
});
// Check if there's existing data
if (array.length !== 0 || arr2.length !== 0) {
    content.style.display = "none";
    dataToShow.style.display = "flex";
    deleteAllBtn.style.display = "flex";
    addDataToDOM();
}
// Delete individual items
document.addEventListener("click", (e) => {
    const box = e.target.closest(".mainContent .box, .mainContent .box-2");
    if (!box)
        return;
    const delBtn = e.target.closest(".btnContent > :nth-child(2)");
    if (!delBtn)
        return;
    const idOfBox = parseInt(box.id);
    const isSecondArray = box.classList.contains("box-2");
    if (isSecondArray) {
        const index = arr2.findIndex((item) => item.key === idOfBox);
        if (index !== -1) {
            arr2.splice(index, 1);
            localStorage.setItem("arr-2", JSON.stringify(arr2));
        }
    }
    else {
        const index = array.findIndex((item) => item.key === idOfBox);
        if (index !== -1) {
            array.splice(index, 1);
            localStorage.setItem("value-1", JSON.stringify(array));
        }
    }
    box.remove();
    if (array.length === 0 && arr2.length === 0) {
        content.style.display = "flex";
        dataToShow.style.display = "none";
        deleteAllBtn.style.display = "none";
        count = 0;
        localStorage.setItem("count", JSON.stringify(0));
        localStorage.removeItem("value-1");
        localStorage.removeItem("arr-2");
    }
});
// Editing items
document.addEventListener("click", (e) => {
    const box = e.target.closest(".mainContent .box, .mainContent .box-2");
    if (!box)
        return;
    const editBtn = e.target.closest(".btnContent > :first-child"); // Fixed selector
    if (!editBtn)
        return;
    const id = parseInt(box.id);
    const textContent = box.querySelector(".textContent > :nth-child(2)");
    const isSecondArray = box.classList.contains("box-2");
    dynamicalCreatedField(textContent.textContent || "", id, isSecondArray);
});
// Create dynamic edit field
const body = document.body;
const dynamicalCreatedField = (value, id, isSecondArray) => {
    const bigBox = document.createElement("div");
    const closeBtn = document.createElement("button");
    closeBtn.classList.add("closeContent");
    closeBtn.textContent = "X";
    bigBox.classList.add("boxed");
    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    const form = document.createElement("form");
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.defaultValue = value;
    inputField.id = id.toString();
    const button = document.createElement("button");
    button.textContent = "Update";
    bigBox.appendChild(closeBtn);
    bigBox.appendChild(wrapper);
    wrapper.appendChild(form);
    form.appendChild(inputField);
    form.appendChild(button);
    body.appendChild(bigBox);
    // Handle edit submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input");
        const id = parseInt(input.id);
        if (isSecondArray) {
            const index = arr2.findIndex((item) => item.key === id);
            if (index !== -1) {
                arr2[index].value = input.value;
                localStorage.setItem("arr-2", JSON.stringify(arr2));
            }
        }
        else {
            const index = array.findIndex((item) => item.key === id);
            if (index !== -1) {
                array[index].value = input.value;
                localStorage.setItem("value-1", JSON.stringify(array));
            }
        }
        // Update UI
        addDataToDOM();
        bigBox.remove();
    });
};
// Close edit field on background click
document.addEventListener("click", (e) => {
    const getBackground = e.target.closest(".boxed");
    if (!getBackground)
        return;
    getBackground.remove();
});
document.addEventListener("click", (e) => {
    const wrapper = e.target.closest(".boxed .wrapper");
    if (wrapper) {
        e.stopPropagation();
    }
}, { capture: true });
// Move items between arrays (toggle functionality)
document.addEventListener("click", (e) => {
    const btn = e.target.closest(".mainContent .allData .box .textContent > :first-child"); // Fixed selector
    if (!btn)
        return;
    const box = e.target.closest(".mainContent .box, .mainContent .box-2");
    // Add a null check for `box`
    if (!box) {
        console.error("Box element not found!");
        return;
    }
    const boxId = parseInt(box.id);
    // Check if the item is in the second array (arr2)
    const isSecondArray = box.classList.contains("box-2");
    if (isSecondArray) {
        // Move the item back to the first array (array)
        const index = arr2.findIndex((item) => item.key === boxId);
        if (index !== -1) {
            array.push(arr2[index]); // Add to the first array
            arr2.splice(index, 1); // Remove from the second array
        }
    }
    else {
        // Move the item to the second array (arr2)
        const index = array.findIndex((item) => item.key === boxId);
        if (index !== -1) {
            arr2.push(array[index]); // Add to the second array
            array.splice(index, 1); // Remove from the first array
        }
    }
    // Update localStorage
    localStorage.setItem("value-1", JSON.stringify(array));
    localStorage.setItem("arr-2", JSON.stringify(arr2));
    // Update the DOM
    addDataToDOM();
    // Check if both arrays are empty
    if (array.length === 0 && arr2.length === 0) {
        content.style.display = "flex";
        dataToShow.style.display = "none";
        deleteAllBtn.style.display = "none";
        count = 0;
        localStorage.setItem("count", JSON.stringify(0));
        localStorage.removeItem("value-1");
        localStorage.removeItem("arr-2");
    }
});
