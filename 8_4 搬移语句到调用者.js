// 搬移语句到调用者
/**
 * 当一个方法中嵌套调用多个方法时，可能会出现方法嵌套层数太深，代码难以理解和维护的问题。
 * 此时，可以将一些语句移到调用方法中，使代码更加简洁和可读。
 * 当一个方法过长，包含太多的语句和逻辑时，可以考虑将一些语句移到调用方法中，使被调用方法更加简洁和清晰。
 */
// 最简单的情况下， 原函数非常简单， 其调用者也只有寥寥一两个， 此时只需把要搬移的代码从函数里剪切出来并粘贴回调用端去即可， 必要的时候做些调整。 运行测试。 如果测试通过， 那就大功告成， 本手法可以到此为止。
// 若调用点不止一两个， 则需要先用 提炼函数 将你不想搬移的代码提炼成一个新函数， 函数名可以临时起一个， 只要后续容易搜索即可。
// 对原函数应用 内联函数 。
// 对提炼出来的函数应用 改变函数声明，令其与原函数使用同一个名字。
emitPhotoData(outStream, person.photo);
function emitPhotoData(outStream, photo) {
    outStream.write(`<p>title: ${photo.title}</p>\n`);
    outStream.write(`<p>location: ${photo.location}</p>\n`);
}
// 重构后
emitPhotoData(outStream, person.photo);
outStream.write(`<p>location: ${person.photo.location}</p>\n`);
function emitPhotoData(outStream, photo) {
    outStream.write(`<p>title: ${photo.title}</p>\n`);
}