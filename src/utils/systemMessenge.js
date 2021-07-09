
/////////////////////////////////////// MIDDLEWARE & VALIDATION MESSENGES
const pageSortMess = {
    emptyBody: {
        messengeCode: 'EMPTY_BODY',
        messenge: 'Empty required field(s)',
    },
    zeroNumber: {
        messengeCode: 'ZERO_NUMBER',
        messenge: 'Input cannot be zero',
    },
    invalidNumber: {
        messengeCode: 'INVALID_NUMBER',
        messenge: 'Invalid pageNumber input',
    },
    invalidSize: {
        messengeCode: 'INVALID_SIZE',
        messenge: 'Invalid pageSize input',
    },
    largePageNumber: {
        messengeCode: 'LARGE_PAGE_NUMBER',
        messenge: 'pageNumber exceed total pages available',
    },
};

const getID = {
    invalidID: {
        messengeCode: 'INVALID_ID',
        messenge: 'Cannot find ID',
    },
    unexpectedErr: {
        messengeCode: 'UNEXPECTED_ERROR',
        messenge: 'Unexpected error',
    },
};

const tokenValidation = {
    requireToken: {
        messengeCode: 'REQUIRE_TOKEN',
        messenge: 'Acess denied: Please log in.',
    },
    invalidToken: {
        messengeCode: 'INVALID_TOKEN',
        messenge: 'Invalid login token',
    },
    requireAdmin: {
        messengeCode: 'REQUIRE_ADMIN',
        messenge: 'Acess denied: Administrator permission require.',
    },
};

/////////////////////////////////////// CONTROLLER MESSENGES
const itemMessenge = {
    unexpectedErr: {
        messengeCode: 'UNEXPECTED_ERROR',
        messenge: 'Unexpected error',
    },
    successCreate: {
        messengeCode: 'SUCCESS_CREATE',
        messenge: 'Sucessfully create a new item',
    },
    alreadyExist: {
        messengeCode: 'ALREADY_EXIST_ITEM',
        messenge: 'Item already exist',
    },
    invalidCategory: {
        messengeCode: 'INVALID_CATEGORY',
        messenge: 'Cannot find category',
    },
    orderExistNoDelete: {
        messengeCode: 'ORDER_EXIST',
        messenge: 'There is an order listing this item',
    },
    successDeleted: {
        messengeCode: 'SUCCESS_DETLETE_ITEM',
        messenge: 'Succesfully delete item',
    },
    successUpdated: {
        messengeCode: 'UPDATE_REPORT_ITEM',
        messenge: 'Updated report',
    },
};

const fsaleMessenge = {
    unexpectedErr: {
        messengeCode: 'UNEXPECTED_ERROR',
        messenge: 'Unexpected error',
    },
    largeStartDate: {
        messengeCode: 'EARLY_START_DATE',
        messenge: 'startDate must be earlier than endDate',
    },
    pastStartDate: {
        messengeCode: 'PAST_START_DATE',
        messenge: 'startDate must be later than current time',
    },
    successCreate: {
        messengeCode: 'SUCCESS_CREATE_FSALE',
        messenge: 'Sucessfully create a new flash sale',
    },
    alreadyExist: {
        messengeCode: 'ALREADY_EXIST_FSALE',
        messenge: 'For this item, there is a flash sale exist already during the chosen time',
    },
    successDeleted: {
        messengeCode: 'SUCCESS_DELETE_FSALE',
        messenge: 'Succesfully delete flash sale',
    },
    successUpdated: {
        messengeCode: 'UPDATE_REPORT_FSALE',
        messenge: 'Update report',
    },
};

const voucherMessenge = {
    unexpectedErr: {
        messengeCode: 'UNEXPECTED_ERROR',
        messenge: 'Unexpected error',
    },
    pastEndDate: {
        messengeCode: 'PAST_END_DATE',
        messenge: 'endDate must be later than current time',
    },
    findNoItem: {
        messengeCode: 'FIND_NO_ITEM',
        messenge: 'There is no item to apply voucher',
    },
    successCreate: {
        messengeCode: 'SUCCESS_CREATE_VOUCHER',
        messenge: 'Sucessfully create a new voucher',
    },
    successDeleted: {
        messengeCode: 'SUCCESS_DELETE_VOUCHER',
        messenge: 'Succesfully delete voucher',
    },
    successUpdated: {
        messengeCode: 'UPDATE_REPORT_VOUCHER',
        messenge: 'Update report',
    },
};

const orderMessenge = {
    unexpectedErr: {
        messengeCode: 'UNEXPECTED_ERROR',
        messenge: 'Unexpected error',
    },
    findNoItem: {
        messengeCode: 'FIND_NO_ITEM',
        messenge: 'Item not found',
    },
    outOfStock: {
        messengeCode: 'OUT_OF_STOCK',
        messenge: 'Item out of stock',
    },
    findNoVoucher: {
        messengeCode: 'FIND_NO_VOUCHER',
        messenge: 'Voucher not found',
    },
    successCreate: {
        messengeCode: 'SUCCESS_CREATE_ORDER',
        messenge: 'Sucessfully create a new order',
    },
    successDeleted: {
        messengeCode: 'SUCCESS_DELETE_ORDER',
        messenge: 'Succesfully delete order',
    },
};

const userMessenge = {
    unexpectedErr: {
        messengeCode: 'UNEXPECTED_ERROR',
        messenge: 'Unexpected error',
    },
    emailExist: {
        messengeCode: 'EMAIL_EXISTED',
        messenge: 'Email has already in use',
    },
    successCreate: {
        messengeCode: 'SUCCESS_CREATE_USER',
        messenge: 'Sucessfully create a new user. A verification email has been send',
    },
    userVerifyNoToken: {
        messengeCode: 'USER_VERIFY_NO_TOKEN',
        messenge: 'Cannot find token',
    },
    userVerifyNoUser: {
        messengeCode: 'USER_VERIFY_NO_USER',
        messenge: 'Cannot find user',
    },
    userVerifySuccess: {
        messengeCode: 'USER_VERIFY_SUCCESS',
        messenge: 'Account has been verified',
    },
    userLoginFail: {
        messengeCode: 'USER_LOGIN_INPUT_ERROR',
        messenge: 'Email or password is incorrect',
    },
    userLoginNoVerify: {
        messengeCode: 'USER_LOGIN_VERIFY_ERROR',
        messenge: 'Account has not been verified',
    },
    userLoginSuccess: {
        messengeCode: 'USER_LOGIN_SUCCESS',
        messenge: 'Login successful! Welcome, user.',
    },
    successDeleted: {
        messengeCode: 'SUCCESS_DELETE_USER',
        messenge: 'Succesfully delete user',
    },
    successUpdated: {
        messengeCode: 'UPDATE_REPORT_USER',
        messenge: 'Update report',
    },
};

const categoryMessenge = {
    unexpectedErr: {
        messengeCode: 'UNEXPECTED_ERROR',
        messenge: 'Unexpected error',
    },
    categoryExist: {
        messengeCode: 'CATEGORY_EXIST',
        messenge: 'Category already exist',
    },
    successCreate: {
        messengeCode: 'SUCCESS_CREATE_CATEGORY',
        messenge: 'Sucessfully create a new category',
    },
    successDeleted: {
        messengeCode: 'SUCCESS_DELETE_CATEGORY',
        messenge: 'Succesfully delete category',
    },
    successUpdated: {
        messengeCode: 'UPDATE_REPORT_CATEGORY',
        messenge: 'Update report',
    },
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