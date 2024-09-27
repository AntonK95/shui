import { useState } from 'react';
import './floatingbtn.css';
import { useNavigate } from 'react-router-dom';

const FloatingBtn = () => {

    // State för att hålla koll på knappens position
    // Startposition
    const [ position, setPosition ] = useState({ top : 850, left : 400 });
    // State för att hålla koll om användaren drar knappen JUST NU
    const [ dragging, setDragging ] = useState(false);

    // Vart musen började när användaren börjar dra knappen
    const [ startPosition, setStartPosition ] = useState({ x : 0, y : 0 });
    // Timer för att skilja på klick och drag
    const [ timer, setTimer ] = useState(null);
    // Navigera mellan sidor i react
    const navigate = useNavigate();

    // Kolla om klick eller drag (timeout på 300ms)
    const handleMouseDown = (event) => {
        const newTimer = setTimeout(() => {
            setDragging(true);
            setStartPosition({
                x: event.clientX - position.left,
                y: event.clientY - position.top,
            });
        }, 300) // Fördröjning 300ms
        setTimer(newTimer);
    }; 
    // Hantera dragning av knappen när musen rör sig
    const handleMouseMove = (event) => {
        if(dragging) {
            setPosition({
                left: event.clientX - startPosition.x,
                top: event.clientY - startPosition.y,
            });
        }
    };

    // Hantera när musen släpper knappen, stanna dragning eller klick
    const handleMouseUp = (event) => {
        clearTimeout(timer);
        if(!dragging) {
            navigate('/AddNotePage');
        }
        setDragging(false); // Avsluta dragning
    };

    // Sluta dra om musen lämnar knappen
    const handleMouseLeave = () => {
        clearTimeout(timer); 
        setDragging(false);
    };


    return (
        <div className='floating-btn-func'
        style={{
            position: dragging ? 'absolute' : 'absolute',
            top: `${position.top}px`,
            left: `${position.left}px`,
            cursor: dragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={ handleMouseDown }
        onMouseMove={ handleMouseMove }
        onMouseUp={ handleMouseUp }
        onMouseLeave={ handleMouseLeave }
        >
            <button className='floating-btn'></button>
        </div>
    )

}

export default FloatingBtn;