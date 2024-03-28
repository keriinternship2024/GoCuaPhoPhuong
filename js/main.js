let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    // refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};


//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    // clearTimeout(runNextAuto);
    // runNextAuto = setTimeout(() => {
    //     next.click();
    // }, timeAutoNext)
}


// Modal video
function handleModalVideo(){
    let videos = document.querySelectorAll('.nav__item-btn--play');
    let modalVideo = document.querySelector('.popupvideo');
    let iframeModalVideo = document.querySelector('.popupvideoo .popupvideo__inner .popupvideo__inner-iframe');
    let btnClose = document.querySelector('.popupvideo .popupvideo__inner .popupvideo__inner .popupvideo__inner-iframe .popupvideo__inner-close');

    videos.forEach(function (video) {
        video.addEventListener('click', function(){
            // show modal
            modalVideo.classList.add('active');
            // Get Data ID
            let dataID = video.getAttribute('data-video-src');
            // Set ID iframe
            iframeModalVideo.setAttribute('src', `https://www.youtube.com/embed/${dataID}?autoplay=1`);
        })
    });
    function closeModal(){
        // Hide modal
        modalVideo.classList.remove('active');
        // Empty Src Iframe
        iframeModalVideo.setAttribute('src', '');
    }
    btnClose.addEventListener('click', function(){
        closeModal();
    })
    modalVideo.addEventListener('click', function(){
        closeModal();
    });
}
handleModalVideo();