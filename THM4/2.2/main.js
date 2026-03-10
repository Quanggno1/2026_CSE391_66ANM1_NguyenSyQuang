const prices = {
    "ao_thun": 150000,
    "quan_jean": 350000,
    "giay_sneaker": 500000
};

const productSelect = document.getElementById('product');
const quantityInput = document.getElementById('quantity');
const totalPriceEl = document.getElementById('total-price');
const notesInput = document.getElementById('notes');
const charCountEl = document.getElementById('char-count');

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

function calculateTotal() {
    const productKey = productSelect.value;
    const qty = parseInt(quantityInput.value);
    
    if (productKey && !isNaN(qty) && qty > 0) {
        const total = prices[productKey] * qty;
        totalPriceEl.textContent = total.toLocaleString('vi-VN') + ' VNĐ';
        return total;
    } else {
        totalPriceEl.textContent = '0 VNĐ';
        return 0;
    }
}

function validateProduct() {
    clearError('product');
    if (productSelect.value === "") {
        showError('product', 'Vui lòng chọn một sản phẩm.');
        return false;
    }
    return true;
}

function validateQuantity() {
    clearError('quantity');
    const qty = parseInt(quantityInput.value);
    if (isNaN(qty) || qty < 1 || qty > 99) {
        showError('quantity', 'Số lượng phải là số nguyên từ 1 đến 99.');
        return false;
    }
    return true;
}

function validateDate() {
    clearError('delivery-date');
    const dateStr = document.getElementById('delivery-date').value;
    
    if (!dateStr) {
        showError('delivery-date', 'Vui lòng chọn ngày giao hàng.');
        return false;
    }

    const selectedDate = new Date(dateStr);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);

    if (selectedDate < today) {
        showError('delivery-date', 'Ngày giao hàng không được trong quá khứ.');
        return false;
    }
    
    if (selectedDate > maxDate) {
        showError('delivery-date', 'Ngày giao hàng không được vượt quá 30 ngày kể từ hôm nay.');
        return false;
    }

    return true;
}

function validateAddress() {
    clearError('address');
    const value = document.getElementById('address').value.trim();
    if (value === '') {
        showError('address', 'Địa chỉ giao hàng không được để trống.');
        return false;
    }
    if (value.length < 10) {
        showError('address', 'Địa chỉ giao hàng phải chi tiết (ít nhất 10 ký tự).');
        return false;
    }
    return true;
}

function validateNotes() {
    clearError('notes');
    const value = notesInput.value;
    
    charCountEl.textContent = `${value.length}/200`;
    
    if (value.length > 200) {
        charCountEl.classList.add('text-danger');
        showError('notes', 'Ghi chú không được vượt quá 200 ký tự.');
        return false;
    } else {
        charCountEl.classList.remove('text-danger');
    }
    return true;
}

function validatePayment() {
    clearError('payment');
    const payments = document.getElementsByName('payment');
    let isSelected = false;
    for (let i = 0; i < payments.length; i++) {
        if (payments[i].checked) isSelected = true;
    }
    if (!isSelected) {
        showError('payment', 'Vui lòng chọn phương thức thanh toán.');
        return false;
    }
    return true;
}

productSelect.addEventListener('change', calculateTotal);
quantityInput.addEventListener('input', calculateTotal);

notesInput.addEventListener('input', validateNotes);

const fields = [
    { id: 'product', validate: validateProduct },
    { id: 'quantity', validate: validateQuantity },
    { id: 'delivery-date', validate: validateDate },
    { id: 'address', validate: validateAddress }
];

fields.forEach(field => {
    const el = document.getElementById(field.id);
    el.addEventListener('blur', field.validate);
    el.addEventListener('input', () => clearError(field.id));
    el.addEventListener('change', () => clearError(field.id)); // Dành cho thẻ select/date
});

document.getElementsByName('payment').forEach(radio => {
    radio.addEventListener('change', () => clearError('payment'));
});


const form = document.getElementById('order-form');
const formWrapper = document.getElementById('form-wrapper');
const confirmModal = document.getElementById('confirm-modal');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const isValid = validateProduct() 
                  & validateQuantity() 
                  & validateDate() 
                  & validateAddress() 
                  & validateNotes() 
                  & validatePayment();

    if (isValid) {
        const productName = productSelect.options[productSelect.selectedIndex].text;
        
        document.getElementById('summary-product').textContent = productName;
        document.getElementById('summary-quantity').textContent = quantityInput.value;
        document.getElementById('summary-date').textContent = document.getElementById('delivery-date').value;
        document.getElementById('summary-total').textContent = calculateTotal().toLocaleString('vi-VN') + ' VNĐ';

        formWrapper.style.display = 'none';
        confirmModal.style.display = 'block';
    }
});

document.getElementById('btn-cancel').addEventListener('click', () => {
    confirmModal.style.display = 'none';
    formWrapper.style.display = 'block';
});

document.getElementById('btn-confirm').addEventListener('click', () => {
    confirmModal.style.display = 'none';
    successMessage.style.display = 'block';
});