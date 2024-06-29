const form = document.getElementById("paperForm");
const categorySelect = document.getElementById("category");
const historyDiv = document.getElementById("history");

function loadCategories() {
  const papers = JSON.parse(localStorage.getItem("papers")) || [];
  const categories = [...new Set(papers.map((paper) => paper.category))];

  categorySelect.innerHTML = '<option value="">เลือกหมวดหมู่</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function savePaper(paper) {
  const papers = JSON.parse(localStorage.getItem("papers")) || [];
  papers.push(paper);
  localStorage.setItem("papers", JSON.stringify(papers));
}

function displayHistory() {
  const papers = JSON.parse(localStorage.getItem("papers")) || [];
  historyDiv.innerHTML = "";
  papers.forEach((paper) => {
    const paperDiv = document.createElement("div");
    paperDiv.innerHTML = `
              <h3>${paper.title}</h3>
              <p>หมวดหมู่: ${paper.category}</p>
              <p>ลิงก์: <a href="${paper.link}" target="_blank">${paper.link}</a></p>
              <p>สรุป: ${paper.summary}</p>
              <p>คะแนน: ${paper.rating}</p>
              <hr>
          `;
    historyDiv.appendChild(paperDiv);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const paper = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value || "อื่นๆ",
    link: document.getElementById("link").value,
    summary: document.getElementById("summary").value,
    rating: document.getElementById("rating").value,
  };
  savePaper(paper);
  loadCategories();
  form.reset();
  alert("บันทึกข้อมูลเรียบร้อยแล้ว");
});

document
  .getElementById("viewHistory")
  .addEventListener("click", displayHistory);

// Load categories on page load
loadCategories();
