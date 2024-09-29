import { useEffect, useState } from 'preact/hooks'
import VideoContainer from './components/VideoContainer';
import Video from './components/Video';
import Icons from './components/Icons';
import Overlay from './components/Overlay';
import { fade_in, fade_out } from './utils';
import $ from './modules/teriyaki/index';
import Dialog from './modules/dialog/index';
import { icon_close, icon_no_internet } from './icons';
import './app.css';
import logo from '/logo.svg';

export function App() {
    let app, timer;
    let [state, setState] = useState({ready:false});

    useEffect(async () => {
        window.$ = $;

        app = document.querySelector('#app');
        app.classList.add('muted');

        $.muted = 1;
        $.fullscreen = 0;

        if (document.fullscreenElement) {
          $.fullscreen = 1;
        }

        if ($.fullscreen == 1) {
          app.classList.add('is-fullscreen');
        } else {
          app.classList.remove('is-fullscreen');
        }

        let setup_youtube_iframe = () => {
          var tag = document.createElement('script');
          tag.src = "https://www.youtube.com/iframe_api";

          var firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);          

          window.onYouTubeIframeAPIReady = () => {
            window.player = new YT.Player('player', {
              height: '360',
              width: '640',
              videoId: 'M7nRqrBICHs',
              playerVars: {
                autoplay: 1,
                mute: 1,
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                fs: 0,
                iv_load_policy: 3,
                loop: 1,
                rel: 0
              }
            })
          }
        }

        if (typeof navigator.share == 'function') {
          app.classList.add('share-supported');
        }

        let icons = app.querySelector('[data-role="icons"]');

        let create_hide_icon_timer = () => {
          return setTimeout(() => {
            hide_icons();
          }, 5000)          
        }

        icons.addEventListener('mouseenter', evt => {
          clearTimeout(timer);
        })

        icons.addEventListener('mouseleave', evt => {
          timer = create_hide_icon_timer();
        })

        if ($.is_mobile()) {
          document.querySelector('html').classList.add('is-mobile');
        }

        function show_icons() {
          clearTimeout(timer);

          fade_in(icons, 400, () => {
              icons.classList.add('active');
              timer = create_hide_icon_timer();
          })
        }

        function hide_icons() {
          clearTimeout(timer);
          
          fade_out(icons, 400, () => {
            icons.classList.remove('active');
          })          
        }

        function wait(delay = 5000) {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve();
            }, delay)
          })
        }

        document.body.addEventListener('click', evt => {
            let el = evt.target;

            if (el.matches('a[data-cmd]')) {
                evt.preventDefault();

                let cmd = el.getAttribute('data-cmd');

                if (cmd == 'about') {
                  let dialog = new Dialog({id:'about-dialog', width:'300'});
                  let sb = new Array();

                  sb.push('<h1>Aquarium 1.0.24</h1>');
                  sb.push('<p class="description">A beautiful aquarium from</p>');
                  sb.push('<p class="link"><a href="https://youtu.be/M7nRqrBICHs" target="_blank">https://youtu.be/M7nRqrBICHs</a></p>');
                  sb.push('<p class="ending">made with ❤️ by 8columns</p>');
                  sb.push('<a href="#" data-cmd="close">' + icon_close + '</a>');
                  dialog.html(sb.join(''));
                  dialog.open();
                  hide_icons();
                } else if (cmd == 'exit') {
                  window.close();
                } else if (cmd == 'close') {
                  if ($.current_dialog) {
                    $.current_dialog.close();
                  }
                  hide_icons();
                } else if (cmd == 'toggle-mute') {
                  if ($.muted == 1) {
                    $.muted = 0;
                  } else {
                    $.muted = 1;
                  }

                  if ($.muted == 1) {
                    player.mute();
                    app.classList.add('muted');
                  } else {
                    player.unMute();
                    app.classList.remove('muted');
                  }

                  hide_icons();
                } else if (cmd == 'share') {
                  evt.preventDefault();

                  if (navigator.share) {
                    const share_data = {
                      title: 'Aquarium',
                      text: 'Beautiful and realistic aquarium',
                      url: 'https://aquarium.8columns.com'
                    }

                    try {
                      navigator.share(share_data);
                    } catch (err) {
                      console.log(err);
                    }

                    hide_icons();
                  }
                } else if (cmd == 'enter-fullscreen') {
                    let video_container = app.querySelector('.video-container');

                    if (video_container.requestFullscreen) {
                      video_container.requestFullscreen().then(() => {
                        $.fullscreen = 1;
                        app.classList.add('is-fullscreen');
                      })
                    } else if (video_container.webkitRequestFullscreen) {
                      video_container.webkitRequestFullscreen();
                    }
                } else if (cmd == 'exit-fullscreen') {
                  document.exitFullscreen();                  
                  $.fullscreen = 0;
                  app.classList.remove('is-fullscreen');
                }
            } else if (el.matches('.video-container')) {
                clearTimeout(timer);

                fade_in(icons, 400, () => {
                    icons.classList.add('active');

                    timer = setTimeout(() => {
                      fade_out(icons, 400, () => {
                        icons.classList.remove('active');
                      })  
                    }, 5000)
                })
            }
        })

        if (navigator.wakeLock) {
            let wakelock = null;
            wakelock = await navigator.wakeLock.request('screen');
            try {

            } catch (err) {
                console.log(err);
            }
        }

        let start_time = (new Date()).getTime();

        $.get_json('https://check-connection.8columns.com/check-connection.json', false, 3000).then(node => {
          if (node.status == 200) {
            let observer = new MutationObserver(mutations => {
              observer.disconnect();

              setTimeout(() => {
                let overlay = app.querySelector('[data-role="overlay"]'); 

                fade_out(overlay, 400, () => {
                  overlay.remove();
                })
              }, 4000)
            })

            observer.observe(app.querySelector('.video-container'), {
              childList: true
            })

            setup_youtube_iframe();
          }          
        }).catch(async error => {
            let elapsed = (new Date()).getTime() - start_time;
            let container = app.querySelector('.loading-message .container');

            if (elapsed < 4000) {
              await wait(4000 - elapsed);              
            }

            fade_out(container, 600, () => {
              let sb = new Array();

              sb.push(icon_no_internet);
              sb.push('<p>No internet connection</p>');
              sb.push('<p>Please try again later...</p>');
              sb.push('<p style="margin-top:20px"><a data-cmd="exit" style="color:var(--text-color);" href="#">Close</a></p>')
              container.innerHTML = sb.join('');
              fade_in(container, 600);
            })
        }) 
    }, [])

    return ( 
      <>
        <VideoContainer>
          <Video />
          <Icons />
        </VideoContainer>
        <Overlay>
          <div className="loading-message">
            <div class="container">
              <img width="120" height="120" src={logo} alt="logo" />
              <p>Viewing an aquarium reduces stress and has a calming effect on people</p>
            </div>
          </div>
        </Overlay>
      </>
    )
}