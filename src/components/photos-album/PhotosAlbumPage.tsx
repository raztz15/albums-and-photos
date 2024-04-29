import './PhotosAlbumPage.css'
import React, { useEffect, useState } from 'react'
import { Photo } from './Photo'
import { Album } from '../photo-modal/PhotoModalContent'
import InfiniteScroll from 'react-infinite-scroll-component'

export const PhotosAlbumPage = () => {

    const [photos, setPhotos] = useState<Array<Photo>>([])
    const [photosCopy, setPhotosCopy] = useState<Array<Photo>>([])
    const [albums, setAlbums] = useState<Array<Album>>()
    const [isAlbumsMenuOpen, setIsAlbumsMenuOpen] = useState<boolean>(false)
    const [selectedAlbumId, setselectedAlbumId] = useState<number>()
    const [hasMore, setHasMore] = useState<boolean>(true)

    useEffect(() => {
        const fetchAlbums = async () => {
            const res = await fetch(`https://jsonplaceholder.typicode.com/albums`)
            const albumsData = await res.json()
            setAlbums(albumsData)
        }

        const loadInitialPhotos = async () => {
            const initialPhotos = await fetchPhotos(0)
            setPhotos(initialPhotos)
            setPhotosCopy(initialPhotos)
        }

        fetchAlbums()
        loadInitialPhotos()
    }, [selectedAlbumId])

    const fetchPhotos = async (startIndex: number) => {
        const res = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${selectedAlbumId ?? 1}&_start=${startIndex}&_limit=30`)
        const photosData = await res.json()
        return photosData
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        const updatedPhotos = photos?.filter(photo => photo.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        setPhotosCopy(updatedPhotos)
        setHasMore(!(updatedPhotos.length < 30))
    }

    const handleSelectedAlbum = (albumId: number) => {
        setselectedAlbumId(albumId)
        setIsAlbumsMenuOpen(false)
    }

    const loadMoreData = async () => {
        const startIndex = photos.length
        const newPhotos = await fetchPhotos(startIndex)

        if (newPhotos.length === 0 || photosCopy.length >= 50) {
            setHasMore(false)

        }
        else {
            setPhotos(prevPhotos => [...prevPhotos, ...newPhotos])
            setPhotosCopy(prevPhotosCopy => [...prevPhotosCopy, ...newPhotos])
        }
    }

    return <div className='photos-album--container' onClick={() => setIsAlbumsMenuOpen(false)}>
        <h3>Photo Albums Page</h3>
        <div className='photos-albums--tools-bar'>
            <input onChange={(e) => handleChange(e)} name="title" placeholder='Search Photo' />
            <div className='photos-albums--tools-bar__select-album' >
                <button onClick={(e) => {
                    e.stopPropagation()
                    setIsAlbumsMenuOpen(prev => !prev)
                }}>Select Album</button>
                {isAlbumsMenuOpen && <ul className='photo-albums--tools-bar__albums-menu'>
                    {albums?.map(album => <li key={album.id} onClick={() => handleSelectedAlbum(album.id)}>{album.title}</li>)}
                </ul>}
            </div>

        </div>
        <InfiniteScroll
            dataLength={photosCopy.length}
            next={loadMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <div className=' photos-album'>
                {photosCopy?.map(photo => <div key={photo.id}><Photo photo={photo} /></div>)}
            </div>
        </InfiniteScroll >
    </div>
}
