// Для начало  поговорим про promise

// Существует несколько браузерных  API которые возвращают promise
// На пример метод fetch.

// Метод fetch используется для получения данных из внешних источников.

const myGitHub = fetch('https://api.github.com/users/Pavel-SS')
// В консоли мы получим не сами данные а promise (т.е. обещание того, что когда сервер получит наш запрос, 
// на основании полученных данных сходит в базу данных, где возьмёт данные о моем аккаунте, и только после этого возвратит эти данные. 
// Нужно понимать, что это все произойдёт не моментально)
console.log(myGitHub) // Результат: Promise { <state>: "pending" }

// Для получения самих данных необходимо применить функцию then
// 1 вариант записи 
const myGitHubWithThen = fetch('https://api.github.com/users/Pavel-SS')
myGitHubWithThen.then(res => console.log(res)) // Резуьтат: Response { type: "cors", url: "https://api.github.com/users/Pavel-SS", redirected: false, status: 403, ok: false, statusText: "Forbidden", headers: Headers, body: ReadableStream, bodyUsed: false }
// 2 вариант записи
fetch('https://api.github.com/users/Pavel-SS').then(res => console.log(res)) // Резуьтат: Response { type: "cors", url: "https://api.github.com/users/Pavel-SS", redirected: false, status: 403, ok: false, statusText: "Forbidden", headers: Headers, body: ReadableStream, bodyUsed: false }

// Для получения результата в формате JSON, необходимо применить либо библиотеку AXIOS вместо fetch, или :
fetch('https://api.github.com/users/Pavel-SS').then(res => {
    return res.json();
}).then(res2 => console.log(res2))
// Результат: Object { message: "API rate limit exceeded for 151.249.163.234. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)", documentation_url: "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting" }


// Рассмотрим вариант когда мы ввели неверный адрес
// Например: вместо https://api.github.com/users/Pavel-SS ввели github.com/users/Pavel-SS
fetch('github.com/users/Pavel-SS').then(res => {
    return res.json();
}).then(res2 => console.log(res2)) // Результат: Uncaught (in promise) SyntaxError: JSON.parse: unexpected character

//Для того чтобы обработать данную ошибку используется метод catch(отлавливает ошибку)
fetch('github.com/users/Pavel-SS').then(res => {
    return res.json();
}).then(res2 => console.log(res2)).catch((err) => console.log('Error!!! -->', err)) // Результат: Error!!! --> SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON


//метод getUserMedia (применим для получения видео с вебки)

const video = document.querySelector('video'); // обратились к тегу <video>
// Далее, используя объект navigator, получаем доступ к камере PC (через mediaDevices.getUserMedia, кроме этого существуют и другие свойства и методы, для примера geolocation)
const videoMyCamera = navigator.mediaDevices.getUserMedia({
        video: true
    })
    .then(mediaStream => video.srcObject = mediaStream)
    .catch(err => console.log('Video Error -->', err)); // через then получаем доступ, если камера будет недоступна через  catch отдлавливаем ошибку
console.log(videoMyCamera);


// Свой promise
// Создадим функцию, в которую поместим конструктор promise (new Promise)  внуторь которого будет помещена функция с двумя параметрами, 
// resolve (запускается, когда все прошло нормально) и reject (запускается, если есть ошибка)
function timeWork(time) {
    return new Promise((resolve, reject) => {
        if (time < 25000) {
            reject('Чувак не работал вообще')
        }
        setTimeout(() => resolve(`Работал ${Math.floor(time/ 3600)} мин`), time / 60) // устанавливаем интервал запуска функции, и вывода результата 
    })
}

timeWork(72000).then(res => {
    console.log(res)
    return timeWork(50000)
}).then(res => {
    console.log(res)
    return timeWork(40000)
}).then(res => {
    console.log(res)
    return timeWork(30000)
}).then(res => {
    console.log(res)
    return timeWork(20000)
}).then(res => {
    console.log(res)
}).catch(err => console.log('Ошибка:', err)) // опять  с помощью  then получаем данные (каждый раз новые),  если условие о времени работы не будет выполняться с помощью  catch отлавливаем эту ошибку и выводим сообщение.


//  Прменение async/await
//  Создаем функцию, с помощью async говорим, что она является асинхронной, 
//  за тем создаем переменную response в которую ссылку и с помощью метода fetch получаем данные,
//  но чтобы поставить запрос на паузу, пока не придут данные используем await.
//  Т.к. мы переводим данные в формат JSON, то нам необходимо поставить и эту операцию в режим ожидания, 
//  пока не будет выполнена операция записанная в переменную response (если так не сделать то получим: Promise { <state>: "pending" })
//  Для того, чтобы мы могли оттловить ошибку в запросе, необходимо использовать конструкцию  try/catch

// Если коротко о async/await, то мы помечаем функцию как асинхронную (с помощью async),
// и внутри этой функции каждый асинхронный запрос мы ставим на паузу с помощью await, пока не придут данные. После того как эти данные пришли, они записываются в переменную 
// Преимущество async/await в том, что он позволяет писать асинхронный код, так будто мы пишем синхронный код
const getGit = async () => {
    try {
        const response = await fetch('https://api.github.com/users/Pavel-SS');
        const responseJSON = await response.json();
        console.log(responseJSON)
    } catch (err) {
        console.log('Ошибка с доступом!!! -->', err)
    }
}

getGit() //Object { message: "API rate limit exceeded for 151.249.163.234. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)", documentation_url: "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting" }

// Перепишем video запрос на async/await

const getVideo = async () => {
    try{
        const responseVideo = await navigator.mediaDevices.getUserMedia({ video: true});
        video.srcObject = responseVideo
    }catch(err){
        console.log('Доступа к камере нет! -->', err)
    } 
}
getVideo();

// для  workTimes
const workTimes = async () => {
    try {
        const work1 = await timeWork(70000);
        console.log(work1);
        const work2 = await timeWork(50000);
        console.log(work2);
        const work3 = await timeWork(60000);
        console.log(work3);
        const work4 = await timeWork(6000);
        console.log(work4);
    } catch (err) {
        console.log('Ошибка:', err)
    }
}
workTimes()