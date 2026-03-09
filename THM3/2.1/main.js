function showError(fieldId, message) {
    document.getElementById(fieldId + '-error').textContent = message;
    const input = document.getElementById(fieldId);
    if (input) input.classList.add('error-border');
}

function clearError(fieldId) {
    document.getElementById(fieldId + '-error').textContent = '';
    const input = document.getElementById(fieldId);
    if (input) input.classList.remove('error-border');
}

function validateFullname() {
    const value = document.getElementById('fullname').value.trim();
    clearError('fullname');
    
    if (value === '') {
        showError('fullname', 'Họ và tên không được để trống.');
        return false;
    }
    if (value.length < 3) {
        showError('fullname', 'Họ và tên phải có ít nhất 3 ký tự.');
        return false;
    }
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!regex.test(value)) {
        showError('fullname', 'Họ và tên chỉ được chứa chữ cái và khoảng trắng.');
        return false;
    }
    return true;
}

function validateEmail() {
    const value = document.getElementById('email').value.trim();
    clearError('email');
    
    if (value === '') {
        showError('email', 'Email không được để trống.');
        return false;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(value)) {
        showError('email', 'Email không đúng định dạng.');
        return false;
    }
    return true;
}

function validatePhone() {
    const value = document.getElementById('phone').value.trim();
    clearError('phone');
    
    if (value === '') {
        showError('phone', 'Số điện thoại không được để trống.');
        return false;
    }
    const regex = /^0\d{9}$/;
    if (!regex.test(value)) {
        showError('phone', 'Số điện thoại phải gồm 10 số và bắt đầu bằng số 0.');
        return false;
    }
    return true;
}

function validatePassword() {
    const value = document.getElementById('password').value;
    clearError('password');
    
    if (value === '') {
        showError('password', 'Mật khẩu không được để trống.');
        return false;
    }
    if (value.length < 8) {
        showError('password', 'Mật khẩu phải dài ít nhất 8 ký tự.');
        return false;
    }
    if (!/[A-Z]/.test(value) || !/[a-z]/.test(value) || !/[0-9]/.test(value)) {
        showError('password', 'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 số.');
        return false;
    }
    return true;
}

function validateConfirmPassword() {
    const pwd = document.getElementById('password').value;
    const value = document.getElementById('confirm-password').value;
    clearError('confirm-password');
    
    if (value === '') {
        showError('confirm-password', 'Vui lòng xác nhận lại mật khẩu.');
        return false;
    }
    if (value !== pwd) {
        showError('confirm-password', 'Mật khẩu xác nhận không khớp.');
        return false;
    }
    return true;
}

function validateGender() {
    clearError('gender');
    const genders = document.getElementsByName('gender');
    let isSelected = false;
    for (let i = 0; i < genders.length; i++) {
        if (genders[i].checked) isSelected = true;
    }
    if (!isSelected) {
        showError('gender', 'Vui lòng chọn giới tính.');
        return false;
    }
    return true;
}

function validateTerms() {
    clearError('terms');
    const isChecked = document.getElementById('terms').checked;
    if (!isChecked) {
        showError('terms', 'Bạn phải đồng ý với điều khoản sử dụng.');
        return false;
    }
    return true;
}

const inputFields = [
    { id: 'fullname', validate: validateFullname },
    { id: 'email', validate: validateEmail },
    { id: 'phone', validate: validatePhone },
    { id: 'password', validate: validatePassword },
    { id: 'confirm-password', validate: validateConfirmPassword }
];

inputFields.forEach(field => {
    const el = document.getElementById(field.id);
    if (el) {
        el.addEventListener('blur', field.validate);
        el.addEventListener('input', () => clearError(field.id));
    }
});

document.getElementsByName('gender').forEach(radio => {
    radio.addEventListener('change', () => clearError('gender'));
});

const termsEl = document.getElementById('terms');
if (termsEl) {
    termsEl.addEventListener('change', () => clearError('terms'));
}

const form = document.getElementById('register-form');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const isFormValid = validateFullname() 
                          & validateEmail() 
                          & validatePhone() 
                          & validatePassword() 
                          & validateConfirmPassword() 
                          & validateGender() 
                          & validateTerms();

        if (isFormValid) {
            const name = document.getElementById('fullname').value.trim();
            
            document.getElementById('form-wrapper').style.display = 'none';
            const successDiv = document.getElementById('success-message');
            successDiv.style.display = 'block';
            successDiv.innerHTML = `<h2>Đăng ký thành công! 🎉</h2><p>Chào mừng <strong>${name}</strong> đã đến với hệ thống.</p>`;
        }
    });
}