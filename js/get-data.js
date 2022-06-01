import {filterByPrice, filterByDuratione, filterByStops} from './filter.js';
const stopsType = {
  'all': [0, 1, 2, 3],
  'no-stops': 0,
  'one-stop': 1,
  'two-stops': 2,
  'three-stops': 3
}

const URL_DATA = 'http://localhost:3000/tickets';
const NUMBER_DISPLAYED_TICKETS= 5;
const SHORT_TIME = 10;
const NUMBER_MINUTES_IN_HOUR = 60;
const NUMBER_HOURS_IN_DAY = 24;
const placeTickets = document.querySelector('.main-page__tickets');
const checkedType = document.querySelector('.cheap');
const quickType = document.querySelector('.quick');
let wordType;

function createTickets (){
  fetch(URL_DATA)
  .then(response => response.json()) 
  .then((data) => showTickets(data))
  .catch(error => console.log(error));

    //функция возвращающая часы и минуты
  function getTime(mins) {
    let hours = Math.trunc(mins/60);
    let minutes = mins % 60;
    return [hours, minutes];
  };

  //функция отображающая билеты
  function showTickets (data){
    const stopsBlock = document.querySelector('.main-page__type-stops');
    const stops = stopsBlock.querySelectorAll('.visible')
    const newStops = Array.from(stops).map(item => item.id);
    let newData = data; 

    switch(stopsType[newStops]){
      case 0:
        newData = filterByStops(data, stopsType, newStops);
        break;
      case 1:
        newData = filterByStops(data, stopsType, newStops);
        break;
      case 2:
        newData = filterByStops(data, stopsType, newStops);
        break;
      case 3:
        newData = filterByStops(data, stopsType, newStops);
        break;
      case undefined:
        newData = filterByStops(data, stopsType, newStops);
    }

    if(checkedType.classList.contains('checked-type')){
      filterByPrice(newData);
    } else if(quickType.classList.contains('checked-type')){
      filterByDuratione(newData);
    }

    for (let i = 0; i < NUMBER_DISPLAYED_TICKETS; i++){
      getTicket(newData[i]);
    };
  };

  //функция отображающая билет
  function getTicket (data){
    const ticketTemplate = document.querySelector('#tickets').content;
    const ticketNode = ticketTemplate.cloneNode(true);
    const price = ticketNode.querySelector('.main-page__price');
    const numberPrice = new Intl.NumberFormat().format(data.price);

    price.textContent = `${numberPrice} P`;

    for (let i = 0; i < 2; i++){
      getTicketDetails(data.segments[i], i, ticketNode);
    }

    placeTickets.append(ticketNode);
  };

  //функция отображающая детали/информация билета
  function getTicketDetails (segments, item, node){
    switch(item) {
      case(0):
      wordType = 'thither';
      break;
      case(1):
      wordType = 'back';
      break;
    };

    const thitherOrigin = node.querySelector(`.${wordType}__origin`);
    const thitherDestination = node.querySelector(`.${wordType}__destination`);
    const timeDeparture = node.querySelector(`.${wordType}__time-departure`);
    const timeArrival = node.querySelector(`.${wordType}__time-arrival`);
    const time = node.querySelector(`.${wordType}__time-way`);
    const titleStops = node.querySelector(`.${wordType}__title-stops`);
    const stops = node.querySelector(`.${wordType}__stops`);
    const dataTime = segments.duration;
    const dataNewTime = getTime(dataTime);
    const dataNumberDeparture = new Date(segments.date);
    const dataStops = segments.stops;

    //добавляем город отправки и прибытия
    thitherOrigin.textContent = segments.origin;
    thitherDestination.textContent = segments.destination;

    let dataHoursArrival = dataNumberDeparture.getUTCHours()+dataNewTime[0];
    let dataMinutesArrival = dataNumberDeparture.getUTCMinutes()+dataNewTime[1];

    //добавляем время отправления
    if(dataNumberDeparture.getUTCMinutes() < 10){
      timeDeparture.textContent = `${dataNumberDeparture.getUTCHours()}:0${dataNumberDeparture.getUTCMinutes()}`;
    } else {
      timeDeparture.textContent = `${dataNumberDeparture.getUTCHours()}:${dataNumberDeparture.getUTCMinutes()}`;
    };
    //добавляем 0, если время отправления до 10 утра
    if(dataNumberDeparture.getUTCHours() < SHORT_TIME){
      timeDeparture.textContent = `0${timeDeparture.textContent}`;
    };

    //время в пути
    if(dataNewTime[1] < SHORT_TIME){
      time.textContent = `${dataNewTime[0]}Ч 0${dataNewTime[1]}М`;
    } else {
      time.textContent = `${dataNewTime[0]}Ч ${dataNewTime[1]}М`;
    }

    //время прибытия
    //часы
    //проверяем, если в пути более суток, то высесляем время прибытия с учётом времени в пути
    if(dataHoursArrival >= NUMBER_HOURS_IN_DAY){
      dataHoursArrival = dataHoursArrival - NUMBER_HOURS_IN_DAY;
      if(dataHoursArrival >= NUMBER_HOURS_IN_DAY){
        dataHoursArrival = dataHoursArrival - NUMBER_HOURS_IN_DAY;
      };
    };
    //минуты
    if(dataMinutesArrival >= NUMBER_MINUTES_IN_HOUR){
      dataMinutesArrival = dataMinutesArrival - NUMBER_MINUTES_IN_HOUR;
      if(dataMinutesArrival === 0){
        dataMinutesArrival = `00`
      };
      dataHoursArrival = dataHoursArrival + 1;
    };
    //добавляем 0, если время прибытия до 10 утра
    if(dataHoursArrival < SHORT_TIME){
      dataHoursArrival = `0${dataHoursArrival}`;
    };
    timeArrival.textContent = `${dataHoursArrival}:${dataMinutesArrival}`;

    //меняем информацию о пересадка в зависимости от количества пересадок
    switch(dataStops.length){
      case (0):
        titleStops.textContent = 'Без пересадок';
        break;
      case(1):
        titleStops.textContent = '1 пересадка';
        break;
      case (2):
        titleStops.textContent = '2 пересадки';
        break;
      case (3):
        titleStops.textContent = '3 пересадки';
        break;
    };
    //добавляем пересадки
    stops.textContent = dataStops.join(', ');
  }
}
export {createTickets};