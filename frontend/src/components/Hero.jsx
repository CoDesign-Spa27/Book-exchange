import React from 'react'
import {Link} from 'react-router-dom'
const Hero = () => {
  return (
    <div>
      <section className="bg-gray-900 h-screen text-white">
  <div className="mx-auto w-full px-4 py-32 lg:flex lg:h-screen lg:items-center">
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-purple-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        Understand Book Exchange.

        <span className="sm:block"> Save Environment. </span>
      </h1>

      <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
      Unlock a world of stories—swap your favorite reads with fellow book lovers and discover new adventures on our Book Exchange platform.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to={"/books"}>
        <a
          className="block w-full rounded border border-purple-600 bg-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
       
          >
   Explore
        </a>
          </Link>
<Link to={"/me/addBook"}>
        <a
          className="block w-full rounded border border-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:ring hover:text-white active:bg-purple-500 sm:w-auto"
        
          >
          Add Book
        </a>
          </Link>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Hero
