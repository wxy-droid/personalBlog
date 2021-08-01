export default function(func, duration = 100){
    let time = null;
    return (...args) => {
        clearInterval(time);
        time = setTimeout(() => {
            func(...args);
        }, duration);
    }
}