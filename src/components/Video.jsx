import { useEffect, useRef } from 'react';
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/context/AuthContext";
import { parse } from 'url';
import Draggable from "react-draggable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Video(props) {
  const meetContainerRef = useRef(null);
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  const currentPath = router.asPath;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://meet.jit.si/external_api.js';
    script.async = true;
    script.onload = handleScriptLoad;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleScriptLoad = () => {
    const domain = 'meet.jit.si';
    const currentURL = parse(window.location.href);
    const roomName = currentURL.pathname.substring(1); // Rimuove la barra iniziale dal percorso
    const options = {
      roomName,
      width: 400,
      height: 500,
      parentNode: meetContainerRef.current,
    };
    const api = new JitsiMeetExternalAPI(domain, options);
  };

  const getRoomNameFromURL = () => {
    const { pathname } = url.parse(router.asPath);
    // Rimuovi la barra iniziale dalla pathname
    const roomName = pathname.substr(1);
    return roomName;
  };

  return (
    <Draggable>
    <div className="videochat_container ">
    <FontAwesomeIcon
            className="close"
            icon={faCircleXmark}
            size="2x"
            onClick={props.onClose}
          />
      <div ref={meetContainerRef} id="meet" />
    </div>
    </Draggable>
  );
}
