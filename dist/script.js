"use strict";
const inputData = document.querySelector("input");
const addBtn = document.querySelector(".mainContent .input-field form > :last-child");
const content = document.querySelector(".content");
const form = document.querySelector("form");
const dataToShow = document.querySelector(".allData");
const deleteAllBtn = document.querySelector(".mainContent .delAll");
// Retrieve stored data from localStorage
let array = JSON.parse(localStorage.getItem("value-1")) || [];
let count = JSON.parse(localStorage.getItem("count")) || (array.length > 0 ? Math.max(...array.map(item => item.key)) + 1 : 0);
localStorage.setItem("count", JSON.stringify(count));
// Function to add data to the DOM
const addDataToDOM = (gottedData) => {
    const value = gottedData.map((item) => {
        return `
        <div class="box" id="${item.key}">
            <div class="textContent">
                <div>
                    <span class="checked"></span>
                </div>
                <h1>${item.value}</h1>
            </div>
            <div class="btnContent">
                <button><span class="material-icons">edit</span></button>
                <button><span class="material-icons">delete</span></button>
            </div>
        </div>`;
    });
    dataToShow.innerHTML = value.join("");
};
// Show stored data when the page loads
addDataToDOM(array);
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
        addDataToDOM(array);
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
    localStorage.setItem("value-1", JSON.stringify(array));
    count = 0;
    localStorage.setItem("count", JSON.stringify(0));
    content.style.display = "flex";
    dataToShow.style.display = "none";
    deleteAllBtn.style.display = "none";
});
// Check if there's existing data
if (array.length !== 0) {
    content.style.display = "none";
    dataToShow.style.display = "flex";
    deleteAllBtn.style.display = "flex";
    addDataToDOM(array);
}
// Delete individual items
document.addEventListener("click", (e) => {
    const box = e.target.closest(".mainContent .box");
    if (!box)
        return;
    const delBtn = e.target.closest(".btnContent > :nth-child(2)");
    if (!delBtn)
        return;
    const idOfBox = parseInt(box.id);
    const index = array.findIndex((item) => item.key === idOfBox);
    if (index !== -1) {
        array.splice(index, 1);
        box.remove();
        localStorage.setItem("value-1", JSON.stringify(array));
    }
    if (array.length === 0) {
        content.style.display = "flex";
        dataToShow.style.display = "none";
        deleteAllBtn.style.display = "none";
        count = 0;
        localStorage.setItem("count", JSON.stringify(0));
    }
});
// Editing items
document.addEventListener("click", (e) => {
    const box = e.target.closest(".mainContent .box");
    if (!box)
        return;
    const editBtn = e.target.closest(".btnContent > :first-child");
    if (!editBtn)
        return;
    const id = parseInt(box.id);
    const textContent = box.querySelector(".textContent > :nth-child(2)");
    dynamicalCreatedField(textContent.textContent, id);
});
// Create dynamic edit field
const body = document.body;
const dynamicalCreatedField = (value, id) => {
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
    inputField.id = id;
    const button = document.createElement("button");
    button.textContent = "Update";
    bigBox.appendChild(closeBtn);
    bigBox.appendChild(wrapper);
    wrapper.appendChild(form);
    form.appendChild(inputField);
    form.appendChild(button);
    body.appendChild(bigBox);
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
    ;
}, { capture: true });
// Handle edit submission
document.addEventListener("submit", (e) => {
    const form = e.target.closest(".boxed .wrapper form");
    const getBackground = e.target.closest(".boxed");
    if (!form)
        return;
    e.preventDefault();
    const input = form.querySelector("input");
    const id = parseInt(input.id);
    // Get data from localStorage
    const accessingData = JSON.parse(localStorage.getItem("value-1"));
    const againIndex = accessingData.findIndex((item) => item.key === id);
    if (againIndex !== -1) {
        accessingData[againIndex].value = input.value;
        localStorage.setItem("value-1", JSON.stringify(accessingData));
    }
    if (getBackground)
        getBackground.remove();
    // Update UI
    document.querySelectorAll(".box").forEach((box) => {
        if (parseInt(box.id) === id) {
            const texted = box.querySelector(".textContent > :nth-child(2)");
            texted.textContent = input.value;
        }
    });
});
