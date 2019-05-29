const menuButton = document.querySelector('#open-menu')
const menuDiv = document.querySelector('.menu')
const closeIcon = document.querySelector('#close')


console.log(menuDiv)
menuButton.onclick = () => {
  menuDiv.style.zIndex = 100
  menuDiv.style.opacity = 1
}
closeIcon.onclick = () => {
  menuDiv.style.zIndex = -10
  menuDiv.style.opacity = 0
}