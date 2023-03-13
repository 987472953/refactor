// 嵌套记录的封装-----------------------------
customerData = [
    {
        "1920": {
            name: "martin",
            id: "1920",
            usages: {
                "2016": {
                    "1": 50,
                    "2": 55
                    // remaining months of the year
                },
                "2015": {
                    "1": 70,
                    "2": 63
                    // remaining months of the year
                }
            }
        }
    }
]

// 数据更新
customerData[customerID].usages[year][month] = amount;

// 数据读取
function compareUsage(customerID, laterYear, month) {
    const later = customerData[customerID].usages[laterYear][month];
    const earlier = customerData[customerID].usages[laterYear - 1][month];
    return { laterAmount: later, change: later - earlier };
}
// ---------------------------------
// 1 封装变量
function getRawDataOfCustomers() { return customerData; }
function setRawDataOfCustomers(arg) { customerData = arg; }
// customerData[customerID].usages[year][month] = amount;
getRawDataOfCustomers()[customerID].usages[year][month] = amount;

function compareUsage(customerID, laterYear, month) {
//     const later = customerData[customerID].usages[laterYear][month];
    const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
//     const earlier = customerData[customerID].usages[laterYear - 1][month];
    const earlier = getRawDataOfCustomers()[customerID].usages[laterYear - 1][month];
    return { laterAmount: later, change: later - earlier };
}

// 2 创建封装对象
class CustomerData {
    constructor(data) {
        this._data = data;
    }
    setUsage(customerID, year, month, amount) {
        this._data[customerID].usages[year][month] = amount;
    }
}

function getCustomerData() { return customerData; }
// function getRawDataOfCustomers() { return customerData; }
function getRawDataOfCustomers() { return customerData._data; }
// function setRawDataOfCustomers(arg) { customerData = arg; }
function setRawDataOfCustomers(arg) { customerData = new CustomerData(arg); }
// getRawDataOfCustomers()[customerID].usages[year][month] = amount;
getCustomerData().setUsage(customerID, year, month, amount);

// 3 主要为返回一个深拷贝对象或不可变对象以阻止其他数据使用者修改对象
function getCustomerData() { return customerData; }
function getRawDataOfCustomers() { return customerData.rawData; }
function setRawDataOfCustomers(arg) { customerData = new CustomerData(arg); }