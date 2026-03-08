// ================================================================
// BÀI 1: SELECTING ELEMENTS
// ================================================================

// Sử dụng getElementById để truy cập trực tiếp qua ID
const mainHeading = document.getElementById('main-heading');

// Sử dụng querySelector để chọn một phần tử bất kỳ
const containerDiv = document.querySelector('#container');

// Sử dụng querySelectorAll để lấy danh sách các phần tử
const allListItems = document.querySelectorAll('li');

// Kiểm tra kết quả trong tab Console của DevTools
console.log("--- Bài 1: Selecting ---");
console.log("Heading:", mainHeading);
console.log("Danh sách li:", allListItems);


// ================================================================
// BÀI 2: MODIFYING ELEMENTS
// ================================================================

// Thay đổi văn bản tiêu đề bằng textContent
mainHeading.textContent = 'Học DOM JavaScript thật thú vị!';

// Chèn thêm mã HTML vào một div bằng innerHTML
if (containerDiv) {
    containerDiv.innerHTML = '<p style="color: blue;">Nội dung này được chèn từ JavaScript!</p>';
}

// Sử dụng createElement để tạo một thẻ <li> mới
const newLi = document.createElement('li');
newLi.textContent = 'Phần tử mới được tạo động';

// Append phần tử vừa tạo vào danh sách <ul>
const myList = document.getElementById('my-list');
if (myList) {
    myList.appendChild(newLi);
}

// Thử xóa một phần tử bằng phương thức remove()
// (Mình comment lại để bạn vẫn nhìn thấy kết quả trên màn hình nhé)
// newLi.remove(); 


// ================================================================
// BÀI 3: ATTRIBUTES & CLASSES
// ================================================================

const myImg = document.getElementById('my-avatar');
if (myImg) {
    // Thay đổi thuộc tính src của một thẻ <img>
    myImg.src = 'https://picsum.photos/150'; 
    
    // Sử dụng dot notation để gán giá trị cho các properties (alt, title)
    myImg.alt = 'Ảnh minh họa từ Picsum';
    myImg.title = 'Hover để xem tiêu đề ảnh';
}

const statusBox = document.getElementById('status-box');
if (statusBox) {
    // Thêm và xóa class bằng classList.add / remove
    statusBox.classList.add('active'); 
    statusBox.classList.remove('box');
}


// ================================================================
// BÀI 4: EVENT LISTENERS
// ================================================================

const btn = document.getElementById('main-btn');

if (btn) {
    // Gán sự kiện click cho một nút bấm
    btn.addEventListener('click', function() {
        // Thay đổi textContent của một thẻ khi người dùng click vào
        mainHeading.textContent = 'Bạn đã click vào nút!';
        
        // Toggle class để đổi màu nền khi click nút
        document.body.classList.toggle('dark-mode');
        
        // Kiểm tra sự tồn tại của class bằng classList.contains
        if (document.body.classList.contains('dark-mode')) {
            console.log("Đã bật Dark Mode");
        }
    });

    // Thử nghiệm gán nhiều listeners khác nhau cho cùng 1 phần tử
    btn.addEventListener('click', function() {
        console.log("Hành động phụ: Nút được nhấn!");
    });

    // Lắng nghe sự kiện mouseenter / mouseleave
    btn.addEventListener('mouseenter', () => {
        btn.style.backgroundColor = 'orange';
        console.log("Chuột đang ở trên nút");
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.backgroundColor = '';
        console.log("Chuột đã rời khỏi nút");
    });
}