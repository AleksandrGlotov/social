import React, {useState} from 'react';
import { ContactsType, ProfileType } from '../../../../types/types';
import s from './ProfileData.module.scss'

type Props = {
    profile: ProfileType
    isOwner: boolean
    activateEditMode: () => void
}

type PropsContact = {
    contactTitle: string
    contactValue: string
}

const Contact: React.FC<PropsContact> = ({contactTitle, contactValue}) => {
    return <div className={s.stroke}><i>{contactTitle}</i> <span>{contactValue}</span></div>
}

const ProfileData: React.FC<Props> = ({profile, isOwner, activateEditMode}) => {
    return (
        <div className={s.profileData}>
            <h1>{profile.fullName}</h1>
            <div className={s.stroke}><i>Ищу работу</i> {profile.lookingForAJob ? <span>Да</span> : <span>Нет</span>}</div>
            {profile.lookingForAJob && <div className={s.stroke}><i>Навыки</i> <span>{profile.lookingForAJobDescription}</span></div>}
            <div className={s.stroke}><i>Обо мне</i> <span>{profile.aboutMe}</span></div>
            <div>
                <h3>Contacts</h3>
                {Object
                .keys(profile.contacts)
                .map( (key) => {
                    return <Contact
                        key={key}
                        contactTitle={key}
                        contactValue={profile.contacts[key as keyof ContactsType]}/>
                })}
            </div>
            {isOwner && <button className={s.buttonEdit} onClick={activateEditMode}>Редактировать</button>}
        </div>
    )
}

export default ProfileData;
