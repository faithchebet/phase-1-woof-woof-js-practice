document.addEventListener('DOMContentLoaded', () => {
    const dogBar = document.getElementById('dog-bar');
    const dogInfo = document.getElementById('dog-info');
    const filterButton = document.getElementById('good-dog-filter');
  
    
    const fetchDogs = async () => {
      const response = await fetch('http://localhost:3000/pups');
      const dogs = await response.json();
      displayDogBar(dogs);
    };
  
    
    const displayDogBar = (dogs) => {
      dogBar.innerHTML = '';
      dogs.forEach((dog) => {
        const span = document.createElement('span');
        span.textContent = dog.name;
        span.addEventListener('click', () => showDogInfo(dog));
        dogBar.appendChild(span);
      });
    };
  
    
    const showDogInfo = (dog) => {
      dogInfo.innerHTML = `
        <img src="${dog.image}" />
        <h2>${dog.name}</h2>
        <button id="toggle-good-dog" data-dog-id="${dog.id}">
          ${dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}
        </button>
      `;
      const toggleButton = document.getElementById('toggle-good-dog');
      toggleButton.addEventListener('click', () => toggleGoodDogStatus(dog));
    };
  
    
    const toggleGoodDogStatus = async (dog) => {
      const newStatus = !dog.isGoodDog;
      const response = await fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isGoodDog: newStatus }),
      });
      const updatedDog = await response.json();
      showDogInfo(updatedDog);
    };
  

    const filterGoodDogs = async () => {
      const filterStatus = filterButton.textContent.includes('ON');
      const response = await fetch('http://localhost:3000/pups');
      const dogs = await response.json();
  
      if (filterStatus) {
        const goodDogs = dogs.filter((dog) => dog.isGoodDog);
        displayDogBar(goodDogs);
      } else {
        displayDogBar(dogs);
      }
    };
  
    
    filterButton.addEventListener('click', () => {
      filterButton.textContent =
        filterButton.textContent.includes('ON')
          ? 'Filter good dogs: OFF'
          : 'Filter good dogs: ON';
      filterGoodDogs();
    });
  

    fetchDogs();
  });
  