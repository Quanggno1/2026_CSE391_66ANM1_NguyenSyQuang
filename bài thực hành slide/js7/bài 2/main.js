console.log("--- BẮT ĐẦU CHẠY PROMISES ---");
const layDuLieu = new Promise((resolve, reject) => {
    console.log("1. Đang gửi request lấy dữ liệu... (Đợi 2 giây)");
    
    setTimeout(() => {
        const thanhCong = true; 
        if (thanhCong) {
            resolve({ id: 101, ten: "Sách JavaScript Cơ Bản" }); 
        } else {
            reject("Lỗi 500: Server không phản hồi!"); 
        }
    }, 2000);
});

layDuLieu
    .then((duLieu) => {
        console.log("2. Đã nhận được dữ liệu ban đầu:", duLieu);
        return duLieu.ten; 
    })
    
    .then((tenSach) => {
        console.log(`3. (Chain 1) Đang xử lý tên sách: ${tenSach}`);
        return tenSach.toUpperCase(); 
    })
    .then((tenVietHoa) => {
        console.log(`3. (Chain 2) Dữ liệu cuối cùng sau khi chain: ${tenVietHoa}`);
    })
        .catch((loi) => {
        console.error("4. BẮT LỖI TẬP TRUNG:", loi);
    });



function taiFileCallback(tenFile, callback) {
    console.log(`Đang tải file ${tenFile} bằng Callback...`);
    setTimeout(() => {
        callback(null, `Đã tải xong file: ${tenFile}`);
    }, 1000);
}

function taiFilePromise(tenFile) {
    return new Promise((resolve, reject) => {
        taiFileCallback(tenFile, (loi, ketQua) => {
            if (loi) {
                reject(loi);
            } else {
                resolve(ketQua);
            }
        });
    });
}

taiFilePromise("tailieu_js.pdf")
    .then((thongBao) => console.log("5. Kết quả sau khi chuyển sang Promise:", thongBao))
    .catch((loi) => console.error(loi));