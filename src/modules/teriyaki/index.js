let $ = (selector) => {
    if ($.is_function(selector)) {
        if (document.readyState === 'complete') {
            cb();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                cb();
            })                
        }
    } else if ($.is_string(selector)) {
        if ($.is_html(selector)) {
            return $($.el(selector));
        } else {
            return new TeriyakiElement(document.querySelector(selector));
        }
    } else if ($.is_html_element(selector)) {
        return new TeriyakiElement(selector);
    } else if ($.is_document(selector)) {
        return new TeriyakitDocument(selector);
    } else if ($.is_window(selector)) {
        return new TeriyakiiWindow(selector);        
    }
}

$.all = (selector) => {
    return new TeriyakiElements(document.querySelectorAll(selector));
}

$.is_function = fnc => {
    return typeof fnc === 'function';
}

$.is_string = str => {
    return typeof str === 'string';
}

$.is_html = str => {
    return ((typeof str === 'string') && (str.includes('<')) && (str.includes('>')));
}

$.is_html_element = el => {
    return HTMLElement.prototype.isPrototypeOf(el);
}

$.is_teriyaki = el => {
    return (el instanceof Teriyaki);
}

$.is_document = el => {
    return (el instanceof Document);
}

$.is_window = el => {
    return (el === window);
}

$.is_mobile = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

$.el = (html) => {
    let div = document.createElement('div');        
    div.innerHTML = html.trim();

    if (div.childElementCount == 1) {
        return div.firstChild;      
    } else if (div.childElementCount > 1) {
        return new TeriyakiElement(div.childNodes);      
    }

    return null;
}

$.wrap = (el, wrapper) => {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
}

$.default = (x, y) => {
    if ((x === undefined) || (x === null) || (x === '')) {
        return y;
    }

    return x;
}

$.extend = (x, y) => {
    if ((typeof x === 'object') && (typeof y === 'object')) {
        return Object.assign(x, y);
    }

    return null;
}

$.create_event = (event_name, data = {}, bubbles = true) => {
    return new CustomEvent(event_name, {
            bubbles: bubbles,
            detail: data
    })
}

$.broadcast_receiver = (broadcast_channel, cb = null) => {
    const ch = new BroadcastChannel(broadcast_channel);

    if (typeof cb === 'function') {
        ch.onmessage = event => {
            cb(event.data);
        }
    }
}

$.broadcast = (broadcast_channel, data) => {
    const ch = new BroadcastChannel(broadcast_channel);
    ch.postMessage(data);
} 

$.pushState = (state = null, url) => {
    window.history.replaceState(state, null, '');
    window.history.pushState(null, null, url);        
} 

$.get_html = (url, cached = true) => new Promise((resolve, reject) => {
    let options = {};

    if (!cached) {
        options = {cache: "no-cache"}
    }

    fetch(url, options)
        .then(response => response.text())
        .then(text => resolve(text))
        .catch(err => reject(err));
})

$.get_text = (url, cached = true) => new Promise((resolve, reject) => {
    let options = {};

    if (!cached) {
        options = {cache: "no-cache"}
    }

    fetch(url, options)
        .then(response => response.text())
        .then(text => resolve(text))
        .catch(err => reject(err));
})

$.get_json = (url, cached = true, timeout = 5000) => new Promise((resolve, reject) => {
    let options = {
        signal: AbortSignal.timeout(timeout)
    }

    if (!cached) {
        options = {cache: "no-cache"}
    }

    fetch(url, options)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));
})

$.post = (url, data = null) => new Promise((resolve, reject) => {
    let options = {};

    if (!cached) {
        options = {cache: "no-cache"}
    }

    options.method = 'POST';
    options.body = data;

    fetch(url, options)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => reject(err));        
})

$.ready = (cb) => {
    if (document.readyState === 'complete') {
        cb();
    } else {
        let on_content_loaded = () => {
            setTimeout(() => {
                cb();
            }, 100)

            document.removeEventListener('DOMContentLoaded', on_content_loaded);
        }

        document.addEventListener('DOMContentLoaded', on_content_loaded);
    }
}

class Teriyaki {
    constructor(el) {
        this.el = el;
    }

    trigger(event) {
        this.el.dispatchEvent(event);
        return this;
    }

    on(event_name, event_handler) {
        if ($.is_function(event_handler)) {
            if (this.el) {
                this.el.addEventListener(event_name, event_handler);
            }           
        } 

        return this;
    }

    one(event_name, event_handler) {
        if ($.is_function(event_handler)) {
            if (this.el) {
                this.el.addEventListener(event_name, event_handler, {once: true});
            }           
        }   

        return this;
    }

    off(event_name, event_handler) {
        if ($.is_function(event_handler)) {
            if (this.el) {
                this.el.removeEventListener(event_name, event_handler);
            }           
        }   

        return this;
    }
}

class TeriyakiWindow extends Teriyaki {
}

class TeriyakiDocument extends Teriyaki {
    ready(cb) {
        if (document.readyState !== 'loading') {
            if ($.is_function(cb)) {
                cb();
            }
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                if ($.is_function(cb)) {
                    cb();
                }
            })
        }               

        return this;
    }
}

class TeriyakiElement extends Teriyaki {
    addClass(cls) {
        this.el.classList.add(cls);
        return this;
    }    

    removeClass(cls) {
        this.el.classList.remove(cls);
        return this;
    } 

    text(txt) {
        if (typeof txt == 'string') {
            this.el.innerText = txt;
            return this;
        } else {
            return this.el.innerText;
        }
    }

    html(txt) {
        if (typeof txt == 'string') {
            this.el.innerHTML = txt;
            return this;
        } else {
            return this.el.innerHTML;
        }
    }

    html_unsafe(html) {
        let _type = typeof html;

        if (_type === 'string') {
            this.el.innerHTML = html;
          
            Array.from(this.el.querySelectorAll("script"))
                .forEach(oldScriptEl => {
                    const newScriptEl = document.createElement("script");
                    Array.from(oldScriptEl.attributes).forEach( attr => {
                    newScriptEl.setAttribute(attr.name, attr.value) 
                })
              
                const scriptText = document.createTextNode(oldScriptEl.innerHTML);
                newScriptEl.appendChild(scriptText);  
                oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
            })

            return this;
        } else {
            return this.el.innerHTML;            
        }        
    }

    wrap(wrapper) {
        if ($.is_teriyaki(wrapper)) {
            $.wrap(this.el, wrapper.el);
        } else if ($.is_html_element(wrapper)) {
            $.wrap(this.el, wrapper);
        } else if ($.is_html(wrapper)) {
            let el_wrapper = $.el(wrapper);

            $.wrap(this.el, el_wrapper);
        }

        return this;
    }

    color(val) {
        this.el.style.setProperty('color', val);    
        return this;
    }

    show() {
        this.el.removeAttribute('hidden');
        return this;
    }

    hide() {
        this.el.setAttribute('hidden', '');
        return this;
    }

    attr(key, value) {
        if (key && typeof key == 'string') {
            if (value && typeof value == 'string') {
                this.el.setAttribute(key, value);
                return this;
            } else {
                return this.el.getAttribute(key);
            }
        }

        return null;
    } 

    data(key, value) {
        if (key && typeof key == 'string') {
            if (value && typeof value == 'string') {
                this.el.setAttribute('data-' + key, value);
                return this;
            } else {
                return this.el.getAttribute('data-' + key);
            }
        }

        return null;
    } 

    css(styles) {
        if (typeof styles == 'object' ) {
            Object.keys(styles).forEach(key => {
                this.el.style.setProperty(key, styles[key]);
            })
        }

        return this;
    }

    width() {
        return this.el.getBoundingClientRect().width;
    }

    height() {
        return this.el.getBoundingClientRect().height;
    }

    fadeIn(duration = 600, cb = null) {
        let keyframes = [
            {"opacity": 0},
            {"opacity": 1}
        ]

        let settings = {
            duration: duration,
            iterations: 1,
            fill: 'both'
        }

        let animation = this.el.animate(keyframes, settings);  

        if (typeof cb === 'function') {
            animation.addEventListener('finish', evt => {
                cb();
            })
        }

        return this;      
    }

    fadeOut(duration = 600, cb = null) {
        let keyframes = [
            {"opacity": 1},
            {"opacity": 0}
        ]

        let settings = {
            duration: duration,
            iterations: 1,
            fill: 'both'
        }

        let animation = this.el.animate(keyframes, settings);  

        if (typeof cb === 'function') {
            animation.addEventListener('finish', evt => {
                cb();
            })
        }

        return this;      
    }
}

class TeriyakiElements {
    constructor(nodeList) {
        this.elements = Array.from(nodeList);
    }

    addClass(cls) {
        this.elements.forEach(el => {
            el.classList.add(cls);
        })
    }    

    removeClass(cls) {
        this.elements.forEach(el => {
            el.classList.remove(cls);
        })
    }  

    text(txt) {
        if (typeof txt == 'string') {
            this.elements.forEach(el => {
                el.innerText = txt;
            })
        }
    }  

    html(txt) {
        if (typeof txt == 'string') {
            this.elements.forEach(el => {
                el.innerHTML = txt;
            })
        }
    }  

    html_unsafe(html) {
        let _type = typeof html;

        if (_type === 'string') {
            this.elements.forEach(el => {
                el.innerHTML = html;
              
                Array.from(el.querySelectorAll("script"))
                    .forEach(oldScriptEl => {
                        const newScriptEl = document.createElement("script");
                        Array.from(oldScriptEl.attributes).forEach( attr => {
                        newScriptEl.setAttribute(attr.name, attr.value) 
                    })
                  
                    const scriptText = document.createTextNode(oldScriptEl.innerHTML);
                    newScriptEl.appendChild(scriptText);  
                    oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
                })
            })

            return this;
        }        
    }

    wrap(wrapper) {
        if ($.is_teriyaki(wrapper)) {
            this.elements.forEach(el => {
                $.wrap(el, wrapper.el);
            })
        } else if ($.is_html_element(wrapper)) {
            this.elements.forEach(el => {
                $.wrap(el, wrapper);
            })
        } else if ($.is_html(wrapper)) {
            let el_wrapper = $.el(wrapper);

            this.elements.forEach(el => {
                $.wrap(el, el_wrapper);
            })                        
        }

        return this;
    }

    color(val) {
        this.elements.forEach(el => {
            el.style.setProperty('color', val);
        })
    }  

    show() {
        this.elements.forEach(el => {
            el.removeAttribute('hidden');
        })
    }

    hide() {
        this.elements.forEach(el => {
            el.setAttribute('hidden', '');
        })
    }

    attr(key, value) {
        if (key && typeof key == 'string') {
            if (value && typeof value == 'string') {
                this.elements.forEach(el => {
                    el.setAttribute(key, value);
                })
            }
        }
    }

    data(key, value) {
        if (key && typeof key == 'string') {
            if (value && typeof value == 'string') {
                this.elements.forEach(el => {
                    el.setAttribute('data-' + key, value);
                })
            }
        }

        return null;
    }

    css(styles) {
        if (typeof styles == 'object' ) {
            Object.keys(styles).forEach(key => {
                this.elements.forEach(el => {
                    el.style.setProperty(key, styles[key]);
                })
            })    
        }
    }

    fadeIn(duration = 600, cb = null) {
        let keyframes = [
            {"opacity": 0},
            {"opacity": 1}
        ]

        let settings = {
            duration: duration,
            iterations: 1,
            fill: 'both'
        }

        let animation_count = 0;

        this.elements.forEach(el => {
            let animation = el.animate(keyframes, settings); 
            animation_count++; 

            if (typeof cb === 'function') {
                animation.addEventListener('finish', evt => {
                    animation_count = animation_count - 1;

                    if (animation_count == 0) {
                        cb();
                    }
                })
            }            
        })

        return this;      
    }

    fadeOut(duration = 600, cb = null) {
        let keyframes = [
            {"opacity": 1},
            {"opacity": 0}
        ]

        let settings = {
            duration: duration,
            iterations: 1,
            fill: 'both'
        }

        let animation_count = 0;

        this.elements.forEach(el => {
            let animation = el.animate(keyframes, settings);  

            animation_count++;

            if (typeof cb === 'function') {
                animation.addEventListener('finish', evt => {
                    animation_count = animation_count - 1;

                    if (animation_count == 0) {
                        cb();
                    }
                })
            }            
        })

        return this;      
    }
}

export default $;