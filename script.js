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
fetch('https://api.github.com/users/Pavel-SS').then(res => console.log(res))// Резуьтат: Response { type: "cors", url: "https://api.github.com/users/Pavel-SS", redirected: false, status: 403, ok: false, statusText: "Forbidden", headers: Headers, body: ReadableStream, bodyUsed: false }

// Для получения результата в формате JSON, необходимо применить либо библиотеку AXIOS вместо fetch, или 
fetch('https://api.github.com/users/Pavel-SS').then(res =>{
    return res.json();
}).then(res2 => console.log(res2)) 
// Результат: Object { message: "API rate limit exceeded for 151.249.163.234. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)", documentation_url: "https://docs.github.com/rest/overview/resources-in-the-rest-api#rate-limiting" }