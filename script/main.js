let allData = [];

// spinner start from here
  const toggleSpinner = isLoading => {
    if (isLoading === true) {
      document.getElementById('spinner').classList.remove('hidden');
      document.getElementById('main-cards').classList.add('hidden');
    } else {
      document.getElementById('main-cards').classList.remove('hidden');
      document.getElementById('spinner').classList.add('hidden');
    }
  };

const loadData = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => {
      allData = data.data;
      displayCards(allData);
    });
};

// dynamic border top start from here
const getBorderTop = status => {
  if (status === 'open') return 'border-top-green';
  if (status === 'closed') return 'border-top-yellow';
  return 'shadow-md';
};
// dynamic status image start from here 
const getStatusImage = status => {
  if (status === 'open') return './assets/Open-Status.png';
  if (status === 'closed') return './assets/Closed- Status .png';
};
//dynamic status start from here
const getStatusClass = status => {
  if (status === 'open')
    return 'bg-green-100 text-green-600 rounded-2xl py-1 px-4 text-center mt-5';
  if (status === 'closed')
    return 'bg-purple-100 text-purple-600 py-1 px-4 text-center mt-5';
};
// fetch priority start from here
const getPriorityClass = priority => {
  if (priority === 'high')
    return 'bg-green-100 text-green-600 rounded-2xl px-4 text-center';
  if (priority === 'low') return 'bg-red-100 text-red-500 px-4 text-center';
  if (priority === 'medium')
    return 'bg-yellow-100 text-yellow-500 px-4 text-center';
};
// fetch labels start from here
const getLabels = labels => {
  return labels
    .map(label => {
      if (label === 'bug')
        return `<p class="bg-red-100 border line-clamp-1 border-red-300 text-red-600 rounded-2xl px-2 py-1"><i class="fa-solid fa-bug"></i> ${label}</p>`;
      if (label === 'help wanted')
        return `<p class="bg-green-100 border line-clamp-1 border-green-300 text-green-600 rounded-2xl px-2 py-1"><i class="fa-solid fa-hand-holding-heart"></i> ${label}</p>`;
      if (label === 'enhancement')
        return `<p class="bg-blue-100 border line-clamp-1 border-blue-300 text-blue-600 rounded-2xl px-2 py-1"><i class="fa-regular fa-star"></i> ${label}</p>`;
      if (label === 'documentation')
        return `<p class="bg-gray-100 border line-clamp-1 border-gray-300 text-gray-500 rounded-2xl px-2 py-1"><i class="fa-regular fa-file-lines"></i> ${label}</p>`;
      if (label === 'good first issue')
        return `<p class="bg-pink-100 border line-clamp-1 border-pink-300 text-pink-600 rounded-2xl px-2 py-1"><i class="fa-regular fa-handshake"></i> ${label}</p>`;
    })
    .join(' ');
};
// modal start from here
const showModal = async id => {
  toggleSpinner(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  const card = data.data;
  toggleSpinner(false);
  document.getElementById('details-container').innerHTML = `
    <div class="space-y-4">
    <h2 class="text-2xl font-bold">${card.title}</h2>
    <div class="flex gap-5 text-center">
      <div class="${getStatusClass(card.status)} p-2 rounded-2xl">
              <h2 class="font-bold">${card.status}</h2>
            </div>
      <div class="flex flex-row gap-5">
      <p class="text-gray-500 mt-5">${card.assignee}</p>
      <p class="text-gray-500 mt-5">${card.updatedAt}</p></div>
    </div>

    <div class="flex gap-3">
    ${getLabels(card.labels)}
    </div>
    <h2 class="text-gray-800 font-medium">${card.description}</h2>
    <div class="flex gap-5">
      <div class="flex flex-col gap-3">
        <p class="text-gray-500">ASSIGNED:</p>
        <h2 class="font-bold ">${card.assignee}</h2>
      </div>
      <div class="flex flex-col gap-3">
        <p class="text-gray-500">PRIORITYS:</p>
        <div class="${getPriorityClass(card.priority)} p-2 rounded-2xl">
              <h2 class="font-bold">${card.priority}</h2>
            </div>
      </div>
    </div>
  </div>
  `;
  my_modal_5.showModal();
};
// all display cards start form here
const displayCards = cards => {
  toggleSpinner(true);
  // console.log(cards)
  const cardContainer = document.getElementById('main-cards');
  cardContainer.innerHTML = '';

  document.getElementById('issue-count').innerText = cards.length;

  cards.forEach(card => {
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
     <div class="space-y-10 cursor-pointer px-5 ${getBorderTop(card.status)}" onclick="showModal(${card.id})">

          <div class="flex justify-between">
            <img class="w-10 mt-5" src="${getStatusImage(card.status)}" alt="">
            <div class="${getStatusClass(card.status)} p-2 rounded-2xl">
              <h2 class="font-bold">${card.status}</h2>
            </div>
          </div>

          <div class="space-y-4">
            <h2 class="line-clamp-1 font-bold text-2xl">${card.title}</h2>
            <p class="line-clamp-2 text-gray-400">${card.description}</p>
            <div class="flex gap-3">
              ${getLabels(card.labels)}
            </div>
          </div>

          <hr class="border border-gray-300">

          <div>
            <p class="text-gray-400">${card.assignee}</p>
            <p class="text-gray-400">${card.createdAt}</p>
          </div>
          
        </div>
    `;
    cardContainer.appendChild(createDiv);
  });
  toggleSpinner(false);
};
// buttons active inactive start from here
const activeBtn = activeId => {
  const allBtn = document.getElementById('all-btn');
  const openBtn = document.getElementById('open-btn');
  const closedBtn = document.getElementById('closed-btn');

  allBtn.classList.add('btn-outline');
  allBtn.classList.remove('btn-primary');

  openBtn.classList.add('btn-outline');
  openBtn.classList.remove('btn-primary');

  closedBtn.classList.add('btn-outline');
  closedBtn.classList.remove('btn-primary');

  document.getElementById(activeId).classList.add('btn-primary');
  document.getElementById(activeId).classList.remove('btn-outline');
};
// buttons filters start from here..
const allBtn = () => {
  displayCards(allData);
  activeBtn('all-btn');
};
const openBtn = () => {
  const openCards = allData.filter(card => card.status === 'open');
  displayCards(openCards);
  activeBtn('open-btn');
};

const closedBtn = () => {
  const closedCards = allData.filter(card => card.status === 'closed');
  displayCards(closedCards);
  activeBtn('closed-btn');
};

loadData();
// search start from here
document.addEventListener('keyup', event => {
  if (event.target.id === 'search-input') {
    const searchInput = event.target.value.trim().toLowerCase();
    const searchResult = allData.filter(
      card =>
        card.title.toLowerCase().includes(searchInput) ||
        card.description.toLowerCase().includes(searchInput),
    );
    displayCards(searchResult);
  }
});
