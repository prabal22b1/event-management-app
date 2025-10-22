// LandingPage.jsx
const LandingPage = () => {
  

  const handleClick = (e) => {
    e.preventDefault()
    // redirect to login page when clicked
    window.location.href = '/login'
  }

  // container tailwind styles to cover full screen with image background and button at bottom right
  const containerStyle = "relative w-full h-screen overflow-hidden"

  // image styles to cover full container
  const imageStyle = "absolute top-0 left-0 w-full h-full object-cover"

  // button styles to position at bottom right with hover effects
  const buttonStyle = "absolute bottom-[25%] right-[30%] z-20 px-5 py-3 border-none rounded-3xl bg-orange-700 cursor-pointer text-black font-semibold text-sm hover:bg-black hover:text-white transition"

  return (
    <div className={containerStyle}>
      <img
        src="landing-image.png"
        alt="Landing"
        className={imageStyle}
      />
      <button className={buttonStyle} onClick={handleClick} aria-label="Browse upcoming events">
        Browse upcoming events
      </button>
    </div>
  )
}

export default LandingPage