import { Navbar } from '../components/navbar.js';

let pagenav, pagenavToggle, main;
function init_Page(){
    // Add the navbar
    new Vue({
        el: "#app",
        components: {
            'navbar': Navbar
        }
    });
    
    // Used for parallax scroll effect of in-page navigation
    pagenav = document.querySelector('.pagenav');
    main = document.querySelector('main');

    //bootstrap modal for images
    $('.ss').on('click', function() {
        $('.imagepreview').attr('src', $(this).find('img').attr('src'));
        $('#imagemodal').modal('show');   
    });		

    // Slight parallax scroll effect for the in-page navigation
    window.onscroll = function() {
        let calc = (18 - (36 * window.pageYOffset / window.screen.height));
        if (calc > 5)
            pagenav.style.top = calc + 'rem';
        else
            pagenav.style.top = 5 + 'rem';
    }
}

export {init_Page};