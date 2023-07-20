$( document ).ready(function() {
    // Inspired By
    // https://codepen.io/abeatrize/pen/LJqYey

    // Bongo Cat originally created by @StrayRogue and @DitzyFlama

    const ID = "bongo-cat";
    const s = (selector) => `#${ID} ${selector}`;
    const notes = document.querySelectorAll(".note");

    for (let note of notes) {
        note?.parentElement?.appendChild(note.cloneNode(true));
        note?.parentElement?.appendChild(note.cloneNode(true));
    }

    const music = { note: s(".music .note") };
    const cat = {
        pawRight: {
            up: s(".paw-right .up"),
            down: s(".paw-right .down"),
        },
        pawLeft: {
            up: s(".paw-left .up"),
            down: s(".paw-left .down"),
        },
    };

    const style = getComputedStyle(document.documentElement);

    const green = style.getPropertyValue("--green");
    const pink = style.getPropertyValue("--pink");
    const blue = style.getPropertyValue("--blue");
    const orange = style.getPropertyValue("--orange");
    const cyan = style.getPropertyValue("--cyan");

    // gsap.set(music.note, { scale: 0, autoAlpha: 1 });
    anime.set(music.note, {
        scale: 1,
        opacity: 1,
    });

    // const animatePawState = (selector) =>
    // gsap.fromTo(
    //     selector,
    //     { autoAlpha: 0 },
    //     {
    //     autoAlpha: 1,
    //     duration: 0.01,
    //     repeatDelay: 0.19,
    //     yoyo: true,
    //     repeat: -1,
    //     }
    // );

    // const tl = gsap.timeline();

    // tl.add(animatePawState(cat.pawLeft.up), "start")
    // .add(animatePawState(cat.pawRight.down), "start")
    // .add(animatePawState(cat.pawLeft.down), "start+=0.19")
    // .add(animatePawState(cat.pawRight.up), "start+=0.19")
    // .timeScale(1.6);
    const tl = anime.timeline({
        direction: 'alternate',
        easing: 'linear',
        duration: 0.000001,
        loop: true,
    });

    tl
        .add({
            targets: [cat.pawLeft.down, cat.pawRight.up],
            opacity: [0, 1],
        })
        .add({
            targets: [cat.pawLeft.up, cat.pawRight.down],
            opacity: [1, 0],
        })

    // gsap.from(".terminal-code line", {
    //     autoAlpha: 0.1,
    //     duration: 0.1,
    //     stagger: 0.1,
    //     ease: "none",
    //     repeat: -1,
    // });


    anime({
        targets: ".terminal-code line",
        strokeDashoffset: [anime.setDashoffset, 0],
        duration: 200,
        delay: function(el, i) { return i * 200 },
        endDelay: 75,
        easing: 'easeInOutSine',
        loop: true,
    })

    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }
    const noteElements = shuffle(Array.from(document.querySelectorAll(music.note)));

    const numNotes = noteElements.length / 3;
    const notesG1 = noteElements.splice(0, numNotes);
    const notesG2 = noteElements.splice(0, numNotes);
    const notesG3 = noteElements;
    
    const noteColors = [green, pink, blue, orange, cyan, "#a3a4ec", "#67b5c0", "#fd7c6e"];
    const dir = (amt) => Math.random() > 0.5 ? `-=${amt}` : `+=${amt}`;

    // typing for pipe function doesn't seem to be working for usage when partially applied?
    // const noteElFn = gsap.utils.pipe(gsap.utils.toArray, gsap.utils.shuffle);
    // const noteEls = noteElFn(music.note);

    // const numNotes = noteEls.length / 3;
    // const notesG1 = noteEls.splice(0, numNotes);
    // const notesG2 = noteEls.splice(0, numNotes);
    // const notesG3 = noteEls;

    // const colorizer = gsap.utils.random([green, pink, blue, orange, cyan, "#a3a4ec", "#67b5c0", "#fd7c6e"], true);
    // const rotator = gsap.utils.random(-50, 50, 1, true);
    // const dir = (amt) => `${gsap.utils.random(["-", "+"])}=${amt}`;

    const animateNotes = (elements) => {
        // anime.set({
        //     targets: elements,
        //     scale: 0,
        //     stroke: colorizer(),
        //     rotate: () => anime.random(-50, 50),
        //     translateX: () => anime.random(-250, 250),
        // });

        return anime({
            targets: elements,
            opacity: [1, 0],
            scale: [0, 1],
            easing: 'linear',
            stroke: () => noteColors[Math.floor(Math.random() * noteColors.length)],
            translateX: [() => anime.random(-25, 25), dir(anime.random(40, 60))],
            translateY: [0, anime.random(-200, -220)],
            rotate: [() => anime.random(-50, 50), dir(anime.random(20, 30))],
            delay: anime.stagger(500),
            duration: 2000,
            loop: true,
            // complete: function(anim) {
            //     animateNotes(elements);
            // }
        });
    }

    // const animateNotes = (els) => {
    // els.forEach((el) => {
    //     gsap.set(el, {
    //     stroke: colorizer(),
    //     rotation: rotator(),
    //     x: gsap.utils.random(-25, 25, 1),
    //     });
    // });

    // return gsap.fromTo(
    //     els,
    //     {
    //      autoAlpha: 1,
    //      y: 0,
    //      scale: 0,
    //     },
    //     {
    //      duration: 2,
    //      autoAlpha: 0,
    //      scale: 1,
    //      ease: "none",
    //      stagger: {
    //         from: "random",
    //         each: 0.5,
    //      },
    //      rotation: dir(gsap.utils.random(20, 30, 1)),
    //      x: dir(gsap.utils.random(40, 60, 1)),
    //      y: gsap.utils.random(-200, -220, 1),
    //      onComplete: () => animateNotes(els),
    //     }
    //  );
    // };

    // tl.add(animateNotes(notesG1)).add(animateNotes(notesG2), ">0.05").add(animateNotes(notesG3), ">0.25");
    anime.timeline().add(animateNotes(notesG1)).add(animateNotes(notesG2), "+=50").add(animateNotes(notesG3), "+=250")
});