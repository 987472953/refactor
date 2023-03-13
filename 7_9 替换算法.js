// 替换算法
/**
 * 将算法替换为一个较易修改的算法
 */
// 整理一下待替换的算法， 保证它已经被抽取到一个独立的函数中。
// 先只为这个函数准备测试， 以便固定它的行为。
// 准备好另一个（替换用） 算法。
// 执行静态检查。
// 运行测试， 比对新旧算法的运行结果。 如果测试通过， 那就大功告成； 否则，
// 在后续测试和调试过程中， 以旧算法为比较参照标准。
function foundPerson(people) {
    for (let i = 0; i < people.length; i++) {
        if (people[i] === "Don") {
            return "Don";
        }
        if (people[i] === "John") {
            return "John";
        }
        if (people[i] === "Kent") {
            return "Kent";
        }
    }
    return "";
}
// 重构后
function foundPerson(people) {
    const candidates = ["Don", "John", "Kent"];
    return people.find(p => candidates.includes(p)) || '';
}