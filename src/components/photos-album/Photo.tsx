import { useState } from 'react'
import './Photo.css'
import { Modal } from '../photo-modal/Modal'
import { IPhotoModalContentProps, PhotoModalContent } from '../photo-modal/PhotoModalContent'

interface IPhotoProps {
    photo: Photo
}

export type Photo = {
    id: number
    albumId: number
    title: string
    url: string
    thumbnailUrl: string
}

export const Photo = ({ photo }: IPhotoProps) => {

    const { id, title, url, thumbnailUrl } = photo

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const onCloseModal = () => {
        setIsOpenModal(false)
    }

    return (
        <div className='photo--container'>
            <div className='photo--header'  >
                <img src={thumbnailUrl} onClick={() => setIsOpenModal(prev => !prev)} />
            </div>
            <div className='photo-body--container'>
                <div className='photo-body--description'>
                    <div className='photo--title'>{title}</div>
                    <div className='photo--id'>id: {id}</div>
                </div>
                <a className='photo--url' href={url} >{url}</a>
            </div>
            {isOpenModal && <Modal onClose={onCloseModal} children={<PhotoModalContent {...photo} />} />}
        </div>
    )
}
