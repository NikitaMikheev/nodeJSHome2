// Проверяем что выведет. 
// 1. Промисы создаются не ассинхронно, поэтому выполнение последовательное
/* console.log('start');
const promise = new Promise((res, rej) => {
    console.log(1);
})
console.log('end'); */



// 2. Start, потом 1 (создается новый промис не ассинхронно), потом end, потом исполнение промиса и вывод результата 2, переданного со строки 15
/* console.log('start');
const promise1 = new Promise((res, rej) => {
    console.log(1);
    res(2);
})

promise1.then(res => {
    console.log(res);
})

console.log('end'); */

// 3. Все тоже самое, что и в задаче 2, тольпо перед end выведется еще "3", т.к. здесь не вызывается промис

/* console.log('start');

const promise2 = new Promise((res, rej) => {
    console.log(1);
    res(2);
    console.log(3);
})

promise2.then(res => {
    console.log(res);
})

console.log('end'); */

// 4. Выведет все последовательно, кроме "2", т.к. промис по сути не вызывается

/* console.log('start');

const promise3 = new Promise((res, rej) => {
    console.log(1);
})

promise3.then(res => {
    console.log(2);
})

console.log('end'); */

// 5. Сначала старт, потом миддл, т.к. функция создается, но не вызывается. 65 строка - вызов функции с отложенным выполнением. Создается промис и выводит 1
// после выводится end. В конце выполняется промис и выводит переданное success

/* console.log('start');

const fn = () => (new Promise((resolve, reject) => {
    console.log(1);
    resolve('success');
}))

console.log('middle');

fn().then(res => {
    console.log(res);
})

console.log('end'); */

// 6. Два промиса создаются и сразу вызываются, значит их исполнение будет после основного кода. Выведется start, потом end, потом последовательно 1 и 2 (но мы не можем гарантировать последовательный вывод промисов из-за особенностей ассинхронности)

/* console.log('start');

Promise.resolve(1).then((res) => {
    console.log(res);
})

Promise.resolve(2).then((res) => {
    console.log(res);
})

console.log('end'); */

// 7. setTimeout и промис уходят в очередь к api, а затем в event loop. Микротаски (промисы) имеют в очереди выше приоритет, чем макротаски (setTimeout), поэтому исполнятся раньше.
// Выведет: start, end, resolve, setTimeout

/* console.log('start');

setTimeout(() => {
    console.log('setTimeout');
});

Promise.resolve().then(() => {
    console.log('resolve');
})

console.log('end'); */

// 8. Понятно, что сначала выводится 1 и 4, но не совсем понятно почему дальше timerStart, timerEnd и success. Вроде у промисов приоритет выше, чем у
// setTimeout. Возможно дело в том, что setTimeout внутри промиса, и он в очередь раньше попал.

/* const promise = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        console.log('timerStart');
        resolve('success');
        console.log('timerEnd');
    }, 0)
})

promise.then((res) => {
    console.log(res);
});

console.log(4); */

// 9. Два setTimeout по идее будут выполняться последовательно, но мы не можем это гарантировать.

/* const timer1 = setTimeout(() => {
    console.log('timer1');
    const promise1 = Promise.resolve().then(() => {
        console.log('promise1');
    }, 0);
})

const timer2 = setTimeout(() => {
    console.log('timer2');
}, 0) */

// 10. Start, end - это понятно. Потом promise1, а timer2 улетает в очередь. Потом timer1 и promise2, в конце timer2

/* console.log('start');

const promise1 = Promise.resolve().then(() => {
        console.log('promise1');
        const timer2 = setTimeout(() => {
            console.log('timer2');
        }, 0);
    });

const timer1 = setTimeout(() => {
    console.log('timer1');
    const promise2 = Promise.resolve().then(() => {
        console.log('promise2');
    })
}, 0);

console.log('end'); */