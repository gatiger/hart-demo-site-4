document.addEventListener("DOMContentLoaded", () => {
  loadDirectory();
});

async function loadDirectory(){
  try{
    const res = await fetch("/content/employee_directory.json", { cache: "no-store" });
    if(!res.ok) throw new Error(`Failed to load directory (${res.status})`);

    const data = await res.json();
    renderDirectory(data.directory || []);
  }catch(err){
    console.error("Directory load error:", err);
  }
}

function renderDirectory(items){
  const mount = document.getElementById("employeeDirectoryTable");
  if(!mount) return;

  mount.innerHTML = items.map(person => `
    <tr>
      <td>
        ${person.email
          ? `<a href="mailto:${escapeHtml(person.email)}">${escapeHtml(person.name)}</a>`
          : escapeHtml(person.name)
        }
      </td>
      <td>${escapeHtml(person.phone || "")}</td>
      <td>${escapeHtml(person.extension || "")}</td>
    </tr>
  `).join("");
}

function escapeHtml(value){
  return String(value ?? "").replace(/[&<>"']/g, ch => {
    switch(ch){
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "\"": return "&quot;";
      case "'": return "&#39;";
      default: return ch;
    }
  });
}