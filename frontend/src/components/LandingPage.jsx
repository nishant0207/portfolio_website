// LandingPage.jsx
import React, { useEffect, useCallback, useRef } from 'react';
import './LandingPage.css';
import { TweenMax, Expo, Quint } from 'gsap';
import $ from 'jquery';

const LandingPage = () => {
  const scrollDirection = useRef(0.1);
  const addX = useRef(0);
  const isRotating = useRef(true); // To manage the rotation state

  const startRotation = useCallback(() => {
    isRotating.current = true;
  }, []);

  const stopRotation = useCallback(() => {
    isRotating.current = false;
  }, []);

  const animateIn = useCallback(($item, $block) => {
    let nrX = 360 * getRandomInt(2);
    let nrY = 360 * getRandomInt(2);
    let nx = -(2000) + getRandomInt(4000);
    let ny = -(2000) + getRandomInt(4000);
    let nz = -4000 + getRandomInt(4000);
    let s = 1.5 + (getRandomInt(10) * 0.1);
    let d = 1 - (getRandomInt(8) * 0.1);

    TweenMax.set($item, { autoAlpha: 1, delay: d });
    TweenMax.set($block, { z: nz, rotationY: nrY, rotationX: nrX, x: nx, y: ny, autoAlpha: 0 });
    TweenMax.to($block, s, { delay: d, rotationY: 0, rotationX: 0, z: 0, ease: Expo.easeInOut });
    TweenMax.to($block, s - 0.5, { delay: d, x: 0, y: 0, autoAlpha: 1, ease: Expo.easeInOut });
  }, []);

  const looper = useCallback(() => {
    if (isRotating.current) {
      addX.current += 0.1 + scrollDirection.current;
      TweenMax.to($('#carouselContainer'), 1, { rotationY: addX.current, ease: Quint.easeOut });
      scrollDirection.current *= 0.95;
    }
  }, []);

  const initCarousel = useCallback(() => {
    let container = $('#contentContainer');
    let carousel = $('#carouselContainer');
    let item = $('.carouselItem');
    let itemLength = $('.carouselItem').length;
    let rY = 360 / itemLength;
    let radius = Math.round((250) / Math.tan(Math.PI / itemLength));

    TweenMax.set(container, { perspective: 600 });
    TweenMax.set(carousel, { z: -radius });

    item.each(function (i) {
      let $item = $(this);
      let $block = $item.find('.carouselItemInner');
      TweenMax.set($item, { rotationY: rY * i, z: radius, transformOrigin: "50% 50% " + -radius + "px" });
      animateIn($item, $block);
    });

    setInterval(looper, 1000 / 60);
  }, [animateIn, looper]);

  const handleScroll = useCallback(
    (event) => {
      if (event.deltaY > 0) {
        scrollDirection.current = 0.2;
      } else {
        scrollDirection.current = -0.2;
      }
      startRotation(); // Trigger rotation on scroll
    },
    [startRotation]
  );

  useEffect(() => {
    initCarousel();
    window.addEventListener('scroll', handleScroll);
    $('#contentContainer').hover(stopRotation, startRotation); // Stop rotation on hover, resume when mouse leaves

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [initCarousel, handleScroll, startRotation, stopRotation]);

  const getRandomInt = (n) => Math.floor((Math.random() * n) + 1);

  return (
    <div className="landing-container">
      <div id="contentContainer" className="trans3d">
        <section id="carouselContainer" className="trans3d">
          <figure className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">"Believe you can and you're halfway there."</div>
          </figure>
          <figure className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">"Your limitation—it's only your imagination."</div>
          </figure>
          <figure className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">"Push yourself, because no one else is going to do it for you."</div>
          </figure>
          <figure className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">"Great things never come from comfort zones."</div>
          </figure>
          <figure className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">"Success doesn’t just find you. You have to go out and get it."</div>
          </figure>
          <figure className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">"Dream it. Wish it. Do it."</div>
          </figure>
          <figure className="carouselItem trans3d">
            <div className="carouselItemInner trans3d">"Stay positive, work hard, make it happen."</div>
          </figure>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;