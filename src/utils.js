export function fade_in(el, duration = 400, cb = null) {
    let keyframes = [
        {"opacity": '0'},
        {"opacity": '1'}
    ]

    let settings = {
        duration: duration,
        iterations: 1,
        fill: 'both',
        easing: 'linear'
    }

    let animation = el.animate(keyframes, settings);  

    if (typeof cb === 'function') {
        let finish_handler = () => {
            animation.removeEventListener('finish', finish_handler);
            cb();
        }

        animation.addEventListener('finish', finish_handler);
    }
}

export function fade_out(el, duration = 400, cb = null) {
    let keyframes = [
        {"opacity": '1'},
        {"opacity": '0'}
    ]

    let settings = {
        duration: duration,
        iterations: 1,
        fill: 'both',
        easing: 'linear'
    }

    let animation = el.animate(keyframes, settings);  

    if (typeof cb === 'function') {
        let finish_handler = () => {
            animation.removeEventListener('finish', finish_handler);
            cb();
        }

        animation.addEventListener('finish', finish_handler);
    }
}