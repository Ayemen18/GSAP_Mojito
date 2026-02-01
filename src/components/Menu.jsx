'use client'
import { useGSAP } from '@gsap/react'
import { sliderLists } from '../../constants'
import { useState } from 'react'
import { useRef } from 'react'
import { gsap } from 'gsap'

const Menu = () => {
    const contentRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        gsap.fromTo('#title', {opacity:0}, {opacity:1, duration:1})
        gsap.fromTo('.cocktail img', {opacity:0, xPercent:-100}, {opacity:1, xPercent:0, duration:1, ease: 'power1.inOut'})
        gsap.fromTo('.details h2', {opacity:0, yPercent:100}, {opacity:100, yPercent:0, duration:1, ease: 'power1.inOut',})
        gsap.fromTo('.details p', {opacity:0, yPercent:100}, {opacity:100, yPercent:0, duration:1, ease: 'power1.inOut',})
    }, [currentIndex]);

    

    const totalSlides = sliderLists.length;
    const goToSlide = (index) => {
        const newIndex = (index + totalSlides) % totalSlides;
        setCurrentIndex(newIndex);

    }

    const getCocktailAt = (indexOffset) => {
        return sliderLists[(currentIndex + indexOffset + totalSlides) % totalSlides];
    }
    const currentCocktail = getCocktailAt(0);
    const prevCocktail = getCocktailAt(-1);
    const nextCocktail = getCocktailAt(1);
  return (
    <section id='menu' aria-labelledby='menu-heading'>
        <img src="/images/slider-left-leaf.png" alt="left-leaf" id='m-left-leaf' className='left-leaf'/>
        <img src="/images/slider-right-leaf.png" alt="right-leaf" id='m-right-leaf' className='right-leaf'/>

        <h2 className="sr-only" id="menu-heading">
            Cocktail Menu
        </h2>
 
        <nav className="cocktail-tabs" aria-label='Cocktail Navigation'>
            {sliderLists.map((cocktail, index) =>{ 
                const isActive = index === currentIndex;

                return(
                    <button key={cocktail.id} className={`${isActive ? 'text-white border-white' : 'text-white/50 border-white/50'}`} onClick={() => goToSlide(index)}>
                        {cocktail.name}
                    </button>
                )
            })}
        </nav>
        <div className="content">
            <div className="arrows">
                <button className="text-left" onClick={() => goToSlide(currentIndex - 1)}>
                    <span>{prevCocktail.name}</span>
                    <img src="/images/right-arrow.png" alt="right-arrow" aria-hidden="true" />

                </button>

                <button className="text-left" onClick={() => goToSlide(currentIndex + 1)}>
                    <span>{nextCocktail.name}</span>
                    <img src="/images/left-arrow.png" alt="left-arrow" aria-hidden="true" />
                    
                </button>
            </div>

            <div className="cocktail">
                <img src={currentCocktail.image} alt={currentCocktail.name} className='object-contain' />
            </div>

            <div className="recipe">
                <div ref={contentRef} className='info'>
                    <p>Recipe for:</p>
                    <p id='title'>{currentCocktail.name}</p>

                </div>

                <div className='details'>
                    <h2>{currentCocktail.title}</h2>
                    <p>{currentCocktail.description}</p>
                </div>
            </div>
        </div>


    </section>
  )
}

export default Menu 