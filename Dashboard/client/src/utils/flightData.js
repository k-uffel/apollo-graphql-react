export function prepNumberOfFlightsPerYear(data) {
    let dataset = Object.values(data.reduce((mapping, item) => {
        const {[item.year]: matchingItem} = mapping;

        if (matchingItem) {
            matchingItem.count++;
        } else {
            mapping[item.year] = {year: item.year, count: 1};
        }

        return mapping;
    }, {}))
    let numberOfFlightsPerYear = {labels: [], dataset: []};
    dataset.forEach(item => {
        numberOfFlightsPerYear.labels.push(item.year)
        numberOfFlightsPerYear.dataset.push(item.count)
    })
    return numberOfFlightsPerYear;
}