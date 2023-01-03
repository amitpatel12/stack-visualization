let pushBox = document.getElementById("push");
let stack = document.getElementById("stack");
let warning = document.getElementById("warning-text");
let popResult = document.getElementById("pop-result");
let peekResult = document.getElementById("peek-result");
let isEmptyResult = document.getElementById("isempty-result");
let isFullResult = document.getElementById("isfull-result");
let stackItems = document.getElementById("stack-items");
let capacityBox = document.getElementById("stack-capacity");
let topPtr = document.getElementById("top-ptr");

let bottomShift = 0;
let bottomShiftDown = 0;
let topPointer = 0;
let capacity = 7;
let isCapacityValid = true;

/* Function to set the capacity of the stack */
const setCapacity = () => {
  let newCapacity = parseInt(capacityBox.value);
  if (Number.isNaN(newCapacity)) {
    message(0, "Invalid Capacity");
    isCapacityValid = false;
  } else if (newCapacity < 0) {
    message(0, "Set Positive Capacity");
    isCapacityValid = false;
  } else if (newCapacity < capacity) {
    message(0, "Can't be deceresed");
    isCapacityValid = false;
  } else {
    capacity = newCapacity;
    message(1, "New capacity set");
    isCapacityValid = true;
  }
};

/* Function to insert the data into stack */
const pushData = () => {
  let data = pushBox.value;
  if (data == "") {
    message(0, "Empty Input Field");
  } else if (isCapacityValid == false) {
    message(0, "Invalid Capacity");
  } else if (topPointer == capacity) {
    message(0, "Stack Overflow");
  } else {
    message(1, data + " pushed!");

    // creating new div element in which data is inserted
    let dataItem = document.createElement("div");
    dataItem.setAttribute("class", "stack-data");
    dataItem.setAttribute("id", `stack-data-${++topPointer}`);
    dataItem.innerText = data;

    // shifting 64px down to the data item, and appending to stack
    bottomShift += 64;
    dataItem.style.bottom = bottomShift + "px";
    stack.appendChild(dataItem);

    // shifting 64px down to the arrow pointer
    if (topPointer <= 7) {
      bottomShiftDown += 64;
      if (topPointer == 1) topPtr.style.bottom = bottomShiftDown + 10 + "px";
      else topPtr.style.bottom = bottomShiftDown + "px";
      //   dcr += 10;
    } else if (topPointer == 8) {
      bottomShiftDown += 40;
      topPtr.style.bottom = bottomShiftDown + "px";
    }

    // automaticallly scroll the stack to the top
    stack.scrollTop = stack.scrollHeight;

    // incrementing the number of elements in Stack
    stackItems.innerText = topPointer + " items in Stack";
  }
};

/* */
const popData = () => {
  if (topPointer == 0) {
    message(0, "Underflow");
  }
  if (isCapacityValid == false) {
    message(0, "Invalid Capacity");
  } else {
    // Getting the top most element using topPointer
    let data = document.getElementById(`stack-data-${topPointer}`);
    popResult.innerText = data.innerText;

    message(1, data.innerText + " poped!");
    // Removing poped item
    data.remove();

    // shifting 64px up to the arrow pointer
    if (topPointer <= 7) {
      bottomShiftDown -= 64;
      topPtr.style.bottom = bottomShiftDown + "px";
    } else if (topPointer == 8) {
      bottomShiftDown -= 40;
      topPtr.style.bottom = bottomShiftDown + "px";
    }

    // Decreasing topPointer by 1 to pointer another Data Item
    topPointer -= 1;

    // decrementing the number of elements in Stack
    stackItems.innerText = topPointer + " items in Stack";
  }
};

const peekData = () => {
  if (topPointer == 0) {
    message(0, " Underflow Condition");
  }
  if (isCapacityValid == false) {
    message(0, "Invalid Capacity");
  } else {
    // Getting the top most element using topPointer
    let data = document.getElementById(`stack-data-${topPointer}`);
    peekResult.innerText = data.innerText;

    message(1, data.innerText + " peeked!");
  }
};

const isEmpty = () => {
  if (topPointer == 0) {
    isEmptyResult.innerText = "Yes";
    isEmptyResult.style.color = "#339900";
  } else {
    isEmptyResult.innerText = "No";
    isEmptyResult.style.color = "#ff9966";
  }
};

const isFull = () => {
  console.log(topPointer, capacity);
  if (topPointer == capacity) {
    isFullResult.innerText = "Yes";
    isFullResult.style.color = "#339900";
  } else {
    isFullResult.innerText = "No";
    isFullResult.style.color = "#ff9966";
  }
};

/*
    Shows a warning message

    status 1 for success
    status 0 for danger 

*/
const message = (status, msg) => {
  if (status == 1) {
    warning.classList.remove(`warning-msg-danger`);
    warning.classList.add(`warning-msg-success`);
  } else {
    warning.classList.remove(`warning-msg-success`);
    warning.classList.add(`warning-msg-danger`);
  }
  warning.innerText = msg;
};


const clearAll = () => {
  message(1, 'Stack is Empty');
  isEmpty();
  isFull();
  peekResult.innerText = 'none';
  popResult.innerText = 'none';
  stack.innerHTML = '';
  topPointer = 0;
  isCapacityValid = true;
  bottomShift = 0;
  bottomShiftDown = 0;
  topPtr.style.bottom = bottomShift + "px";
  pushBox.value = '';
}