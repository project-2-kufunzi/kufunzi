const iconsLi = document.querySelectorAll('footer li')
const icons = document.querySelectorAll('footer svg')
console.log(icons)

iconsLi[0].onclick = () => {
  icons[0].style.backgroundColor = 'red'
}