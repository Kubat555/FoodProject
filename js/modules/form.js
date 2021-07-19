function form() {
     // TODO form

     const forms = document.querySelectorAll('form');
    
     forms.forEach(item => {
         sendData(item);
     });
 
     const postData = async (url, data) => {
         const res = await fetch(url, {
             method: "POST",
             headers: {
                 'Content-type': 'application/json' 
             },
             body: data
         });
 
         return await res.json();
     };
 
     function sendData(form){
         const massage = {
             loading: "Загрузка",
             success: "Успешно отправлено",
             fail: "Ошибка при отправке данных"
         };
 
         form.addEventListener("submit", (e) => {
             e.preventDefault();
 
             const formData = new FormData(form);
             
             const json = JSON.stringify(Object.fromEntries(formData.entries()));
 
             postData('http://localhost:3000/requests', json)
                 .then(data => {
                     console.log(massage.success);
                     form.reset();
                     console.log(data)
                 })
                 .catch(() => console.log(massage.fail));
         });
     }
 
}

module.exports = form;