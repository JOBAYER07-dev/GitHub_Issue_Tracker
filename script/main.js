const loadData = () => {
  fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
    .then(res => res.json())
    .then(data => displayCards(data.data));
};

const getPriorityClass = priority => {
  if (priority === 'high') return 'bg-red-100 text-red-600 rounded-2xl px-4';
  if (priority === 'medium') return 'bg-yellow-100 text-yellow-500 px-4';
  if (priority === 'low') return 'bg-gray-200 text-gray-500 px-4';
  return 'bg-gray-100 text-gray-500';
};

const getLabels = labels => {
  return labels
    .map(label => {
      if (label === 'bug')
        return `<p class="bg-red-100 border border-red-300 text-red-600 rounded-2xl px-2 py-1"><i class="fa-solid fa-bug"></i> ${label}</p>`;
      if (label === 'help wanted')
        return `<p class="bg-green-100 border border-green-300 text-green-600 rounded-2xl px-2 py-1"><i class="fa-solid fa-hand-holding-heart"></i> ${label}</p>`;
      if (label === 'enhancement')
        return `<p class="bg-blue-100 border border-blue-300 text-blue-600 rounded-2xl px-2 py-1"><i class="fa-regular fa-star"></i> ${label}</p>`;
      if(label==='documentation') 
        return `<p class="bg-gray-100 border border-gray-300 text-gray-500 rounded-2xl px-2 py-1"><i class="fa-regular fa-file-lines"></i> ${label}</p>`
      if (label === 'good first issue')
        return `<p class="bg-pink-100 border border-pink-300 text-pink-600 rounded-2xl px-2 py-1"><i class="fa-regular fa-handshake"></i> ${label}</p>`;
    })
    .join(' ');
};

const displayCards = cards => {
  // console.log(cards)
  const cardContainer = document.getElementById('main-cards');
  cardContainer.innerHTML = '';

  cards.forEach(card => {
    const createDiv = document.createElement('div');
    createDiv.innerHTML = `
     <div class="space-y-10">

          <div class="flex justify-between">
            <img class="w-10" src="./assets/Open-Status.png" alt="">
            <div class="${getPriorityClass(card.priority)} p-2 rounded-2xl">
              <h2 class="font-bold">${card.priority}</h2>
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
};

loadData();
displayCards();
