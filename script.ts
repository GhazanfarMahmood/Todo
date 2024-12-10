const inputData = document.querySelector("input")
const inputField = document.querySelector(".input-field")
const addBtn = document.querySelector(".mainContent .input-field form > :last-child")
const content = document.querySelector(".content")
const form = document.querySelector("form")
const dataToShow = document.querySelector(".allData")
const deleteAllBtn = document.querySelector(".mainContent .delAll")

// ? adding a function to remove the class active from input field which work as, to add the active class
function removeActiveClass(){
    inputField?.classList.remove("active")
}

// ? this function is work as to --__ stop propagation __-- and used to add active class when we click on inputField
inputField?.addEventListener("click", (event) =>{
    event.stopPropagation();
    inputField.classList.add("active")
})

// ? this is used to remove Active class when we click on window 
window.addEventListener("click", () =>{
    removeActiveClass()
})

// ? this is used to prevent the page from reloading after submitting the data
form?.addEventListener("submit", (e : Event): void =>{
    e.preventDefault()
})

// ? this is used to remove the eventListener from inputField that is click so that we can't see the border on input field  --__ still have to confirm __--
function removeEvent(){
    inputField?.removeEventListener("click", ()=>{})
}

const array = [];
//! 3. why only one data is store at one time in an array while in form it store data one after another
// array should have to come outside the function because everytime when we invoke the event this will start from empty array and store data in it and when we again click on addData button it will again start from empty array as the previous data remove because of invoke of event

// ? this function is used to iterate through each item of array and is used to show this data on UI of the site dynamically
const addDataToDOM = () => {
 const value = array.map((item, index) => {
    return  `
    <div class="box" id="${index}">
        <div class="textContent">
            <div>
                <span></span>
            </div>
            <h1>${item}</h1>
        </div>
        <div class="btnContent">
            <button><span class="material-icons">edit</span></button>
            <button><span class="material-icons">delete</span></button>
        </div>
    </div>`
 })
 dataToShow?.innerHTML = value.join("")

//  this way is also valid as it work the same we define the below
//  const parentCheckBox = document.querySelector(".mainContent .textContent > :first-child")
//  const innerSpan = document.querySelector('.mainContent .textContent > :first-child > :first-child')
//  const heading = document.querySelector(".mainContent .textContent > :nth-child(2)")

//  parentCheckBox?.addEventListener("click", () =>{
//     innerSpan?.classList.toggle("active")
//     heading?.classList.toggle("list")
//  })

    // this work very fine but there is an issue is that it create a eventListener for every parentCheckBox , if we have a thousand parentCheckBox  than we got a thousand eventListener on every checkBox that cause a memory loss 
    // parentCheckBox.addEventListener("click", () =>{
    //     innerSpan.classList.toggle("active")
    //     heading.classList.toggle("listed")
    // })

//   })
}

//? addEvent Listener on  add button to add data in a array
addBtn?.addEventListener("click", () =>{
    if(inputData?.value.trim()){
        array.push(inputData?.value)
        inputData?.value = ""
        inputData.removeAttribute("required")
        if(inputData.value === ""){
            removeEvent()   
            removeActiveClass()
        }
        // when you want to clear all input fields when you click on submit button then you have to invoke the reset function to form element
        // form?.reset()

        // ? calling this function so that when data is added to array than this data will be shown on screen
        addDataToDOM()
        content?.style.display = "none"
        deleteAllBtn.style.display = "flex"
        dataToShow.style.display = "flex"

    }else if(!inputData?.value){
        // setAttribute is used to create any type of attribute in an element and for required you only pass single or double quotes as the second argument 
       inputData?.setAttribute("required", "")
       console.log("Please enter a value")
       deleteAllBtn.style.display = "none"
    }
})

// this is also a way to define the type to an element in typescript
// const checkBox : HTMLDivElement | null = document.querySelector(".allData .mainContainer .box") 

// const checkBox = document.querySelectorAll(".mainContent .textContent > :nth-child(2) > :first-child") as NodeListOf<HTMLSpanElement>
// const text = document.querySelectorAll(".mainContent .textContent > :first-child") as NodeListOf<HTMLElement>

// here i can't see the html element tag of text and checkbox because the variable we are declaring and value storing in it is when we load the page first time and first time there is no dynamically content shown that's why we can't see any type of html element tag and we can't use the foreach loop on it because there is no such a node list present when page load 
// console.log(text)
// console.log(checkBox)

// but can see on dataToShow
// console.log(dataToShow)

// !Now we will use event delegation to work with upper problem

dataToShow?.addEventListener("click", (e) =>{
    const boxes = dataToShow.querySelectorAll(".box")

    boxes.forEach((box, id) =>{
        const textContent = box.querySelector(".textContent")
        const btnContent = box.querySelector(".btnContent")
        const innerSpan = box.querySelector(".mainContent .textContent > :first-child > :first-child")
        const heading = box.querySelector(".mainContent .textContent > :nth-child(2)")

        // if
    })
})

// When you click or interact with an element on a webpage, that action (event) doesn't just stay with that element. Instead, it "bubbles up" through its parent elements, all the way to the top of the page (the <html> element). This process is called event propagation or bubbling.

// For example:
// Imagine you click a button inside a <div> on a webpage. The event first happens on the button, then moves to the <div>, then to the <body>, and finally to the <html>. Each of these levels can "listen" for the event and respond to it.

// If you don't want the event to continue up the chain, you can stop it using methods like event.stopPropagation().

// 0. what is event delegation 
// first box and second is by id in event listener
// adding both way on checkbox only and on textContent
// 1. first thing i learn is stopPropagation
// 11. store data in the form of key value pair
// 5. when i click on delete all it should delete all todos or clean array
// 2. add the logic when the data submit in an array than the border of inputfield should change
// 3. if the input field have empty space one or thousand it should not submit in todo 
// 4. when i click on checkbox that is not yet created than there should an line through the text 
// 6. when i click on delete button it should only delete item which have the id equal to that button
// 7. when i click on edit button it should edit that item and after that it should save that item on that index
// 8. it should show the time and data in front of that item in small fonts
// 9. it should sent the item at last which have the line through 
// 10. last use the local storage to store the data and get data from local storage and after that modified that data



