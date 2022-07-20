class OrderCreationHelper {
    classes = ["bg-red-600 text-white", "bg-blue-500 text-white", "bg-indigo-500 text-white", 
               "bg-teal-500 text-white", "bg-pink-500 text-white"];
    
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    };

    getFirstLetterInUpperCase(param){
        let str = "";
        str += param; 
        return str.charAt(0).toUpperCase();
    };
}

module.exports = new OrderCreationHelper();