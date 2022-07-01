import React, {ChangeEvent, useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.scss'
import ProfileStatus from './ProfileStatus/ProfileStatus';
import noPhoto from '../../../assets/images/noPhoto.webp'
import ProfileData from './ProfileData/ProfileData';
import ProfileDataForm from './ProfileData/ProfileDataForm';
import { ProfileType } from '../../../types/types';

type Props = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: File) => void
    saveProfileData: (profileData: ProfileType, setFieldValue: any) => void
}

const ProfileInfo: React.FC<Props> = (props) => {
    let [editMode, setEditMode] = useState(false)


    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: any) => {
        if (e.target.files?.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    
    return (
        <div className={s.profile}>
            <div className={s.profileLeft}>
                <img className={s.largePhoto} src={props.profile.photos.large || noPhoto}></img>
                { props.isOwner &&  <label onChange={onMainPhotoSelected} className={s.customUpload}>
                    <input type={"file"}/>
                    Загрузить фото
                </label>}
                <ProfileStatus
                    status={props.status}
                    updateUserStatus={props.updateUserStatus}
                />
            </div>
            <div className={s.profileRight}>
                {editMode
                    ?
                        <ProfileDataForm profile={props.profile}
                            saveProfileData={props.saveProfileData}

                            deactivateEditMode={ () => {setEditMode(false)}} />
                    :
                        <ProfileData
                            profile={props.profile}
                            isOwner={props.isOwner}
                            activateEditMode={ () => {setEditMode(true)}} />}
            </div>
        </div>
    )
}


export default ProfileInfo;