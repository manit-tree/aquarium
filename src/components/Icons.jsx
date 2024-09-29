import { icon_close, icon_info, icon_unmute, icon_mute, icon_share, icon_fullscreen, icon_exit_fullscreen } from '../icons';

export default function Icons() {
    return (
        <div data-role="icons">
            <a href="#" data-cmd="about" dangerouslySetInnerHTML={{ __html:icon_info }}></a>
            <a href="#" data-icon="unmute" data-cmd="toggle-mute" dangerouslySetInnerHTML={{ __html:icon_unmute }}></a>
            <a href="#" data-icon="mute" data-cmd="toggle-mute" dangerouslySetInnerHTML={{ __html:icon_mute }}></a>
            <a href="#" data-cmd="enter-fullscreen" dangerouslySetInnerHTML={{ __html:icon_fullscreen }}></a>
            <a href="#" data-cmd="exit-fullscreen" dangerouslySetInnerHTML={{ __html:icon_exit_fullscreen }}></a>
            <a href="#" data-cmd="share" dangerouslySetInnerHTML={{ __html:icon_share }}></a>
            <a href="#" data-cmd="exit" dangerouslySetInnerHTML={{ __html:icon_close }}></a>
        </div>
    )
}