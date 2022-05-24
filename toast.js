function createToastMessage(message) {
    let toastContainer = document.querySelector(".toast");
    let toastItem = document.createElement('div');
    toastItem.classList.add("toast__item");
    toastItem.innerHTML = 
        `<p class="toast__item__message">${message}</p>
        <i class="fa-solid fa-xmark toast__item__close"></i>`
    toastContainer.appendChild(toastItem);

    setTimeout(function (){
        toastContainer.removeChild(toastItem);
    }, 4000);
}