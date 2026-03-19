document.addEventListener("DOMContentLoaded", () => {
  initLocalizedPage("employee_resources", {
    onData: (data) => {
      renderQuickLinks(data.quickLinks || []);
      renderDirectory(data.directory || []);
      renderForms(data.forms || []);
      renderContacts(data.contacts || []);
    }
  });

  initDirectorySearch();
});

function renderQuickLinks(items){
  const mount = document.getElementById("quickLinksGrid");
  if(!mount) return;

  mount.innerHTML = items.map(i => `
    <a class="quickLinkCard" href="${i.href}" target="_blank" rel="noopener">
      <div class="quickLinkTitle">${i.label}</div>
    </a>
  `).join("");
}

function renderDirectory(items){
  const mount = document.getElementById("directoryList");
  if(!mount) return;

  mount.dataset.items = JSON.stringify(items);
  drawDirectory(items);
}

function drawDirectory(items){
  const mount = document.getElementById("directoryList");

  mount.innerHTML = items.map(p => `
    <div class="dirItem">
      <div class="dirName">${p.name}</div>
      <div class="dirMeta">${p.title || ""} • ${p.department || ""}</div>
      ${p.phone ? `<a href="tel:${p.phone}">${p.phone}</a>` : ""}
      ${p.email ? `<a href="mailto:${p.email}">${p.email}</a>` : ""}
    </div>
  `).join("");
}

function initDirectorySearch(){
  const input = document.getElementById("directorySearch");
  if(!input) return;

  input.addEventListener("input", () => {
    const term = input.value.toLowerCase();
    const all = JSON.parse(document.getElementById("directoryList").dataset.items || "[]");

    const filtered = all.filter(p =>
      p.name?.toLowerCase().includes(term) ||
      p.department?.toLowerCase().includes(term) ||
      p.title?.toLowerCase().includes(term)
    );

    drawDirectory(filtered);
  });
}

function renderForms(items){
  const mount = document.getElementById("formsList");
  if(!mount) return;

  mount.innerHTML = items.map(f => `
    <a class="formItem" href="${f.href}" target="_blank">
      ${f.label}
    </a>
  `).join("");
}

function renderContacts(items){
  const mount = document.getElementById("contactsList");
  if(!mount) return;

  mount.innerHTML = items.map(c => `
    <div class="contactItem">
      <strong>${c.name}</strong>
      <div>${c.role}</div>
      ${c.phone ? `<div>${c.phone}</div>` : ""}
      ${c.email ? `<div>${c.email}</div>` : ""}
    </div>
  `).join("");
}