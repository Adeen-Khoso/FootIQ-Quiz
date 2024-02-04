// hamburger menu js

const navigation = document.getElementById('navigation');
const hamburger = document.getElementById('hamburger');
const mainContent = document.getElementById('main');

hamburger.addEventListener('click', function hamburgerClick(){
    navigation.classList.toggle('active')
    hamburger.classList.toggle('active')
    main.classList.toggle('dull')
})