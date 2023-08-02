const form = document.getElementById('form');
let gameId = '';

function submitForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');

  const data = {
    name: nameInput.value,
    score: scoreInput.value,
    user: 'John Doe',
  };

  fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Soccer LeadorBoard',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const id = data.result.match(/ID: (\w+)/)[1];
      gameId = id;
      return id;
    })
    .then((id) => {
      fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Score posted successfully:', result);
        })
        .catch((error) => {
          console.error('Error posting score:', error);
          return alert('something went wrong');
        });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// display data

const dynamicDisplay = document.getElementById('dynamicDisplay');
const refreshButton = document.getElementById('refresh');

const refreshScores = () => {
  const id = gameId; 
  
  fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Received scores:', data);
      displayScores(data.result);
    })
    .catch((error) => {
      console.error('Error fetching scores:', error);
    });
};

function displayScores(scores) {
  dynamicDisplay.innerHTML = '';

  scores.forEach((score) => {
    const scoreElement = document.createElement('div');
    scoreElement.innerHTML = `${score.user}: ${score.score}`;
    dynamicDisplay.appendChild(scoreElement); `  score.user}: ${score.score}`;
    dynamicDisplay.appendChild(scoreElement);
  });
}

refreshButton.addEventListener('click', refreshScores);
form.addEventListener('submit', submitForm);
