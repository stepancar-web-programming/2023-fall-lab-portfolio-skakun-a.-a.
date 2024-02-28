const initSlider = () => {
  const initCarousel = (containerId, images) => {
    const container = document.getElementById(containerId)
    const imageList = container.querySelector('.image-list')

    images.forEach(imageSrc => {
      const image = document.createElement('img')
      image.src = imageSrc
      image.classList.add('image-item')
      imageList.appendChild(image)
    })

    const slideButtons = container.querySelectorAll('.slide-button')
    const sliderScrollbar = container.querySelector('.slider-scrollbar')
    const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb')
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth

    scrollbarThumb.addEventListener('mousedown', (e) => {
      const startX = e.clientX
      const thumbPosition = scrollbarThumb.offsetLeft
      const maxThumbPosition =
            sliderScrollbar.getBoundingClientRect().width -
            scrollbarThumb.offsetWidth

      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX
        const newThumbPosition = thumbPosition + deltaX
        const boundedPosition = Math.max(
          0,
          Math.min(maxThumbPosition, newThumbPosition)
        )
        const scrollPosition =
            (boundedPosition / maxThumbPosition) * maxScrollLeft

        scrollbarThumb.style.left = `${boundedPosition}px`
        imageList.scrollLeft = scrollPosition
      }

      const handleMouseUp = () => {
        console.log('mouseup-event')
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    })

    slideButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.id === 'prev-slide' ? -1 : 1
        const scrollAmount = imageList.clientWidth * direction
        imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      })
    })

    const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'flex'
      slideButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? 'none' : 'flex'
    }

    const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft
      const thumbPosition =
        (scrollPosition / maxScrollLeft) *
        (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth)
      scrollbarThumb.style.left = `${thumbPosition}px`
    }

    imageList.addEventListener('scroll', () => {
      updateScrollThumbPosition()
      handleSlideButtons()
    })
  }
  const slider1Images = ['res/1.jpg', 'res/2.jpg', 'res/3.jpg', 'res/4.jpg', 'res/5.jpg', 'res/1.jpg']
  initCarousel('slider1', slider1Images)

  const slider2Images = ['res/6.jpg', 'res/7.jpg', 'res/8.jpg', 'res/9.jpg', 'res/10.jpg', 'res/9.jpg']
  initCarousel('slider2', slider2Images)
}

function scrollToBottom () {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

let isListenerAdded = false

window.addEventListener('resize', () => {
  isListenerAdded = false
})
window.addEventListener('load', initSlider)
