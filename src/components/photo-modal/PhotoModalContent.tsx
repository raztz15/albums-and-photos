import './PhotoModalContent.css'
import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress';

export interface IPhotoModalContentProps {
    id: number
    albumId: number
    title: string
    url: string
}

export type Album = {
    id: number
    title: string
    userId: number
}

export const PhotoModalContent = ({ title: photoTitle, url: photoSrc, albumId: photoAlbum, id: photoId }: IPhotoModalContentProps) => {

    const [album, setAlbum] = useState<Album>()

    useEffect(() => {
        const fetchAlbum = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/albums?id=${photoAlbum}`)
            const [albumData] = await res.json()
            setAlbum(albumData as Album)
        }
        setTimeout(() => {

            fetchAlbum()
        }, 2000)
    }, [])

    return (
        <div className="photo-modal-content--container">
            {album && photoSrc ?
                <>
                    <div className="photo-modal--title">
                        Photo Name: {photoTitle}
                    </div>
                    <div className="photo-modal--id">
                        Photo Id: {photoId}
                    </div>
                    <div className="photo-modal--album">
                        Photo Album: {album?.title}
                    </div>
                    <div className="photo-modal--img">
                        <img src={photoSrc} />
                    </div>
                </>
                :
                <CircularProgress />
            }
        </div>
    )
}
