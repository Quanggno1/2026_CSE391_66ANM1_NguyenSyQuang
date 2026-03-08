async function layDuLieuNguoiDung() {
    const container = document.getElementById('user-container');
    container.innerHTML = '<p style="color: blue;">Đang kết nối đến server để tải dữ liệu...</p>';

    try {

        const response = await fetch('https://jsonplaceholder.typicode.com/users');


        if (!response.ok) {
            throw new Error(`Lỗi kết nối HTTP! Trạng thái: ${response.status}`);
        }

        const danhSachUsers = await response.json();

        container.innerHTML = '';

        danhSachUsers.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            
            userCard.innerHTML = `
                <h3>👤 ${user.name} (@${user.username})</h3>
                <p><strong>📧 Email:</strong> ${user.email}</p>
                <p><strong>📍 Thành phố:</strong> ${user.address.city}</p>
                <p><strong>🏢 Công ty:</strong> ${user.company.name}</p>
            `;
            
            container.appendChild(userCard);
        });

        console.log("Đã tải và hiển thị thành công 10 người dùng!");

    } catch (error) {
        console.error("Lỗi quá trình tải:", error);
        container.innerHTML = `<p style="color: red;"><strong>Đã xảy ra lỗi:</strong> ${error.message}</p>`;
    }
}

document.getElementById('fetch-btn').addEventListener('click', layDuLieuNguoiDung);