const firstHeading = document.querySelector('#main-title');
console.log("Kết quả querySelector:", firstHeading);

const allDescriptions = document.querySelectorAll('.description');
console.log("Kết quả querySelectorAll:", allDescriptions);

const mainTitleById = document.getElementById('main-title');
console.log("Kết quả getElementById:", mainTitleById);

console.log("Nội dung của h1 là:", mainTitleById.innerText);