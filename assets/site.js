const search = document.querySelector('#site-search');
const filters = [...document.querySelectorAll('.filter')];
const posters = [...document.querySelectorAll('.site-poster')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
let category = 'all';

function updateDirectory() {
  const query = search.value.trim().toLocaleLowerCase('zh-CN');
  let visible = 0;
  for (const poster of posters) {
    const categoryMatch = category === 'all' || poster.dataset.category === category;
    const searchMatch = !query || poster.dataset.search.toLocaleLowerCase('zh-CN').includes(query);
    poster.hidden = !(categoryMatch && searchMatch);
    if (!poster.hidden) visible += 1;
  }
  count.textContent = `共 ${visible} 个网站`;
  empty.hidden = visible !== 0;
}

for (const button of filters) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    for (const filter of filters) {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    }
    updateDirectory();
  });
}
search.addEventListener('input', updateDirectory);
