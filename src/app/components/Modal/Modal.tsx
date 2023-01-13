import { useEffect } from 'react'
import './modal.scss'

interface IModalProps {
    children: any
    show: boolean
    onClose: () => void
}

const Modal = ({ children, show, onClose }: IModalProps) => {

    useEffect(()=>{
        document.addEventListener('keydown', e=>{
            if(e.key == 'Escape' || e.keyCode == 27){
                onClose()
            }
        })
    })

    return (
        <div className={`modal__wrap ${show ? 'visible' : ''}`} onClick={onClose}>
            <div className="modal" onClick={e=> e.stopPropagation()}>
            <button
                onClick={onClose}
                className="close_modal"
            >
                <svg height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
            </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
