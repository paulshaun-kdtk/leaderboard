const form = document.getElementById('form');
let gameId = '';

async function submitForm(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const scoreInput = document.getElementById('score');

  const data = {
    name: nameInput.value,
    score: scoreInput.value,
    user: 'John Doe',
  };

  try {
    const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Soccer LeadorBoard',
      }),
    });

    const responseData = await response.json();
    const id = responseData.result.match(/ID: (\w+)/)[1];
    gameId = id;

    const scoresResponse = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await scoresResponse.json();
    console.log('Score posted successfully:', result);
  } catch (error) {
    console.error('Error:', error);
    alert('Something went wrong');
  }
}

// Display data

const dynamicDisplay = document.getElementById('dynamicDisplay');
const refreshButton = document.getElementById('refresh');

const refreshScores = async () => {
  const id = gameId;

  try {
    const response = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${id}/scores`);
    const data = await response.json();
    console.log('Received scores:', data);
    displayScores(data.result);
  } catch (error) {
    console.error('Error fetching scores:', error);
  }
};

function displayScores(scores) {
  dynamicDisplay.innerHTML = '';

  scores.forEach((score) => {
    const scoreElement = document.createElement('div');
    scoreElement.innerHTML = `${score.user}: ${score.score}`;
    dynamicDisplay.appendChild(scoreElement);
  });
}

refreshButton.addEventListener('click', refreshScores);
form.addEventListener('submit', submitForm);