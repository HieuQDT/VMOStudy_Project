/////////////////////////////////////// MIDDLEWARE & VALIDATION MESSENGES
const pageSortMess = {
    emptyBody: 'Empty required field(s)',
    zeroNumber: 'Input cannot be zero',
    invalidNumber: 'Invalid pageNumber input',
    invalidSize: 'Invalid pageSize input',
    largePageNumber: 'pageNumber exceed total pages available',
};

const getID = {
    invalidID: 'Cannot find ID',
    unexpectedErr: 'Unexpected error',
};

const tokenValidation = {
    requireToken: 'Acess denied: Please log in.',
    invalidToken: 'Invalid login token',
    requireAdmin: 'Acess denied: Administrator permission require.',
};

/////////////////////////////////////// CONTROLLER MESSENGES
const itemMessenge = {
    unexpectedErr: 'Unexpected error',
    successCreate: 'Sucessfully create a new item',
    alreadyExist: 'Item already exist',
    invalidCategory: 'Cannot find category',
    orderExistNoDelete: 'There is an order listing this item',
    successDeleted: 'Succesfully delete item',
    successUpdated: 'Update report',
};

const fsaleMessenge = {
    unexpectedErr: 'Unexpected error',
    largeStartDate: 'startDate must be earlier than endDate',
    pastStartDate: 'startDate must be later than current time',
    successCreate: 'Sucessfully create a new flash sale',
    alreadyExist: 'For this item, there is a flash sale exist already during the chosen time',
    successDeleted: 'Succesfully delete flash sale',
    successUpdated: 'Update report',
};

const voucherMessenge = {
    unexpectedErr: 'Unexpected error',
    pastEndDate: 'startDate must be later than current time',
    findNoItem: 'There is no item to apply voucher',
    successCreate: 'Sucessfully create a new voucher',
    successDeleted: 'Succesfully delete voucher',
    successUpdated: 'Update report',
};

const orderMessenge = {
    unexpectedErr: 'Unexpected error',
    pastEndDate: 'startDate must be later than current time',
    findNoItem: 'Item not found',
    outOfStock: 'Item out of stock',
    findNoVoucher: 'Voucher not found',
    successCreate: 'Sucessfully create a new order',
    successDeleted: 'Succesfully delete order',
};

const userMessenge = {
    unexpectedErr: 'Unexpected error',
    emailExist: 'Email has already in use',
    successCreate: 'Sucessfully create a new user. A verification email has been send',
    userVerifyNoToken: 'Cannot find token',
    userVerifyNoUser: 'Cannot find user',
    userVerifySuccess: 'Account has been verified',
    userLoginFail: 'Email or password is incorrect',
    userLoginNoVerify: 'Account has not been verified',
    userLoginSuccess: 'Login successful! Welcome, user.',
    successDeleted: 'Succesfully delete user',
    successUpdated: 'Update report',
};

const categoryMessenge = {
    unexpectedErr: 'Unexpected error',
    categoryExist: 'Category already exist',
    successCreate: 'Sucessfully create a new category',
    successDeleted: 'Succesfully delete category',
    successUpdated: 'Update report',
};

/////////////////////////////////////// EXPORT MESSENGE
const exportsMessenge = {
    pageSortMess,
    getID,
    tokenValidation,
    fsaleMessenge,
    voucherMessenge,
    orderMessenge,
    itemMessenge,
    userMessenge,
    categoryMessenge,
};
module.exports = exportsMessenge;