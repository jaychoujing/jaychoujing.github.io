// 简易搜索解析脚本
document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-input");
  const resultsContainer = document.getElementById("search-results");

  fetch("/search.xml")
    .then(response => response.text())
    .then(xml => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xml, "application/xml");
      const entries = [...xmlDoc.getElementsByTagName("entry")];

      input.addEventListener("input", function () {
        const keyword = this.value.trim().toLowerCase();
        resultsContainer.innerHTML = "";

        if (keyword === "") return;

        const results = entries
          .filter(entry => {
            const title = entry.getElementsByTagName("title")[0].textContent;
            const content = entry.getElementsByTagName("content")[0].textContent;
            return title.toLowerCase().includes(keyword) || content.toLowerCase().includes(keyword);
          })
          .map(entry => {
            const title = entry.getElementsByTagName("title")[0].textContent;
            const url = entry.getElementsByTagName("url")[0].textContent;
            return `<li><a href=" ">${title}</a ></li>`;
          });

        if (results.length > 0) {
          resultsContainer.innerHTML = results.join("");
        } else {
          resultsContainer.innerHTML = "<li>没有找到匹配的内容。</li>";
        }
      });
    });
});