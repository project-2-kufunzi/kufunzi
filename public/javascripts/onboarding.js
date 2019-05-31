const sections = document.querySelectorAll('section.onboarding')

const footer = document.querySelectorAll('.footer')


const backward = document.querySelectorAll('.backward')



forward[0].onclick = () => {
  sections[0].style.opacity = 0;
  sections[0].style.zIndex = 0;
  sections[1].style.opacity = 1;
}

forward[1].onclick = () => {
  sections[1].style.opacity = 0;
  sections[1].style.zIndex = 0;
  sections[2].style.opacity = 1;
}

forward[2].onclick = () => {
  window.location = '/'
}



backward[1].onclick = () => {
  sections[1].style.opacity = 0;
  sections[0].style.opacity = 1;
  sections[0].style.zIndex = 30;
  console.log('clickkk')
}

backward[2].onclick = () => {
  sections[2].style.opacity = 0;
  sections[1].style.opacity = 1;
  sections[1].style.zIndex = 20;
  console.log('clickkk')
}