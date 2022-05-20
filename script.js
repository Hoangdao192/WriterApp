let openSidebarButton = document.querySelector(".open-sidebar");
let sidebar = document.querySelector(".container__left");
openSidebarButton.addEventListener('click', function() {   
    sidebar.style.animation = "leftFlyIn 0.3s ease"; 
    sidebar.style.display = "flex";
})

let closeSideBarButton = document.querySelector(".close-sidebar");
closeSideBarButton.addEventListener('click', function(){
    sidebar.style.animation = "leftFlyOut 0.3s ease forwards";
})