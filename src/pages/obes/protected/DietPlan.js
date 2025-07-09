import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../../ProjectFeatures/common/headerSlice';
import Diet from '../../../ProjectFeatures/diet';


function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Diet" }))
    }, [])

    return (
        <Diet />
    )
}

export default InternalPage;