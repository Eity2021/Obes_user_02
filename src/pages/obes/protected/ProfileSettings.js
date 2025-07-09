import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice'
import ProfileSettings from '../../../ProjectFeatures/settings/profilesettings'


function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Settings"}))
      }, [])

    return(
        <ProfileSettings />
    )
}

export default InternalPage