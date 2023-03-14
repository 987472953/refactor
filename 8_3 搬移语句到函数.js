// 搬移语句到函数
/**
 * 调用某个函数时， 总有一些相同的代码也需要每次执行
 * 某些语句与一个函数放在一起更像一个整体
 */
// 如果重复的代码段离调用目标函数的地方还有些距离， 则先用 移动语句 将这些语句挪动到紧邻目标函数的位置。
// 如果目标函数仅被唯一一个源函数调用， 那么只需将源函数中的重复代码段剪切并粘贴到目标函数中即可， 然后运行测试。 本做法的后续步骤至此可以忽略。
// 如果函数不止一个调用点， 那么先选择其中一个调用点应用提炼函数，将待搬移的语句与目标函数一起提炼成一个新函数。 给新函数取个临时的名字， 只要易于搜索即可。
// 调整函数的其他调用点， 令它们调用新提炼的函数。 每次调整之后运行测试。
// 完成所有引用点的替换后， 应用 内联函数 将目标函数内联到新函数里， 并移除原目标函数。
// 对新函数应用 函数改名， 将其改名为原目标函数的名字。
function renderPerson(outStream, person) {
    const result = [];
    result.push(`<p>${person.name}</p>`); result.push(renderPhoto(person.photo));
    result.push(`<p>title: ${person.photo.title}</p>`);
    result.push(emitPhotoData(person.photo));
    return result.join("\n");
}
function photoDiv(p) {
    return [
        "<div>",
        `<p>title: ${p.title}</p>`,
        emitPhotoData(p),
        "</div>",
    ].join("\n");
}
function emitPhotoData(aPhoto) {
    const result = [];
    result.push(`<p>location: ${aPhoto.location}</p>`);
    result.push(`<p>date: ${aPhoto.date.toDateString()}</p>`);
    return result.join("\n");
}
