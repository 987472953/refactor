// 移除死代码
/**
 * 一旦代码不再被使用， 我们就该立马删除它
 * 可以在代码里留一段注释， 提一下这段代码的存在
 */
// 如果死代码可以从外部直接引用， 比如它是一个独立的函数时， 先查找一下还有无调用点。
// 将死代码移除。
// 测试。