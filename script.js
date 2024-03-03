const initSlider = () => {
  const initCarousel = (containerId, images) => {
    const container = document.getElementById(containerId)
    let imageList = container.querySelector('.image-list')
    let maxScrollLeft

    const destroyCarousel = () => {
      imageList.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateSlider)
      imageList = null
      maxScrollLeft = null
    }

    const updateMaxScrollLeft = () => {
      maxScrollLeft = imageList.scrollWidth - imageList.clientWidth
    }

    const updateSlider = () => {
      updateMaxScrollLeft()
      updateScrollThumbPosition()
      handleSlideButtons()
    }

    const handleScroll = () => {
      updateScrollThumbPosition()
      handleSlideButtons()
    }

    const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft
      const thumbPosition =
        (scrollPosition / maxScrollLeft) *
        (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth)
      scrollbarThumb.style.left = `${thumbPosition}px`
    }

    const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? 'none' : 'flex'
      slideButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? 'none' : 'flex'
    }

    window.addEventListener('resize', updateSlider)

    images.forEach(imageSrc => {
      const image = document.createElement('img')
      image.src = imageSrc
      image.classList.add('image-item')
      imageList.appendChild(image)
    })

    const slideButtons = container.querySelectorAll('.slide-button')
    const sliderScrollbar = container.querySelector('.slider-scrollbar')
    const scrollbarThumb = sliderScrollbar.querySelector('.scrollbar-thumb')

    updateSlider()

    slideButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const direction = button.id === 'prev-slide' ? -1 : 1
        const scrollAmount = imageList.clientWidth * direction
        imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      })
    })

    scrollbarThumb.addEventListener('mousedown', (e) => {
      const startX = e.clientX
      const thumbPosition = scrollbarThumb.offsetLeft
      const maxThumbPosition = sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth

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
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    })

    imageList.addEventListener('scroll', handleScroll)

    return destroyCarousel
  }

  const slider1Images = ['res/1.jpg', 'res/2.jpg', 'res/3.jpg', 'res/4.jpg', 'res/5.jpg', 'res/1.jpg']
  const destroySlider1 = initCarousel('slider1', slider1Images)

  const slider2Images = ['res/6.jpg', 'res/7.jpg', 'res/8.jpg', 'res/9.jpg', 'res/10.jpg', 'res/9.jpg']
  const destroySlider2 = initCarousel('slider2', slider2Images)
}

function scrollToBottom () {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

window.addEventListener('load', initSlider)
