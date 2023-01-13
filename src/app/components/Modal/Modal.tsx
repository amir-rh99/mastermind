import { useEffect } from 'react'
import './modal.scss'

import { ReactComponent as CloseSvg } from "@svg/close.svg";

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
                <CloseSvg />
            </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
