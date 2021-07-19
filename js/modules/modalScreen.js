function modalScreen () {
     // Todo модальное окно

     let openModalBtn = document.querySelectorAll('[data-modal]'),
     closeModalBtn = document.querySelector('[data-close]'),
     modal = document.querySelector('.modal');
 
 
     function openModal(){
     modal.style.display = 'block';
     document.body.style.overflow = 'hidden';
     // clearInterval(openModalAfterTime);
     }
 
     function closeModal(){
     modal.style.display = 'none';
     document.body.style.overflow = '';
     }
 
 
 
     openModalBtn.forEach(item => {
     item.addEventListener('click', openModal);
     });
 
     closeModalBtn.addEventListener('click', closeModal);
 
     modal.addEventListener('click', (e) => {
     if(e.target == modal){
         closeModal();
     }
     });
 
 
     // let openModalAfterTime = setTimeout(openModal, 10000);
 
     function openModalAfterScroll (){
         if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight){
             openModal();
             window.removeEventListener('scroll', openModalAfterScroll);
         }
     }
 
     window.addEventListener('scroll', openModalAfterScroll);
 
 
}

module.exports = modalScreen;