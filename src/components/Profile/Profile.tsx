import React from 'react';
import s from './Profile.module.scss'
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { ProfileType } from '../../types/types';
import MyPosts from './MyPosts/MyPosts';

type Props = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (photos: File) => void
    saveProfileData: (profileData: ProfileType, setFieldValue: any) => void
}

const Profile: React.FC<Props> = (props) => {

    return (
        <div className={s.profile}>
            <ProfileInfo 
                profile={props.profile}
                status={props.status}
                updateUserStatus={props.updateUserStatus}
                isOwner={props.isOwner}
                savePhoto={props.savePhoto}
                saveProfileData={props.saveProfileData}
                />
            <MyPosts />
        </div>
    )
}
export default Profile;