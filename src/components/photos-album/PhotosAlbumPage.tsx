import './PhotosAlbumPage.css'
import React, { useEffect, useState } from 'react'
import { Photo } from './Photo'
import { Album } from '../photo-modal/PhotoModalContent'

export const PhotosAlbumPage = () => {

    const [photos, setPhotos] = useState<Array<Photo>>([])
    const [photosCopy, setPhotosCopy] = useState<Array<Photo>>([])
    const [albums, setAlbums] = useState<Array<Album>>()
    const [isAlbumsMenuOpen, setIsAlbumsMenuOpen] = useState<boolean>(false)
    const [selectedAlbumId, setselectedAlbumId] = useState<number>()

    useEffect(() => {
        const fetchPhotos = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId ?? 1}`)
            const photosData = await res.json()
            setPhotos(photosData)
            setPhotosCopy(photosData)
        }
        const fetchAlbums = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/albums`)
            const albumsData = await res.json()
            setAlbums(albumsData)
        }

        fetchAlbums()
        fetchPhotos()
    }, [selectedAlbumId])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        const updatedPhotos = photos?.filter(photo => photo.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        setPhotosCopy(updatedPhotos)
    }

    const handleSelectedAlbum = (albumId: number) => {
        setselectedAlbumId(albumId)
        setIsAlbumsMenuOpen(false)
    }


    return (
        <div className='photos-album--container' onClick={() => setIsAlbumsMenuOpen(false)}>
            <h3>Photo Albums Page</h3>
            <div className='photos-albums--tools-bar'>
                <input onChange={(e) => handleChange(e)} name="title" placeholder='Search Photo' />
                <div className='photos-albums--tools-bar__select-album' onClick={(e) => e.stopPropagation()}>
                    <button onClick={() => setIsAlbumsMenuOpen(prev => !prev)}>Select Album</button>
                    {isAlbumsMenuOpen && <ul className='photo-albums--tools-bar__albums-menu'>
                        {albums?.map(album => <li key={album.id} onClick={() => handleSelectedAlbum(album.id)}>{album.title}</li>)}
                    </ul>}
                </div>

            </div>
            <div className=' photos-album'>
                {photosCopy?.map(photo => <div key={photo.id}><Photo photo={photo} /></div>)}
            </div>
        </div>
    )
}
