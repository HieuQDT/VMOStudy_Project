const { isNumber } = require('lodash');
const { pageSortMess } = require('../utils/systemMessenge');

const pageSort = (array, pageNumber, pageSize) => {

    // VALIDATE PAGE & CALCULATION
    if (!(isNumber(pageNumber)) && !(isNumber(pageSize))) return {messenge: pageSortMess.emptyBody};
    if (!(isNumber(pageNumber))) return { messenge: pageSortMess.invalidNumber };
    if (!(isNumber(pageSize))) return { messenge: pageSortMess.invalidSize };
    if (pageNumber <= 0 || pageSize <= 0) return { messenge: pageSortMess.zeroNumber };

    // CALCULATE TOTAL PAGE
    const pageCount = Math.ceil(array.length / pageSize);
    if (pageNumber > pageCount) return { messenge: pageSortMess.largePageNumber };

    // CALCULATE RESULTS
    const result = array.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);

    // PRINT RESULTS
    let sortedData = {
        data: result,
        page: pageNumber,
        pageSize: pageSize,
        totalPage: pageCount,
        totalItem: array.length,
    };

    return sortedData;
};

///////////////////////////////////// EXPORT MODULES
const middleware = { pageSort };
module.exports = middleware;
