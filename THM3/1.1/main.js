let students = [];

const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');
const addBtn = document.getElementById('add-btn');
const studentList = document.getElementById('student-list');
const totalStudentsEl = document.getElementById('total-students');
const averageScoreEl = document.getElementById('average-score');

function getRank(score) {
    if (score >= 8.5) return 'Giỏi';
    if (score >= 7.0) return 'Khá';
    if (score >= 5.0) return 'Trung bình';
    return 'Yếu';
}

function renderTable() {
    studentList.innerHTML = '';
    
    let totalScore = 0;

    students.forEach((student, index) => {
        totalScore += student.score;
        
        const tr = document.createElement('tr');
        
        if (student.score < 5.0) {
            tr.classList.add('highlight-yeu');
        }

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${student.name}</td>
            <td>${student.score.toFixed(1)}</td>
            <td>${getRank(student.score)}</td>
            <td><button class="btn-delete" data-index="${index}">Xóa</button></td>
        `;
        
        studentList.appendChild(tr);
    });

    const total = students.length;
    totalStudentsEl.textContent = total;
    averageScoreEl.textContent = total > 0 ? (totalScore / total).toFixed(1) : '0.0';
}

function addStudent() {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name) {
        alert("Vui lòng nhập họ tên!");
        nameInput.focus();
        return;
    }
    if (isNaN(score) || score < 0 || score > 10) {
        alert("Vui lòng nhập điểm hợp lệ (từ 0 đến 10)!");
        scoreInput.focus();
        return;
    }

    students.push({ name: name, score: score });
    renderTable();

    nameInput.value = '';
    scoreInput.value = '';
    nameInput.focus();
}

addBtn.addEventListener('click', addStudent);

scoreInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addStudent();
    }
});

studentList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const index = event.target.getAttribute('data-index');
        
        students.splice(index, 1);
        
        renderTable();
    }
});