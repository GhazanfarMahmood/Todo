const inputData = document.querySelector("input")
const addBtn = document.querySelector(".mainContent .input-field form > :last-child")
const content = document.querySelector(".content")
const form = document.querySelector("form")
const dataToShow = document.querySelector(".allData")
const deleteAllBtn = document.querySelector(".mainContent .delAll")


// ? this is used to prevent the page from reloading after submitting the data
form?.addEventListener("submit", (e : Event): void =>{
    e.preventDefault()
})


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
                <span class="checked"></span>
            </div>
            <h1>${item}</h1>
        </div>
        <div class="btnContent">
            <button><span class="material-icons">edit</span></button>
            <button><span class="material-icons">delete</span></button>
        </div>
    </div>`
 })
 dataToShow?.innerHTML = value.join("");

//  this way is also valid as it work the same we define the below
//  const parentCheckBox = document.querySelector(".mainContent .textContent > :first-child")
//  const innerSpan = document.querySelector('.mainContent .textContent > :first-child > :first-child')
//  const heading = document.querySelector(".mainContent .textContent > :nth-child(2)")

    // this work very fine but there is an issue is that it create a eventListener for every parentCheckBox , if we have a thousand parentCheckBox  than we got a thousand eventListener on every checkBox that cause a memory loss 
    // parentCheckBox.addEventListener("click", () =>{
    //     innerSpan.classList.toggle("active")
    //     heading.classList.toggle("listed")
    // })

//   })

}

//? addEvent Listener on add button to add data in a array
addBtn?.addEventListener("click", () =>{
    if(inputData?.value.trim()){
        array.push(inputData?.value)
        inputData?.value = ""
        inputData.removeAttribute("required")
        // when you want to clear all input fields when you click on submit button then you have to invoke the reset function to form element
        form?.reset()

        // ? calling this function so that when data is added to array than this data will be shown on screen
        addDataToDOM()
        content?.style.display = "none"
        dataToShow.style.display = "flex"

    }else if(!inputData?.value){
        // setAttribute is used to create any type of attribute in an element and for required you only pass single or double quotes as the second argument 
       inputData?.setAttribute("required", "")
       console.log("Please enter a value")
    }
    const style = getComputedStyle(dataToShow)
    if(style.display === "flex"){
        deleteAllBtn.style.display = "flex"
    }
})

deleteAllBtn?.addEventListener("click", () =>{
   array.splice(0, array.length)
   content.style.display = "flex"
   dataToShow.style.display = "none"
   deleteAllBtn.style.display = "none"
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


document.addEventListener("click", (e) => {
    const textContent = e.target.closest(".mainContent .textContent");
    const checkbox = textContent.querySelector(".mainContent .textContent .checked");
    if (checkbox) {
        textContent.classList.toggle("list")
        checkbox.classList.toggle("checkboxActive");
    }
});



// slice method doesn't alter the original array, it is basically used to return an array or portion of an array.
// slice(optional start parameter, optional end parameter)
// if the start parameter of slice is greater than end parameter than it return an empty array.

// splice
// while on the other hand splice method is used to change content in original array. it is not only used to remove any type of content from an array or for any given portion but also used to add any type of content to an array.
// splice(start, optional delete count, optional items to add)

// const food = ["apple", "banana", "orange", "mango"];
// console.log(food.slice(food.length, 2))
// console.log(food.slice(-2))

// in splice if you modify array directly in a console than it doesn't work and also you can't declare it to another variable so first you define an array than you modify than you log the array

// const food = ["apple", "banana", "orange", "mango"];
// food.splice(food.length,food.length, "");
// console.log(food)

// for removing an item from an array and this will give you entire array accept the index you have selected
// const food = ["apple", "banana", "orange", "mango"];
// food.splice(0, 1);
// console.log(food)
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


// to access box that is parent div through class
// const box = document.querySelector(".box")

// to access button through id
// const btn = document.querySelector("#add")

// storing a numeric value in a variable so that whenever a card is created the numeric value of count will be increment by 1 and store in count and than that value will be show on UI through each card
// let count = 0;

// the below function is used to create a element that is div and passing value of count in that div and than adding that div as a child to box that is parent div and incrementing value of that div whenever addingCard function run
// const addingCard = () =>{
//     const card = document.createElement("div")
//     card.classList.add("card")
//     card.innerText = count++;
//     box?.appendChild(card)
// }

// if you call this function than a div become with the value of count that is 0 and that div will be render and show on the UI of page
// addingCard()

// adding evenlistener click on button so that when ever i click on button a box become and that box will be show on UI and after the first box
// btn?.addEventListener("click", () =>{
//     addingCard()
// })


// adding a global event listener to remove the card
// window.addEventListener("click", (event) =>{

    // getting all card and storing them into a single variable, if i declare variable outside the function than it get the card that is not yet declare so that i didn't got any type of card
    // const cards = document.querySelectorAll(".card")

    // this is used to loop through every card so that i can remove the card on which i click
    // cards.forEach((card) =>{

        // passing a logic whenever i click on card than that card will got display none
//         if(event.target === card){
//             card.style.display = "none"
//             console.log(card)
//         }
//     })
// })

// GET COMPUTED STYLE is the js method.
//  in short, getComputedStyle() helps you find out the final style of an element after all the CSS rules have been applied.

// you not only get the the computed style of element but you can also get the style of pesudo elment like ::before and ::after.
// only for simple styling of an element we can use getComputedStyle(element)
// and for the computed style of pesudo element before and after getComputedStyle(element, pesudoElt)

// the style of an element also got updated when you check through getComputedStyle(element) method by updating css means if you change the style of element through js than it will also get updated in getComputedStyle(element) method.

// and you can also check the live updated style of an element when you update style through css but there is an difference.

// Immediate update with JavaScript changes: When you change styles via JavaScript, getComputedStyle() immediately reflects the changes.
// Delayed update with CSS changes: When you modify styles via CSS (in stylesheets), getComputedStyle() will reflect those changes, but the update might take some time depending on the rendering cycle of the browser (for example, after a reflow/repaint happens).

// you can get error in following way, first when you try to get the style of an element that is not yet rendered than you will get error
// and second when you pass wrong pesudo element than you will get error.

// TO CHECK THE COMPUTED STYLE

// const phara = document.querySelector("p");
// const style = window.getComputedStyle(phara);

// console.log(style.getPropertyValue("font-size"))

// const heading = document.querySelector("h4")
// const afterStyle = getComputedStyle(heading, "::after");
// console.log(afterStyle.getPropertyValue("position"))

// What is event propagation?
// event propagation is the process by which events are handle.
// it has three phases one is capturing, second is target and third is bubbling phase.
// capturing phase start from the top most ancestor of dom than reach to the deepest child of dom. 
// this phase is also known as trickling phase.
// after the capturing phase target phase start in which the event react to the targeted element.
// and after the target phase the bubbling phase started in which the event again start from bottom and than move toward the top most ancestor of dom.


// const parentDiv = document.querySelector("#parent");
// const childDiv = document.querySelector("#child");

// document?.addEventListener("click", (e) =>{
//     e.stopPropagation()
//     if(e.target === childDiv){
//         console.log("button click")
//     }
// })

// when we use event.stopPropagation() than event will work only on that child not it will go to upward and not to downward.
// when we use event.stopImmediatePropagation() than it will stop any other event that is happening on that element.

// document.getElementById("parent")?.addEventListener("click", function(){
//     console.log("Capturing: Parent clicked")
// }, true)

// document.getElementById("parent")?.addEventListener("click", function(){
//     console.log("Bubbling: Parent clicked")
// })

// document.getElementById("child")?.addEventListener('click', function() {
//     console.log("Button clicked");
// });

// FOR STOPING OTHER EVENT TO BE HAPPEN ON SAME ELEMENT

// const btn = document.getElementById("clicked");

// btn?.addEventListener("click", () => {
//     console.log("click button happen");
// });

// btn?.addEventListener("mouseenter", (e) => {
    // Prevents any bubbling of 'mouseenter' event
    // e.stopImmediatePropagation();
    // console.log("mouse entered");

    // Optionally prevent click listener if needed:
//     e.stopPropagation();  // This would prevent the click event if necessary
// });