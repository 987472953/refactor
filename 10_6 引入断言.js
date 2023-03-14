// 引入断言
/**
 * 如果它失败， 表示程序员犯了错误。断言的失败不应该被系统任何地方捕捉
 * 整个程序的行为在有没有断言出现的时候都应该完全一样
 */
// 如果你发现代码假设某个条件始终为真， 就加入一个断言明确说明这种情况
function oldFun() {
    if (this.discountRate)
        base = base - (this.discountRate * base);
}
// 重构后
function newFun() {
    assert(this.discountRate >= 0);
    if (this.discountRate)
        base = base - (this.discountRate * base);
}

