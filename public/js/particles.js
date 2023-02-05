let type = localStorage.getItem('bgeffect');
if (type === 'blocks') {
    //remove the dnone class from the particles div
    document.getElementById('pjs').classList.remove('dnone');
    particlesJS('pjs', {
        particles: {
            number: {
                value: 125,
                density: {
                    enable: true,
                    value_area: 4249.041961293636,
                },
            },
            color: {
                value: '#170005',
            },
            shape: {
                type: 'edge',
                stroke: {
                    width: 0,
                    color: '#000000',
                },
                polygon: {
                    nb_sides: 5,
                },
                image: {
                    src: 'img/github.svg',
                    width: 500,
                    height: 500,
                },
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 72.15354273894853,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                },
            },
            line_linked: {
                enable: false,
                distance: 224.4776885211732,
                color: '#ffffff',
                opacity: 0.6894671861721748,
                width: 1.603412060865523,
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false,
                    mode: 'repulse',
                },
                onclick: {
                    enable: false,
                    mode: 'push',
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    });
} else if (type === 'multicolor') {
    //remove the dnone class from the particles div
    document.getElementById('pjs').classList.remove('dnone');
    particlesJS('pjs', {
        particles: {
            number: {
                value: 300,
                density: {
                    enable: true,
                    value_area: 900,
                },
            },
            color: {
                value: ['#FF5964', '#FFFFFF', '#38618C', '#35A7FF'],
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000',
                },
                polygon: {
                    nb_sides: 20,
                },
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 8,
                random: true,
                anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                },
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: false,
                    mode: 'grab',
                },
                onclick: {
                    enable: false,
                    mode: 'push',
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    });
} else if (type === 'space') {
    document.getElementById('pjs').classList.remove('dnone');
    particlesJS('pjs', {
        particles: {
            number: {
                value: 1000,
                density: {
                    enable: true,
                    value_area: 789.1476416322727,
                },
            },
            color: {
                value: '#ffffff',
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000',
                },
                polygon: {
                    nb_sides: 5,
                },
                image: {
                    src: 'img/github.svg',
                    width: 100,
                    height: 100,
                },
            },
            opacity: {
                value: 0.48927153781200905,
                random: false,
                anim: {
                    enable: true,
                    speed: 0.2,
                    opacity_min: 0,
                    sync: false,
                },
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 5,
                    size_min: 0,
                    sync: false,
                },
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 0.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'bubble',
                },
                onclick: {
                    enable: true,
                    mode: 'push',
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 400,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 83.91608391608392,
                    size: 1,
                    duration: 3,
                    opacity: 1,
                    speed: 5,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    });
} else if (type === 'terminal') {
    document.getElementById('pjs').classList.remove('dnone');
    particlesJS('pjs', {
        particles: {
            number: { value: 147, density: { enable: true, value_area: 800 } },
            color: { value: '#00ff00' },
            shape: {
                type: 'edge',
                stroke: { width: 0, color: '#000000' },
                polygon: { nb_sides: 5 },
                image: {
                    src: 'https://www.freepnglogos.com/uploads/1-number-png/1-number-classic-font-style-13.png',
                    width: 100,
                    height: 100,
                },
            },
            opacity: {
                value: 0.8818766334760375,
                random: true,
                anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 3.945738208161363,
                random: false,
                anim: {
                    enable: false,
                    speed: 11.988011988011989,
                    size_min: 0.1,
                    sync: false,
                },
            },
            line_linked: {
                enable: false,
                distance: 150,
                color: '#ffffff',
                opacity: 0.4,
                width: 1,
            },
            move: {
                enable: true,
                speed: 11.048066982851818,
                direction: 'bottom',
                random: true,
                straight: true,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 1262.6362266116362,
                    rotateY: 1341.5509907748635,
                },
            },
        },
        interactivity: {
            detect_on: 'window',
            events: {
                onhover: { enable: false, mode: 'grab' },
                onclick: { enable: false, mode: 'repulse' },
                resize: true,
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 1 } },
                bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                },
                repulse: { distance: 200, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
            },
        },
        retina_detect: true,
    });
} else if (type === 'triangles-and-circles') {
    document.getElementById('pjs').classList.remove('dnone');
    particlesJS('pjs', {
        particles: {
            number: {
                value: 275,
                density: {
                    enable: true,
                    value_area: 2000,
                },
            },
            color: {
                value: '#ffffff',
                opacity: 0.5,
            },
            shape: {
                type: ['circle', 'triangle', 'circle'],
                stroke: {
                    width: 5,
                    color: '#fff',
                },
                polygon: {
                    nb_sides: 5,
                },
                image: {
                    src: 'img/github.svg',
                    width: 10,
                    height: 10,
                },
            },
            opacity: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: true,
                },
            },
            size: {
                value: 12,
                random: true,
                anim: {
                    enable: false,
                    speed: 45,
                    size_min: 0.1,
                    sync: false,
                },
            },
            line_linked: {
                enable: false,
                distance: 200,
                color: '#ffffff',
                opacity: 0.7,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.2,
                direction: 'top-bottom-right',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 1200,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detect_on: 'canvas',
            enable: false,
            events: {
                onhover: {
                    enable: false,
                    mode: 'grab',
                },
                onclick: {
                    enable: false,
                    mode: 'push',
                },
                resize: true,
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1,
                    },
                },
                bubble: {
                    distance: 400,
                    size: 1,
                    duration: 2,
                    opacity: 1,
                    speed: 3,
                },
                repulse: {
                    distance: 100,
                    duration: 0.4,
                },
                push: {
                    particles_nb: 4,
                },
                remove: {
                    particles_nb: 2,
                },
            },
        },
        retina_detect: true,
    });
}
