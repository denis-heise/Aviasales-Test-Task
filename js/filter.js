//сортировка данных по цене
function filterByPrice (data){
    return data.sort((a, b) => a.price > b.price ? 1 : -1);
}

//сортировка данных по времени в пути
function filterByDuratione (data){
    return data.sort((a, b) => a.segments[0].duration > b.segments[0].duration ? 1 : -1);
}

//сортировка данных по количеству остановок
function filterByStops (data, kit, element){
    let newArr;
    let newData = [];

    switch(element.length){
        case 0:
            return data;
        case 1:
            return data.filter(item => item.segments[0].stops.length === kit[element] && item.segments[1].stops.length === kit[element]);
        default:
        element.forEach(num => {
            newArr = data.filter(item => item.segments[0].stops.length === kit[num] && item.segments[1].stops.length === kit[num]);
            newData = newData.concat(newArr);
        });
    }
    return newData;
}
export {filterByPrice, filterByDuratione, filterByStops};