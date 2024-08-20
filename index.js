import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-c3750-default-rtdb.asia-southeast1.firebasedatabase.app/"
} 
 
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputEl = document.getElementById("input-field")
const addBtn = document.getElementById("add-button")
const shoppingList = document.getElementById("shopping-list")

addBtn.addEventListener("click", function() {
    let inputValue = inputEl.value
    push(shoppingListInDB, inputValue)
    clearInputField()
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingList()
        for(let i = 0; i<itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            appendItemsToshoppingList(currentItem)
        }
    } else {
        shoppingList.innerHTML = "No items here yet..."
    }
})

function clearShoppingList() {
    shoppingList.innerHTML = ""
}

function appendItemsToshoppingList(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingList.append(newEl)
}

function clearInputField() {
    inputEl.value = ""
}


// let scrimbaUsers = {
//     "00": "sindre@scriba.com",
//     "01": "per@scriba.com",
//     "02": "frode@scrimba.com"
// }

// let scrimbaUsersEmails = Object.values(scrimbaUsers)

// let scrimbaUsersIDs = Object.keys(scrimbaUsers)

// let scrimbaUsersEntries = Object.entries(scrimbaUsers)