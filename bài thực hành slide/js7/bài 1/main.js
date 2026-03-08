const clickBtn = document.getElementById('click-btn');
clickBtn.addEventListener('click', () => {
    alert("Yêu cầu 1: Nút đã được click!");
    console.log("1. Đã chạy Click Event.");
});

const keyInput = document.getElementById('key-input');
const keyResult = document.getElementById('key-result');
keyInput.addEventListener('keydown', (event) => {
    keyResult.textContent = event.key;
    console.log(`2. Keyboard Event: Bạn vừa nhấn phím "${event.key}"`);
});


const testForm = document.getElementById('test-form');
testForm.addEventListener('submit', (event) => {
    event.preventDefault(); 
    alert("Yêu cầu 3: Form đã được submit nhưng trang web vẫn giữ nguyên!");
    console.log("3. Form Submit Event (đã bị chặn load trang).");
});
const outerDiv = document.getElementById('outer-div');
const innerDiv = document.getElementById('inner-div');

innerDiv.addEventListener('click', () => {
    console.log("4. BUBBLING: Bạn vừa click vào THẺ CON (Inner).");
});

outerDiv.addEventListener('click', () => {
    console.log("4. BUBBLING: Sự kiện lan truyền (nổi bọt) lên THẺ CHA (Outer).");
});


const itemList = document.getElementById('item-list');

itemList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        console.log(`5. DELEGATION: Bạn đã chọn "${event.target.textContent}"`);
        
        event.target.style.backgroundColor = 'yellow'; 
    }
});