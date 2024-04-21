import { ReactNode } from 'react'
import './Modal.css'

interface IModalProps {
    onClose: () => void
    children: ReactNode
}

export const Modal = ({ onClose, children }: IModalProps) => {


    return (
        <div className='modal--container' onClick={onClose}>
            <div className='modal--wrapper' onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    &times; {/* Close button */}
                </button>
                {children}
            </div>
        </div>
    )
}
