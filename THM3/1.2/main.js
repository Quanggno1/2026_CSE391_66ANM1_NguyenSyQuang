let students = [];
let sortDirection = null; 

const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');
const addBtn = document.getElementById('add-btn');
const studentList = document.getElementById('student-list');
const totalStudentsEl = document.getElementById('total-students');
const averageScoreEl = document.getElementById('average-score');

const searchInput = document.getElementById('search-input');
const filterRank = document.getElementById('filter-rank');
const sortScoreHeader = document.getElementById('sort-score');
const sortIcon = document.getElementById('sort-icon');

function getRank(score) {
    if (score >= 8.5) return 'Giỏi';
    if (score >= 7.0) return 'Khá';
    if (score >= 5.0) return 'Trung bình';
    return 'Yếu';
}

function applyFilters() {
    const keyword = searchInput.value.toLowerCase().trim();
    const rankFilter = filterRank.value;

    let filteredStudents = students.filter(student => {
        const matchName = student.name.toLowerCase().includes(keyword);
        const matchRank = rankFilter === 'All' || getRank(student.score) === rankFilter;
        return matchName && matchRank;
    });

    if (sortDirection === 'asc') {
        filteredStudents.sort((a, b) => a.score - b.score);
        sortIcon.textContent = '▲';
    } else if (sortDirection === 'desc') {
        filteredStudents.sort((a, b) => b.score - a.score);
        sortIcon.textContent = '▼';
    } else {
        sortIcon.textContent = '';
    }

    renderTable(filteredStudents);
}

function renderTable(dataToRender) {
    studentList.innerHTML = '';
    
    if (dataToRender.length === 0) {
        studentList.innerHTML = `<tr><td colspan="5" class="empty-message">Không có kết quả nào phù hợp</td></tr>`;
        totalStudentsEl.textContent = 0;
        averageScoreEl.textContent = '0.0';
        return;
    }

    let totalScore = 0;

    dataToRender.forEach((student, index) => {
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
            <td><button class="btn-delete" data-id="${student.id}">Xóa</button></td>
        `;
        studentList.appendChild(tr);
    });

    const total = dataToRender.length;
    totalStudentsEl.textContent = total;
    averageScoreEl.textContent = (totalScore / total).toFixed(1);
}

addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!name || isNaN(score) || score < 0 || score > 10) {
        alert("Thông tin không hợp lệ!");
        return;
    }

    students.push({ id: Date.now().toString(), name: name, score: score });
    
    nameInput.value = '';
    scoreInput.value = '';
    nameInput.focus();
    
    applyFilters(); 
});

scoreInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') addBtn.click(); });

searchInput.addEventListener('input', applyFilters);

filterRank.addEventListener('change', applyFilters);

sortScoreHeader.addEventListener('click', () => {
    if (sortDirection === null) sortDirection = 'asc';
    else if (sortDirection === 'asc') sortDirection = 'desc';
    else sortDirection = null; 
    
    applyFilters();
});

studentList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const idToDelete = event.target.getAttribute('data-id');
        
        students = students.filter(student => student.id !== idToDelete);
        
        applyFilters();
    }
});