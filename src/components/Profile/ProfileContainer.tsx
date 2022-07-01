import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfileData } from '../../Redux/profileReducer';
import {useLocation,useNavigate,useParams,} from "react-router-dom";
import { compose } from 'redux';
import {Navigate} from "react-router-dom";
import { AppStateType } from '../../Redux/redux-store';
import { ProfileType } from '../../types/types';

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    savePhoto: (photos: File) => void
    saveProfileData: (profileData: ProfileType, setFieldValue: any) => Promise<any>
}

type PathParamsType = {
    router: any
}

type Props = MapPropsType & DispatchPropsType & PathParamsType

function withRouter(Component: any) {
    function ComponentWithRouterProp(props: any) {
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component<Props, {isShowMyProfile: boolean}> {

    constructor(props: Props) {
        super( props );
        this.state = {
            isShowMyProfile: true
        }
    }

    componentDidMount() {

        let userIdFromPath: number | null = +this.props.router.params.userId;
        let authorisedUserId: number | null= this.props.authorisedUserId;

        if (userIdFromPath) {

            this.props.getUserProfile( userIdFromPath );
            this.props.getUserStatus( userIdFromPath );

        } else {

            if (this.props.isAuth) {
                this.props.getUserProfile( authorisedUserId as number);
                this.props.getUserStatus( authorisedUserId as number);
            }
        }
    }

    componentDidUpdate() {

        let userIdFromPath = +this.props.router.params.userId;
        let authorisedUserId = this.props.authorisedUserId;
        let isShowMyProfile = this.state.isShowMyProfile;
  
        if (isShowMyProfile) {
  
           if (userIdFromPath === authorisedUserId) {
              this.setState( {isShowMyProfile: false} )
           }
  
           if (!userIdFromPath && this.props.isAuth) {
              this.props.getUserProfile( authorisedUserId as number );
              this.props.getUserStatus( authorisedUserId as number );
              this.setState( {isShowMyProfile: false} )
           }
        }
     }

    render() {

        if (!this.props.isAuth && !this.props.router.params.userId) {
            return <Navigate to={'/login'} />
        }

        return (
            <div>
                <Profile
                    {...this.props}
                    isOwner={!this.props.router.params.userId}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateUserStatus={this.props.updateUserStatus}
                    savePhoto={this.props.savePhoto}
                    saveProfileData={this.props.saveProfileData}
                />
            </div>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        isAuth: state.auth.isAuth,
        authorisedUserId: state.auth.id
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfileData}),
    withRouter,
)(ProfileContainer);

