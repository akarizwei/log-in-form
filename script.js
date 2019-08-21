
let messageError = document.querySelector('.error-field'),
    userPic = document.querySelector('.userPic'),
    userName = document.querySelector('.userName'),
    userInfo = document.querySelector('.userInfo'),
    inputFields = document.querySelectorAll('.input-field'),
    authForm = document.querySelector('.myForm');

initFormSubmit(authForm, "https://us-central1-mercdev-academy.cloudfunctions.net/login", );

function initFormSubmit(form, url) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let dataToObj = {};
        for (let [key, value] of formData) {
            dataToObj[key] = value;
        }

        let request = fetch(url, {
            body: JSON.stringify(dataToObj),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        });


        request
            .then((result) => {
                if (result.status >= 200 && result.status < 300) {
                    return result;
                } else if (result.status >= 400 && result.status < 405) {
                    console.log(result);
                    messageError.classList.remove('hidden');
                    inputFields.forEach(element =>{
                        element.classList.add('error');
                    })
                }

                throw new Error(result.statusText);
            })

            .then((result) => result.json())

            .then((data) => {
                userName.innerHTML = data.name;
                userPic.src = data.photoUrl;
                userInfo.classList.remove('hidden');
                authForm.classList.add('hidden');
            });
    });
}

document.querySelector('.log-out').addEventListener('click', () => {
    if (authForm.classList.contains('hidden')){
        userInfo.classList.add('hidden');
        messageError.classList.add('hidden');
        authForm.classList.remove('hidden');
        authForm.reset();
        inputFields.forEach(element =>{
            element.classList.remove('error');
        })
    }
});