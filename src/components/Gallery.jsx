import getPhotoUrl from 'get-photo-url'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../Dexie'

const Gallery = () => {
  const allPhotos = useLiveQuery(() => db.gallery.toArray(), [])

  const addPhoto = async () => {
    db.gallery.add({
      url : await getPhotoUrl('#addPhotoInput')
    })
  }

  const removePhoto = ( id ) =>{
    db.gallery.delete( id )
  }
  return (
    <div className='gallery'>
        <div className="addPics">
        <input type="file" className="add-photo" name='photo' id='addPhotoInput' />
        <label htmlFor="addPhotoInput" onClick={addPhoto}>
            <i className='add-icon fas fa-plus-square'></i>
        </label>
        </div>

        <div className="photos">
          {!allPhotos && <p className='load'> Loading.. </p>}
          {allPhotos?.map((photo) =>(
          <div className="imgCon" key={photo.id}>
            <img src={photo.url} alt="Gallery Pics" />
            <div className="dele">
            <button className='del' onClick={() => removePhoto(photo.id)}>Delete</button>
            </div>
          </div>
          ))}
        </div>
    </div>
  )
}

export default Gallery