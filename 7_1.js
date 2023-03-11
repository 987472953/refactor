// 封装记录 / 以数据类取代记录
// 把方法的实现细节隐藏起来，通过方法名和参数来说明该方法做什么
// 把与业务逻辑无关的代码从方法内部剥离出来，便于维护和升级
// 利用设计模式（如工厂模式、单例模式等）来组织方法的实现，提高代码的复用性
organization = { name: "Acme Gooseberries", country: "GB" };
// 重构后
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    get name() { return this._name; }
    set name(arg) { this._name = arg; }
    get country() { return this._country; }
    set country(arg) { this._country = arg; }
}

// 1 封装organization
const organization = { name: "Acme Gooseberries", country: "GB" };

result += `<h1>${organization.name}</h1>`;
organization.name = newName;

function getRawDataOfOrganization() { return organization; }

result += `<h1>${getRawDataOfOrganization().name}</h1>`;
getRawDataOfOrganization().name = newName;

// 2
class Organization {
    constructor(data) {
        this._data = data;
    }
}

const organization = new Organization({ name: "Acme Gooseberries", country: "GB" });
function getRawDataOfOrganization() { return organization._data; }
function getOrganization() { return organization; }

// 3
class Organization {
    constructor(data) {
        this._data = data;
    }
    set name(aString) { this._data.name = aString; }
}
getOrganization().name = newName;

// 4
class Organization {
    constructor(data) {
        this._data = data;
    }
    set name(aString) { this._data.name = aString; }
    get name() { return this._data.name; }
}

result += `<h1>${getOrganization().name}</h1>`;

function getRawDataOfOrganization() { return organization._data; }
function getOrganization() { return organization; }

// 5
class Organization {
    constructor(data) {
        this._name = data.name;
        this._country = data.country;
    }
    get name() { return this._name; }
    set name(aString) { this._name = aString; }
    get country() { return this._country; }
    set country(aCountryCode) { this._country = aCountryCode; }
}



// -----------------------------
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

customerData[customerID].usages[year][month] = amount;

function compareUsage(customerID, laterYear, month) {
    const later = customerData[customerID].usages[laterYear][month];
    const earlier = customerData[customerID].usages[laterYear - 1][month];
    return { laterAmount: later, change: later - earlier };
}

function getRawDataOfCustomers() { return customerData; }
function setRawDataOfCustomers(arg) { customerData = arg; }

getRawDataOfCustomers()[customerID].usages[year][month] = amount;

function compareUsage(customerID, laterYear, month) {
    const later = getRawDataOfCustomers()[customerID].usages[laterYear][month];
    const earlier = getRawDataOfCustomers()[customerID].usages[laterYear - 1][month];
    return { laterAmount: later, change: later - earlier };
}

class CustomerData {
    constructor(data) {
        this._data = data;
    }
    setUsage(customerID, year, month, amount) {
        this._data[customerID].usages[year][month] = amount;
    }
}

function getCustomerData() { return customerData; }
function getRawDataOfCustomers() { return customerData._data; }
function setRawDataOfCustomers(arg) { customerData = new CustomerData(arg); }

getRawDataOfCustomers()[customerID].usages[year][month] = amount;

setUsage(customerID, year, month, amount);

function setUsage(customerID, year, month, amount) {
    getRawDataOfCustomers()[customerID].usages[year][month] = amount;
}

getCustomerData().setUsage(customerID, year, month, amount);



function getCustomerData() { return customerData; }
function getRawDataOfCustomers() { return customerData.rawData; }
function setRawDataOfCustomers(arg) { customerData = new CustomerData(arg); }