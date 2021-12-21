const cardContentElement = document.querySelectorAll('.card-content');
const timeBtns = document.querySelectorAll('.time');

const selected = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
};
const alwaysTrue = true;

let selection = selected.WEEKLY;

const dailyBtn = document.getElementById('daily-btn');
dailyBtn.addEventListener('click', function () {
  selection = selected.DAILY;
  disableButtons();
  dailyBtn.classList.remove('disabled');
  dailyBtn.classList.add('active');
  getData();
});

const monthlyBtn = document.getElementById('monthly-btn');
monthlyBtn.addEventListener('click', function () {
  selection = selected.MONTHLY;
  disableButtons();
  monthlyBtn.classList.remove('disabled');
  monthlyBtn.classList.add('active');
  getData();
});

const weeklyBtn = document.getElementById('weekly-btn');
weeklyBtn.addEventListener('click', function () {
  selection = selected.WEEKLY;
  disableButtons();
  weeklyBtn.classList.remove('disabled');
  weeklyBtn.classList.add('active');

  getData();
});

function disableButtons() {
  timeBtns.forEach((element) => {
    element.className = 'time disabled';
  });
}

async function getData() {
  let dataResponse = await fetch('./data.json');

  let jsonData = await dataResponse.json();

  cardContentElement.forEach((element, index) => {
    let current;
    let previous;
    if (selection === selected.DAILY) {
      current = jsonData[index].timeframes.daily.current;
      previous = jsonData[index].timeframes.daily.previous;
    } else if (selection === selected.MONTHLY) {
      current = jsonData[index].timeframes.monthly.current;
      previous = jsonData[index].timeframes.monthly.previous;
    } else if (selection === selected.WEEKLY) {
      current = jsonData[index].timeframes.weekly.current;
      previous = jsonData[index].timeframes.weekly.previous;
    }

    element.innerHTML = `
    <div class="title">
    <div class="row"> 
    <p class="heading">${jsonData[index].title}</p>
    <img class="ellipsis" src="./images/icon-ellipsis.svg" alt="" />
    </div>
    <div class="flex">
    <p class="total">
       ${current}
    hrs</p>
    <p class="last-week">Last Week - ${previous}hrs</p> 
    </div>`;
  });
}

getData();

/* <div class="title">
              <div class="name">
                <p class="heading">Work</p>
                <img class="ellipsis" src="./images/icon-ellipsis.svg" alt="" />
              </div>
            </div>
            <p class="total">32hrs</p>
            <p class="last-week">Last Week - 36hrs</p> */
