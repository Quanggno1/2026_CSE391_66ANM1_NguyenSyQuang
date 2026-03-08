const avatar = document.getElementById('my-avatar');
avatar.src = 'https://via.placeholder.com/150/0000FF/808080'; 

avatar.alt = 'Đây là ảnh đại diện mới';
avatar.title = 'Ảnh được cập nhật bởi JS';

const statusBox = document.getElementById('status-box');
statusBox.classList.add('active'); 
statusBox.classList.remove('box'); 

function toggleHighlight() {
    const heading = document.getElementById('main-heading');
    heading.classList.toggle('highlight');
    
    if (heading.classList.contains('highlight')) {
        console.log("Trạng thái: Đang bật highlight");
    } else {
        console.log("Trạng thái: Đã tắt highlight");
    }
}