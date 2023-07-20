// Inspired By
// https://codepen.io/abeatrize/pen/LJqYey
// Bongo Cat originally created by @StrayRogue and @DitzyFlama
$( document ).ready(function() {
    //=========================
    // Controlls the cat
    //=========================
    const pawDuration = 220;
    const typeDuration = 150;
    const noteDuration = 2000;
    const noteDelay = 500;
    //=========================

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

    anime.set(music.note, {
        scale: 0,
        opacity: 1,
    });

    const pawFrames = (v1, v2, i1, i2) => {
        anime.set([i1, i2], {
            opacity: 0,
        })

        anime.set([v1, v2], {
            opacity: 1,
        })

        anime({
            targets: [v1, v2, i1, i2],
            duration: pawDuration,
            complete: () => pawFrames(i1, i2, v1, v2),
        })
    }

    pawFrames(cat.pawLeft.up, cat.pawRight.down, cat.pawLeft.down, cat.pawRight.up);
   
    anime({
        targets: ".terminal-code line",
        strokeDashoffset: [anime.setDashoffset, 0],
        opacity: [0.5, 1],
        duration: typeDuration,
        delay: anime.stagger(typeDuration),
        endDelay: 100,
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

    const animateNotes = (elements) => ({
        targets: elements,
        opacity: [1, 0],
        scale: [0, 1],
        easing: 'linear',
        stroke: () => noteColors[Math.floor(Math.random() * noteColors.length)],
        translateX: [() => anime.random(-25, 25), dir(anime.random(40, 60))],
        translateY: [0, anime.random(-200, -220)],
        rotate: [() => anime.random(-50, 50), dir(anime.random(20, 30))],
        delay: anime.stagger(noteDelay),
        duration: noteDuration,
        loop: false,
        complete: () => {
            anime(animateNotes(elements))
        }
    })

    anime.timeline().add(animateNotes(notesG1))
        .add(animateNotes(notesG2), "-=250")
        .add(animateNotes(notesG3), "-=500");
});