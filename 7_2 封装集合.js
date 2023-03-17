// 封装集合
/**
 * 封装集合是指在类的实现中，将集合类型的实例变量（属性）设置为私有访问修饰符，并提供公共的方法来访问和修改集合中的元素。
 * 在类上提供一些修改集合的方法——通常是“添加”和“移除”方法
 */
// 如果集合的引用尚未被封装起来， 先用 封装变量 封装它。
// 在类上添加用于“添加集合元素”和“移除集合元素”的函数。
// 执行静态检查。查找集合的引用点。 如果有调用者直接修改集合， 令该处调用使用新的添加
// 移除元素的函数。 每次修改后执行测试。
// 修改集合的取值函数， 使其返回一份只读的数据， 可以使用只读代理或数据副本。
// 测试
class Person {
    get courses() { return this._courses; }
    set courses(aList) { this._courses = aList; }
}
// 重构后
class Person {
    get courses() { return this._courses.slice(); }
    addCourse(aCourse) { 
        // ... 
    }
    removeCourse(aCourse) { 
        // ...
    }
}

// 人对象
class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }
    get name() { return this._name; }
    get courses() { return this._courses; }
    set courses(aList) { this._courses = aList; }
}

class Course {
    constructor(name, isAdvanced) {
        this._name = name;
        this._isAdvanced = isAdvanced;
    }
    get name() { return this._name; }
    get isAdvanced() { return this._isAdvanced; }
}
const aPerson = new Person("张三")
aPerson.courses([new Course("Java", false), new Course("Python", true)])
numAdvancedCourses = aPerson.courses.filter(c => c.isAdvanced).length;

const basicCourseNames = readBasicCourseNames(filename)

aPerson.courses = basicCourseNames.map(name => new Course(name, false));

for (const name of readBasicCourseNames(filename)) {
    // 直接更新list, 破坏了封装性
    aPerson.courses.push(new Course(name, false));
}


// 重构
class Person {
    constructor(name) {
        this._name = name;
        this._courses = [];
    }
    get name() { return this._name; }
    // get courses() { return this._courses; }
    get courses() { this._courses.slice() }
    // set courses(aList) { this._courses = aList; }
    set courses(aList) { this._courses = aList.slice(); }

    addCourse(aCourse) {
        this._courses.push(aCourse);
    }
    removeCourse(aCourse, fnIfAbsent = () => { throw new RangeError(); }) {
        const index = this._courses.indexOf(aCourse);
        if (index === -1) fnIfAbsent();
        else this._courses.splice(index, 1);
    }
}
