export const fancifyTime = function(time) {
    let t = new Date(time);
    t.setMinutes(t.getMinutes() - t.getTimezoneOffset())
    let tString = t.toISOString().slice(0, 16)
    tString = tString.replace("T", " ")
    return tString
}  