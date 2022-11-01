import profileIcon from '../assets/user.png'
import React from 'react'
import { useState } from 'react' 
import getPhotoUrl from 'get-photo-url'
import { db } from '../Dexie'
import { useEffect } from 'react'

const Bio = () => {
    const [userDetails, setUserDetails] = useState({
        name : 'BinaryTech001🔥',
        about : 'Building Binary Tech Institute - Learn to code and connect with the best mind 🚀.' 
    })

    const [editFormIsOpen, setEditFormIsOpen] = useState(false)
    const [ profilePhoto, setprofilePhoto ] = useState(profileIcon)

    
    useEffect(() => {
        const setDataFromDb = async () => {
            const userDetailsFromDb = await db.bio.get('info')
            const profilePhotoFromDb = await db.bio.get('profilePhoto')
            userDetailsFromDb && setUserDetails(userDetailsFromDb)
            profilePhotoFromDb && setprofilePhoto(profilePhotoFromDb)
        }
        setDataFromDb()
    }, [])


    const updateUserDetails = async (event)=>{
        event.preventDefault();
        const objectData = {
            name:   event.target.nameOfUser.value,
            about: event.target.aboutUser.value,
        }
        setUserDetails(objectData)
        // Update dexie   db
        await db.bio.put(objectData, 'info')
        setEditFormIsOpen(false)
    }

    const updateProfilePhoto = async () =>{
        // get selected photo
        const newProfilePhoto = await getPhotoUrl('#profilePhotoInput')
        // update state here
        setprofilePhoto( newProfilePhoto )
        await db.bio.put(newProfilePhoto, 'profilePhoto')
    }


    const editForm = (
        <form action="" className="edit-bio-form" onSubmit={ (e) => updateUserDetails(e)}>
            <input type="text" id='' name='nameOfUser' placeholder='Your Name' defaultValue={userDetails.name} />
            <input type="text" name='aboutUser' id='' placeholder='About You' defaultValue={userDetails.about} />
            <br />
            <div className="btns">
            <button type='button' className='cancel-button' onClick={()=> setEditFormIsOpen(false)}>Cancel</button>
            <button type='submit' className='save-button'> Save </button>
            </div>
                
        </form>
    )

    const editButton = <button className='editBtn' onClick={()=> setEditFormIsOpen(true)}>Edit</button>

  return (
    <section className='bio'>
        <input type="file" accept='image/*' name='photo' id='profilePhotoInput' />
        <label htmlFor="profilePhotoInput" onClick={updateProfilePhoto}>
        <div className="profile-photo" role="button" title="Click to edit photo">
            <img src={profilePhoto} alt="Profile" />
        </div>
        </label>

        <div className="profile-info">
            <h2 className="name"> {userDetails.name} </h2>
            <p className="about"> {userDetails.about} </p>

            {editFormIsOpen ? editForm :  editButton }
        </div>
    </section>
  )
}

export default Bio