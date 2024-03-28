
function customLogger(message) {
    const date = new Date();
    const dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    console.log(`[${dateString}] ${message}`);

}

module.exports = {customLogger};
//export { customLogger };