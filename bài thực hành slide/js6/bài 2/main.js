const heading = document.getElementById('main-heading');
heading.textContent = 'Tiêu đề đã được cập nhật mới!';
console.log("Bước 1: Đã đổi nội dung tiêu đề.");

const box = document.getElementById('container');
box.innerHTML = '<h3>Đây là tiêu đề phụ</h3><p>Đoạn văn này được thêm qua innerHTML.</p>';
console.log("Bước 2: Đã chèn thêm mã HTML vào div.");

const newListItem = document.createElement('li');
newListItem.textContent = 'Mục mới được thêm tự động';
const list = document.getElementById('my-list');
list.appendChild(newListItem);
console.log("Bước 3 & 4: Đã tạo và thêm thẻ li mới vào danh sách.");

const firstItem = document.querySelector('li');
if (firstItem) {
    firstItem.remove(); 
    console.log("Bước 5: Đã xóa phần tử li đầu tiên.");
}