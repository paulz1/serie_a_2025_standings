// filter.js
document.addEventListener('DOMContentLoaded', ()=> {
  const filterDiv = document.getElementById('filter');
  // add Clear button
  const clearBtn = document.createElement('button');
  clearBtn.id = 'clearBtn';
  clearBtn.textContent = 'Clear';
  filterDiv.append(clearBtn);

  clearBtn.addEventListener('click', () => {
    document.getElementById('patternInput').value = '';
    document.getElementById('teamSelect').selectedIndex = 0;
    document.querySelectorAll('.scenario').forEach(div => { div.style.display = ''; });
  });

  // collect all team names from the first scenario’s table
  const teamSet = new Set();
  document.querySelectorAll('.scenario table tr').forEach(tr => {
    const name = tr.querySelectorAll('td')[1];
    if (name) teamSet.add(name.textContent.trim());
  });
  const sel = document.getElementById('teamSelect');
  Array.from(teamSet).sort().forEach(t=>{
    const o = document.createElement('option');
    o.value = t; o.textContent = t;
    sel.append(o);
  });

  document.getElementById('filterBtn').addEventListener('click', () => {
    const team = sel.value;
    const pattern = document.getElementById('patternInput').value
                          .split(',').map(s=>s.trim().toUpperCase());
    document.querySelectorAll('.scenario').forEach(div => {
      const row = Array.from(div.querySelectorAll('table tr'))
                       .find(tr => tr.cells[1].textContent.trim() === team);
      if (!row) return div.style.display = 'none';
      const results = row.cells[3].textContent
                         .split(',').map(s=>s.trim().toUpperCase());
      // exact-match:
      const ok = pattern.length === results.length
              && pattern.every((p,i)=>p === results[i]);
      div.style.display = ok ? '' : 'none';
    });
  });
});